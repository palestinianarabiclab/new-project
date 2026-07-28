const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("C:/Users/farou/AppData/Local/Temp/codex-playwright-core/node_modules/playwright-core");

const root = path.resolve(__dirname, "..");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const server = http.createServer((req, res) => {
  const requested = decodeURIComponent(req.url.split("?")[0]);
  const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const page = await browser.newPage();
  await page.addInitScript(() => {
    const auth = {
      onAuthStateChanged(callback) { queueMicrotask(() => callback(null)); },
      signOut() { return Promise.resolve(); },
    };
    const firestore = () => ({});
    firestore.FieldValue = { serverTimestamp: () => new Date().toISOString() };
    window.firebase = {
      apps: [],
      initializeApp() { this.apps.push({ name: "[DEFAULT]", auth: () => auth }); return this.apps[0]; },
      auth: () => auth,
      firestore,
    };
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator("#btnHeroGuest").click();
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const text = document.body.textContent;
    const units = [...document.querySelectorAll(".tajweed-catalog-unit")];
    return {
      title: document.title,
      hasTajweed: text.includes("Tajweed"),
      hasFirstFoundation: text.includes("Course scope, reading tradition, and how to study"),
      hasMudoodReview: text.includes("Cumulative madd decision practice"),
      hasFinalReview: text.includes("Final Part One review"),
      detailsCount: units.length,
      lessonRows: document.querySelectorAll(".tajweed-catalog-lesson").length,
      readyRows: document.querySelectorAll(".tajweed-catalog-lesson--ready").length,
      plannedRows: document.querySelectorAll(".tajweed-catalog-lesson--planned").length,
    };
  });

  await page.evaluate(() => {
    window.appState.currentUser = { uid: "guest", email: "guest", role: "guest" };
    window.appState.guestStudent = window.appState.guestStudent || {
      id: "guest", name: "Guest", level: "Part One", goals: [], progress: {}, homeworkNotes: {},
    };
    window.appState.currentStudentId = "guest";
  });
  const firstButton = page.locator(".tajweed-catalog-lesson--ready", {
    hasText: "Course scope, reading tradition, and how to study",
  }).last();
  if (await firstButton.count()) {
    await firstButton.click({ force: true });
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => {
    const toggle = document.querySelector("#teacherModeToggle");
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change", { bubbles: true }));
  });
  const teacherTabs = await page.evaluate(() => [...document.querySelectorAll(".lesson-tab")]
    .filter((tab) => tab.style.display !== "none")
    .map((tab) => tab.textContent.trim()));
  await page.evaluate(() => {
    const toggle = document.querySelector("#teacherModeToggle");
    toggle.checked = false;
    toggle.dispatchEvent(new Event("change", { bubbles: true }));
  });
  const studentTabs = await page.evaluate(() => [...document.querySelectorAll(".lesson-tab")]
    .filter((tab) => tab.style.display !== "none")
    .map((tab) => tab.textContent.trim()));
  await page.locator('#lesson-screen .lesson-tab[data-tab="overview"]').evaluate((element) => element.click());
  await page.waitForTimeout(150);
  const learnView = await page.evaluate(() => ({
    hero: document.querySelectorAll(".tajweed-learn-hero").length,
    sections: document.querySelectorAll(".tajweed-learn-section").length,
    jumpButtons: document.querySelectorAll(".tajweed-learn-jump button").length,
    ruleCards: document.querySelectorAll(".tajweed-learn-rule-card").length,
    targetBadges: document.querySelectorAll(".tajweed-learn-targets span").length,
    teacherSourceVisible: document.querySelectorAll(".tajweed-teacher-source").length,
  }));
  const practiceTab = page.locator('#lesson-screen .lesson-tab[data-tab="practice"]');
  if (await practiceTab.count()) {
    await practiceTab.evaluate((element) => element.click());
    await page.waitForTimeout(250);
  }
  const firstAnswer = page.locator(".tajweed-activity button:visible").first();
  if (await firstAnswer.count()) {
    await firstAnswer.click();
    await page.waitForTimeout(100);
  }
  const afterClick = await page.evaluate(() => ({
    hasDefinition: document.body.textContent.includes("Definition"),
    hasPractice: document.body.textContent.includes("Practice"),
    hasFoundationFormula: document.body.textContent.includes("معرفة") || document.body.textContent.includes("teacher-modelled"),
    activityCards: document.querySelectorAll(".tajweed-activity").length,
    activityButtons: document.querySelectorAll(".tajweed-activity button").length,
    practiceProgress: document.querySelector(".tajweed-practice-progress")?.textContent || "",
    currentLessonId: window.appState?.currentLessonId || "",
    currentTab: window.appState?.currentTab || "",
    currentLessonActivities: window.lessons?.[window.appState?.currentLessonId]?.interactiveActivities?.length || 0,
    activeScreen: document.querySelector(".screen--active")?.id || "",
  }));

  console.log(JSON.stringify({ ...result, studentTabs, teacherTabs, learnView, afterClick, errors }, null, 2));
  await browser.close();
  server.close();
})().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
