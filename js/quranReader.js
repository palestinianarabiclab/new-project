const API_BASE = 'https://api.alquran.cloud/v1';
const CACHE_PREFIX = 'tajweed_quran_surah_v3_';
const SETTINGS_KEY = 'tajweed_quran_reader_settings_v1';
const FONT_STEPS = [1.65, 1.9, 2.2, 2.55, 2.9];
const FONT_LABELS = ['صغير', 'متوسط', 'كبير', 'كبير جدًا', 'عرض الصف'];

const state = {
  chapters: [],
  chapter: 1,
  ayahs: [],
  tajweedAyahs: [],
  translations: [],
  tafsir: [],
  audio: [],
  fontIndex: 2,
  view: 'study',
  showTranslation: true,
  showTafsir: true,
  pages: [],
  pageIndex: 0,
  query: '',
  activeAudio: null,
};

const $ = (selector) => document.querySelector(selector);

function normalizeArabic(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[ٱأإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim();
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    chapter: state.chapter,
    fontIndex: state.fontIndex,
    view: state.view,
    showTranslation: state.showTranslation,
    showTafsir: state.showTafsir,
  }));
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    state.chapter = Math.min(114, Math.max(1, Number(saved.chapter) || 1));
    state.fontIndex = Math.min(FONT_STEPS.length - 1, Math.max(0, Number(saved.fontIndex) || 2));
    state.view = ['mushaf', 'tajweed'].includes(saved.view) ? saved.view : 'study';
    state.showTranslation = saved.showTranslation !== false;
    state.showTafsir = saved.showTafsir !== false;
  } catch {
    // Invalid local settings should never block the Mushaf.
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Quran API request failed (${response.status})`);
  const payload = await response.json();
  if (payload.code !== 200 || !payload.data) throw new Error('Quran API returned an invalid response.');
  return payload.data;
}

async function loadChapters() {
  const cached = localStorage.getItem(`${CACHE_PREFIX}chapters`);
  if (cached) {
    try {
      state.chapters = JSON.parse(cached);
    } catch {
      localStorage.removeItem(`${CACHE_PREFIX}chapters`);
    }
  }
  if (!state.chapters.length) {
    state.chapters = await fetchJson(`${API_BASE}/surah`);
    localStorage.setItem(`${CACHE_PREFIX}chapters`, JSON.stringify(state.chapters));
  }
  renderChapterOptions();
}

async function loadSurah(number, { scrollTop = true } = {}) {
  const chapter = Math.min(114, Math.max(1, Number(number) || 1));
  state.chapter = chapter;
  state.query = '';
  state.pageIndex = 0;
  $('#quranSearchInput').value = '';
  stopAudio();
  setStatus('جاري تحميل السورة…', 'loading');

  try {
    let data;
    const cacheKey = `${CACHE_PREFIX}${chapter}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        data = JSON.parse(cached);
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }
    if (!data) {
      data = await fetchJson(`${API_BASE}/surah/${chapter}/editions/quran-uthmani,quran-tajweed,en.sahih,ar.muyassar,ar.alafasy`);
      localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    const textEdition = data.find((edition) => edition.edition?.identifier === 'quran-uthmani') || data[0];
    const tajweedEdition = data.find((edition) => edition.edition?.identifier === 'quran-tajweed');
    const translationEdition = data.find((edition) => edition.edition?.identifier === 'en.sahih');
    const tafsirEdition = data.find((edition) => edition.edition?.identifier === 'ar.muyassar');
    const audioEdition = data.find((edition) => edition.edition?.format === 'audio');
    state.ayahs = textEdition?.ayahs || [];
    state.tajweedAyahs = tajweedEdition?.ayahs || [];
    state.translations = translationEdition?.ayahs || [];
    state.tafsir = tafsirEdition?.ayahs || [];
    state.audio = audioEdition?.ayahs || [];
    buildPages();
    renderSurah();
    saveSettings();
    if (scrollTop) $('#quran-screen')?.scrollIntoView({ block: 'start' });
  } catch (error) {
    console.error(error);
    state.ayahs = [];
    state.tajweedAyahs = [];
    state.translations = [];
    state.tafsir = [];
    state.audio = [];
    state.pages = [];
    setStatus('تعذّر تحميل السورة. تأكد من اتصال الإنترنت ثم حاول مرة أخرى.', 'error', true);
  }
}

