const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/farou/AppData/Local/Temp/codex-playwright-core/node_modules/playwright-core');

const root = path.resolve(__dirname, '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const server = http.createServer((request, response) => {
  const relative = decodeURIComponent(request.url.split('?')[0]) === '/'
    ? 'index.html'
    : decodeURIComponent(request.url.split('?')[0]).replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    return response.end('Not found');
  }
  response.writeHead(200, { 'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
});

(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  await page.route('https://api.alquran.cloud/**', async (route) => {
    const url = new URL(route.request().url());
    const chapterMatch = url.pathname.match(/\/surah\/(\d+)\/editions/);
    if (!chapterMatch) {
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          code: 200,
          data: Array.from({ length: 114 }, (_, index) => ({
            number: index + 1,
            name: index + 1 === 112 ? 'سُورَةُ الإِخْلَاصِ' : `سورة ${index + 1}`,
            englishName: index + 1 === 112 ? 'Al-Ikhlas' : `Surah ${index + 1}`,
            revelationType: 'Meccan',
          })),
        }),
      });
    }
    const number = Number(chapterMatch[1]);
    const count = number === 112 ? 4 : number === 2 ? 25 : 7;
    const text = number === 112
      ? ['قُلْ هُوَ ٱللَّهُ أَحَدٌ', 'ٱللَّهُ ٱلصَّمَدُ', 'لَمْ يَلِدْ وَلَمْ يُولَدْ', 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ']
      : Array.from({ length: count }, (_, index) => `آية تجريبية ${index + 1}`);
    return route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        code: 200,
        data: [
          { edition: { identifier: 'quran-uthmani', format: 'text' }, ayahs: text.map((ayah, index) => ({ numberInSurah: index + 1, text: ayah, page: number === 2 ? Math.floor(index / 5) + 2 : 604 })) },
          { edition: { identifier: 'quran-tajweed', format: 'text' }, ayahs: text.map((ayah, index) => ({ numberInSurah: index + 1, text: index === 0 ? `[g[${ayah.slice(0, 2)}]${ayah.slice(2)}` : ayah, page: number === 2 ? Math.floor(index / 5) + 2 : 604 })) },
          { edition: { identifier: 'en.sahih', format: 'text', type: 'translation' }, ayahs: text.map((_, index) => ({ numberInSurah: index + 1, text: `Translation ${index + 1}` })) },
          { edition: { identifier: 'ar.muyassar', format: 'text', type: 'tafsir' }, ayahs: text.map((_, index) => ({ numberInSurah: index + 1, text: `التفسير الميسر ${index + 1}` })) },
          { edition: { identifier: 'ar.alafasy', format: 'audio' }, ayahs: text.map((_, index) => ({ numberInSurah: index + 1, audio: `https://cdn.islamic.network/audio/${number}-${index + 1}.mp3` })) },
        ],
      }),
    });
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-nav="quran-screen"]').evaluate((element) => element.click());
  await page.waitForSelector('.quran-ayah', { timeout: 20000 });
  const initial = await page.evaluate(() => ({
    activeScreen: document.querySelector('.screen--active')?.id,
    chapterOptions: document.querySelectorAll('#quranSurahSelect option').length,
    ayahs: document.querySelectorAll('.quran-ayah').length,
    firstText: document.querySelector('.quran-ayah__text')?.textContent,
    audioButtons: document.querySelectorAll('.quran-ayah__audio').length,
    translations: document.querySelectorAll('.quran-ayah__translation').length,
    tafsir: document.querySelectorAll('.quran-ayah__tafsir').length,
  }));
  await page.locator('#quranSurahSelect').selectOption('2');
  await page.waitForFunction(() => document.querySelectorAll('.quran-ayah').length === 5);
  const firstLongPage = await page.evaluate(() => ({
    visibleAyahs: document.querySelectorAll('.quran-ayah').length,
    label: document.querySelector('#quranPageLabel')?.textContent,
    previousDisabled: document.querySelector('#quranPreviousPage')?.disabled,
    nextDisabled: document.querySelector('#quranNextPage')?.disabled,
  }));
  await page.locator('#quranNextPage').click();
  const secondLongPage = await page.evaluate(() => ({
    firstVisibleAyah: document.querySelector('.quran-ayah')?.dataset.ayah,
    label: document.querySelector('#quranPageLabel')?.textContent,
  }));
  await page.locator('#quranAyahSelect').selectOption('23');
  const selectedAyahPage = await page.evaluate(() => ({
    hasAyah23: Boolean(document.querySelector('#quran-ayah-23')),
    label: document.querySelector('#quranPageLabel')?.textContent,
  }));
  await page.locator('#quranSurahSelect').selectOption('112');
  await page.waitForFunction(() => document.querySelectorAll('.quran-ayah').length === 4, null, { timeout: 20000 });
  const fontBefore = await page.locator('.quran-ayah__text').first().evaluate((element) => getComputedStyle(element).fontSize);
  await page.locator('#quranFontLarger').click();
  const fontAfter = await page.locator('.quran-ayah__text').first().evaluate((element) => getComputedStyle(element).fontSize);
  await page.locator('#quranTajweedView').click();
  const afterChange = await page.evaluate(() => ({
    surah: document.querySelector('#quranSurahHeader h3')?.textContent,
    ayahs: document.querySelectorAll('.quran-ayah').length,
    font: getComputedStyle(document.querySelector('#quran-screen')).getPropertyValue('--quran-font-size').trim(),
    status: document.querySelector('#quranStatus')?.textContent.trim(),
    mushafPage: document.querySelectorAll('.quran-mushaf-page').length,
    mushafAyahs: document.querySelectorAll('.quran-mushaf-ayah').length,
    studyOptionsHidden: document.querySelector('#quranStudyOptions')?.hidden,
    tajweedRules: document.querySelectorAll('.tajweed-rule').length,
    legendVisible: !document.querySelector('#quranTajweedLegend')?.hidden,
    hasRawMarkup: document.querySelector('.quran-mushaf-page')?.textContent.includes('[g['),
  }));
  afterChange.fontBefore = fontBefore;
  afterChange.fontAfter = fontAfter;
  afterChange.fontChanged = parseFloat(fontAfter) > parseFloat(fontBefore);
  console.log(JSON.stringify({ initial, firstLongPage, secondLongPage, selectedAyahPage, afterChange, errors }, null, 2));
  await browser.close();
  server.close();
})().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