function buildPages() {
  const grouped = new Map();
  state.ayahs.forEach((ayah, index) => {
    const pageNumber = Number(ayah.page) || Math.floor(index / 12) + 1;
    if (!grouped.has(pageNumber)) grouped.set(pageNumber, []);
    grouped.get(pageNumber).push(ayah);
  });
  state.pages = [...grouped.entries()].map(([mushafPage, ayahs]) => ({ mushafPage, ayahs }));
  state.pageIndex = Math.min(state.pageIndex, Math.max(0, state.pages.length - 1));
}

function currentPage() {
  return state.pages[state.pageIndex] || { mushafPage: 1, ayahs: [] };
}

function renderChapterOptions() {
  const select = $('#quranSurahSelect');
  if (!select) return;
  select.innerHTML = state.chapters.map((chapter) =>
    `<option value="${chapter.number}">${chapter.number}. ${escapeHtml(chapter.name)} — ${escapeHtml(chapter.englishName)}</option>`
  ).join('');
  select.value = String(state.chapter);
}

function renderSurah() {
  const chapter = state.chapters.find((item) => item.number === state.chapter);
  $('#quranSurahSelect').value = String(state.chapter);
  const header = $('#quranSurahHeader');
  header.hidden = false;
  header.innerHTML = `
    <p>سورة رقم ${state.chapter} · ${chapter?.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
    <h3>${escapeHtml(chapter?.name || '')}</h3>
    <span>${state.ayahs.length} آية · ${escapeHtml(chapter?.englishName || '')}</span>
  `;
  const ayahSelect = $('#quranAyahSelect');
  ayahSelect.innerHTML = state.ayahs.map((ayah) =>
    `<option value="${ayah.numberInSurah}">الآية ${ayah.numberInSurah}</option>`
  ).join('');
  applyFontSize();
  applyViewSettings();
  updatePageNavigation();
  renderVerses();
}

function renderVerses() {
  const container = $('#quranVerses');
  const normalizedQuery = normalizeArabic(state.query);
  const visible = currentPage().ayahs.filter((ayah) =>
    !normalizedQuery || normalizeArabic(ayah.text).includes(normalizedQuery)
  );

  if (!visible.length) {
    container.innerHTML = '<div class="quran-reader__empty">لم نعثر على هذه الكلمة داخل السورة.</div>';
    setStatus(`لا توجد نتائج في الصفحة الحالية: «${escapeHtml(state.query)}»`, 'empty');
    return;
  }

  if (state.view === 'mushaf' || state.view === 'tajweed') {
    const colored = state.view === 'tajweed';
    container.className = `quran-verses quran-verses--mushaf${colored ? ' quran-verses--tajweed' : ''}`;
    container.innerHTML = `
      <div class="quran-mushaf-page" lang="ar">
        ${visible.map((ayah) => {
          const tajweedAyah = state.tajweedAyahs.find((item) => item.numberInSurah === ayah.numberInSurah);
          const verseText = colored && tajweedAyah?.text
            ? renderTajweedText(tajweedAyah.text)
            : escapeHtml(ayah.text);
          return `
          <span class="quran-mushaf-ayah" id="quran-ayah-${ayah.numberInSurah}" data-ayah="${ayah.numberInSurah}">
            ${verseText}
            <button type="button" class="quran-mushaf-number" data-mushaf-audio="${ayah.numberInSurah}" aria-label="الاستماع للآية ${ayah.numberInSurah}">${ayah.numberInSurah}</button>
          </span>
        `}).join(' ')}
      </div>
    `;
    container.querySelectorAll('[data-mushaf-audio]').forEach((button) => {
      button.addEventListener('click', () => {
        const number = Number(button.dataset.mushafAudio);
        const audio = state.audio.find((item) => item.numberInSurah === number);
        if (!audio?.audio) return;
        const proxy = document.createElement('button');
        proxy.dataset.audio = audio.audio;
        proxy.dataset.number = String(number);
        proxy.closest = () => button.closest('.quran-mushaf-ayah');
        toggleAudio(proxy);
      });
    });
    setStatus(
      normalizedQuery
        ? `${visible.length} نتيجة في الصفحة`
        : colored
          ? 'مصحف التجويد الملوّن — اضغط رقم الآية للاستماع'
          : 'وضع المصحف — اضغط رقم الآية للاستماع',
      'ready'
    );
    return;
  }

  container.className = 'quran-verses quran-verses--study';
  container.innerHTML = visible.map((ayah) => {
    const audio = state.audio.find((item) => item.numberInSurah === ayah.numberInSurah);
    const translation = state.translations.find((item) => item.numberInSurah === ayah.numberInSurah);
    const tafsir = state.tafsir.find((item) => item.numberInSurah === ayah.numberInSurah);
    return `
      <section class="quran-ayah" id="quran-ayah-${ayah.numberInSurah}" data-ayah="${ayah.numberInSurah}">
        <div class="quran-ayah__actions">
          <span class="quran-ayah__number" aria-label="الآية ${ayah.numberInSurah}">${ayah.numberInSurah}</span>
          ${audio?.audio ? `<button class="quran-ayah__audio" type="button" data-audio="${escapeHtml(audio.audio)}" data-number="${ayah.numberInSurah}" aria-label="تشغيل الآية ${ayah.numberInSurah}">▶ استماع</button>` : ''}
        </div>
        <div class="quran-ayah__content">
          <p class="quran-ayah__text" lang="ar">${escapeHtml(ayah.text)}</p>
          ${state.showTranslation && translation?.text ? `
            <div class="quran-ayah__translation" dir="ltr" lang="en">
              <span>English translation</span>
              <p>${escapeHtml(translation.text)}</p>
            </div>
          ` : ''}
          ${state.showTafsir && tafsir?.text ? `
            <div class="quran-ayah__tafsir" dir="rtl" lang="ar">
              <span>التفسير الميسّر</span>
              <p>${escapeHtml(tafsir.text)}</p>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }).join('');
  container.querySelectorAll('[data-audio]').forEach((button) => {
    button.addEventListener('click', () => toggleAudio(button));
  });
  setStatus(normalizedQuery ? `${visible.length} نتيجة في الصفحة` : 'جاهز للقراءة والشرح', 'ready');
}

const TAJWEED_CLASS_BY_CODE = {
  h: 'silent', s: 'silent', l: 'silent',
  n: 'madd-normal', p: 'madd-permissible', m: 'madd-necessary', o: 'madd-obligatory',
  q: 'qalqalah', c: 'ikhfa-shafawi', f: 'ikhfa', w: 'idgham-shafawi',
  i: 'iqlab', a: 'idgham-ghunnah', u: 'idgham-no-ghunnah',
  d: 'idgham-related', b: 'idgham-related', g: 'ghunnah',
};

function renderTajweedText(rawText = '') {
  let output = '';
  let cursor = 0;
  const pattern = /\[([a-z])(?::\d+)?\[([^\]]*)\]/gi;
  for (const match of rawText.matchAll(pattern)) {
    output += escapeHtml(rawText.slice(cursor, match.index));
    const ruleClass = TAJWEED_CLASS_BY_CODE[match[1].toLowerCase()] || 'unknown';
    output += `<span class="tajweed-rule tajweed-rule--${ruleClass}" data-tajweed-code="${match[1].toLowerCase()}">${escapeHtml(match[2])}</span>`;
    cursor = match.index + match[0].length;
  }
  output += escapeHtml(rawText.slice(cursor));
  return output;
}

function updatePageNavigation() {
  const page = currentPage();
  const label = state.pages.length > 1
    ? `صفحة المصحف ${page.mushafPage} · ${state.pageIndex + 1} من ${state.pages.length} في السورة`
    : `صفحة المصحف ${page.mushafPage}`;
  ['#quranPageLabel', '#quranPageLabelBottom'].forEach((selector) => {
    const element = $(selector);
    if (element) element.textContent = label;
  });
  ['#quranPreviousPage', '#quranPreviousPageBottom'].forEach((selector) => {
    const button = $(selector);
    if (button) button.disabled = state.pageIndex === 0;
  });
  ['#quranNextPage', '#quranNextPageBottom'].forEach((selector) => {
    const button = $(selector);
    if (button) button.disabled = state.pageIndex >= state.pages.length - 1;
  });
}

function changePage(offset) {
  const nextIndex = Math.min(state.pages.length - 1, Math.max(0, state.pageIndex + offset));
  if (nextIndex === state.pageIndex) return;
  stopAudio();
  state.pageIndex = nextIndex;
  state.query = '';
  $('#quranSearchInput').value = '';
  updatePageNavigation();
  renderVerses();
  $('#quranSurahHeader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToAyah(number) {
  const ayahNumber = Number(number);
  const pageIndex = state.pages.findIndex((page) =>
    page.ayahs.some((ayah) => ayah.numberInSurah === ayahNumber)
  );
  if (pageIndex < 0) return;
  state.pageIndex = pageIndex;
  state.query = '';
  $('#quranSearchInput').value = '';
  updatePageNavigation();
  renderVerses();
  requestAnimationFrame(() => {
    document.getElementById(`quran-ayah-${ayahNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function toggleAudio(button) {
  const url = button.dataset.audio;
  if (state.activeAudio?.url === url && !state.activeAudio.audio.paused) {
    state.activeAudio.audio.pause();
    button.textContent = '▶ استماع';
    return;
  }
  stopAudio();
  const audio = new Audio(url);
  state.activeAudio = { audio, button, url };
  button.textContent = '❚❚ إيقاف';
  button.closest('.quran-ayah')?.classList.add('quran-ayah--playing');
  audio.addEventListener('ended', stopAudio, { once: true });
  audio.addEventListener('error', () => {
    stopAudio();
    setStatus('تعذّر تشغيل التلاوة حاليًا.', 'error');
  }, { once: true });
  audio.play().catch(() => {
    stopAudio();
    setStatus('اضغط زر الاستماع مرة أخرى للسماح بتشغيل الصوت.', 'error');
  });
}

function stopAudio() {
  if (!state.activeAudio) return;
  state.activeAudio.audio.pause();
  if (state.activeAudio.button.classList?.contains('quran-ayah__audio')) {
    state.activeAudio.button.textContent = '▶ استماع';
  }
  state.activeAudio.button.closest('.quran-ayah')?.classList.remove('quran-ayah--playing');
  state.activeAudio = null;
}

function applyViewSettings() {
  document.querySelectorAll('[data-quran-view]').forEach((button) => {
    button.classList.toggle('quran-view-button--active', button.dataset.quranView === state.view);
    button.setAttribute('aria-pressed', String(button.dataset.quranView === state.view));
  });
  const studyOptions = $('#quranStudyOptions');
  if (studyOptions) studyOptions.hidden = state.view !== 'study';
  const tajweedLegend = $('#quranTajweedLegend');
  if (tajweedLegend) tajweedLegend.hidden = state.view !== 'tajweed';
  $('#quranShowTranslation').checked = state.showTranslation;
  $('#quranShowTafsir').checked = state.showTafsir;
  saveSettings();
}

function setView(view) {
  state.view = ['mushaf', 'tajweed'].includes(view) ? view : 'study';
  stopAudio();
  applyViewSettings();
  renderVerses();
}

function applyFontSize() {
  const reader = $('#quran-screen');
  if (reader) reader.style.setProperty('--quran-font-size', `${FONT_STEPS[state.fontIndex]}rem`);
  $('#quranFontLabel').textContent = FONT_LABELS[state.fontIndex];
  saveSettings();
}

function setStatus(message, kind = '', retry = false) {
  const status = $('#quranStatus');
  status.className = `quran-reader__status quran-reader__status--${kind}`;
  status.innerHTML = `${escapeHtml(message)}${retry ? ' <button id="quranRetry" type="button">إعادة المحاولة</button>' : ''}`;
  if (retry) $('#quranRetry')?.addEventListener('click', () => loadSurah(state.chapter));
}

function showQuran() {
  document.body.classList.remove('home-only');
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('screen--active', screen.id === 'quran-screen');
  });
  if (!state.ayahs.length) initializeReader();
}

function leaveQuran() {
  stopAudio();
  const hasStudent = Boolean(window.appState?.currentStudentId);
  const target = hasStudent ? 'levels-screen' : 'home-screen';
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('screen--active', screen.id === target);
  });
  if (!hasStudent) document.body.classList.add('home-only');
}

async function initializeReader() {
  loadSettings();
  applyFontSize();
  setStatus('جاري تجهيز قائمة السور…', 'loading');
  try {
    await loadChapters();
    await loadSurah(state.chapter, { scrollTop: false });
  } catch (error) {
    console.error(error);
    setStatus('تعذّر الاتصال بمصدر القرآن. تأكد من الإنترنت ثم حاول مجددًا.', 'error', true);
  }
}

function bindEvents() {
  document.querySelectorAll('[data-nav="quran-screen"]').forEach((button) => button.addEventListener('click', showQuran));
  $('#btnQuranBack')?.addEventListener('click', leaveQuran);
  $('#quranSurahSelect')?.addEventListener('change', (event) => loadSurah(event.target.value));
  $('#quranAyahSelect')?.addEventListener('change', (event) => {
    goToAyah(event.target.value);
  });
  $('#quranSearchInput')?.addEventListener('input', (event) => {
    state.query = event.target.value;
    renderVerses();
  });
  $('#quranMushafView')?.addEventListener('click', () => setView('mushaf'));
  $('#quranTajweedView')?.addEventListener('click', () => setView('tajweed'));
  $('#quranStudyView')?.addEventListener('click', () => setView('study'));
  $('#quranShowTranslation')?.addEventListener('change', (event) => {
    state.showTranslation = event.target.checked;
    saveSettings();
    renderVerses();
  });
  $('#quranShowTafsir')?.addEventListener('change', (event) => {
    state.showTafsir = event.target.checked;
    saveSettings();
    renderVerses();
  });
  $('#quranFontSmaller')?.addEventListener('click', () => {
    state.fontIndex = Math.max(0, state.fontIndex - 1);
    applyFontSize();
  });
  $('#quranFontLarger')?.addEventListener('click', () => {
    state.fontIndex = Math.min(FONT_STEPS.length - 1, state.fontIndex + 1);
    applyFontSize();
  });
  $('#quranPreviousSurah')?.addEventListener('click', () => loadSurah(state.chapter - 1));
  $('#quranNextSurah')?.addEventListener('click', () => loadSurah(state.chapter + 1));
  $('#quranPreviousPage')?.addEventListener('click', () => changePage(-1));
  $('#quranPreviousPageBottom')?.addEventListener('click', () => changePage(-1));
  $('#quranNextPage')?.addEventListener('click', () => changePage(1));
  $('#quranNextPageBottom')?.addEventListener('click', () => changePage(1));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindEvents, { once: true });
} else {
  bindEvents();
}
