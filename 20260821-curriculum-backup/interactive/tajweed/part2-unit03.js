const source = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part Two",
  pdf: "tajweed-rules_part-2.pdf",
  pdfPages: pages.map((page) => page + 15),
  printedPages: pages,
  chapter: "Velarization and Attenuation (Tafkheem and Tarqeeq)",
  section,
  verification: "visually aligned to printed pages 19–27; exceptional ra cases require qualified-teacher review",
});

const example = (arabic, label, target, rule, why, how, page) => ({
  arabic,
  surah: { ar: "مثال من الكتاب", en: label },
  ayah: "—",
  targetText: target,
  triggerLetter: target,
  previousLetter: "موضع التفخيم أو الترقيق",
  rule,
  teacherExplanation: why,
  readingInstruction: how,
  commonError: "Changing the vowel while trying to make the letter heavy or light.",
  wordBoundary: "instructional-context",
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const activity = (stage, prompt, items, answer, right = "Correct.", wrong = "Check the target letter, its vowel, and the surrounding context.") => ({
  stage,
  type: "tafkheem-decision",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: right,
  feedbackIncorrect: wrong,
});

function make(spec) {
  const { id, n, ar, en, pages, definitionAr, definitionEn, formula, condition, letters, examples, groups = [], extra = [] } = spec;
  return {
    id,
    unitId: "part2-unit-03",
    lessonNumber: `3.${n}`,
    title: { ar, en },
    source: source(pages, en),
    contentOrigin: "book-source-and-instructional-design",
    level: "Part Two",
    estimatedMinutes: n === 6 || n === 7 ? 55 : 45,
    prerequisites: [
      "Recognize isti'la and istifal.",
      "Identify fathah, dammah, kasrah, and sukoon.",
      "Distinguish a permanent vowel from an incidental starting vowel.",
    ],
    learningOutcomes: [
      `Define ${en.toLowerCase()}.`,
      "Identify the target letter and its immediate context.",
      "Choose tafkheem or tarqeeq with a complete reason.",
      "Preserve the written vowel while changing resonance correctly.",
      "Recite teacher-approved examples twice.",
    ],
    definition: {
      linguistic: {
        ar: "التفخيم تسمين صوت الحرف، والترقيق تنحيفه.",
        en: "Tafkheem means making the letter's sound full; tarqeeq means making it light or thin.",
      },
      technical: { ar: definitionAr, en: definitionEn },
      studentFriendly: { ar: definitionAr, en: definitionEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "التفخيم", transliteration: "at-tafkheem", en: "full, heavy resonance" },
      { ar: "الترقيق", transliteration: "at-tarqeeq", en: "light, thin resonance" },
      { ar: "الاستعلاء", transliteration: "al-isti'la", en: "raising the back of the tongue" },
      { ar: "السياق", transliteration: "as-siyaq", en: "the vowel and surrounding-letter context" },
    ],
    teacherPreparation: [
      "Prepare a heavy/light contrast without changing the vowel.",
      "Highlight the target, its vowel, and the preceding letter separately.",
      "Use the same reading method consistently for allowed ra cases.",
      "Assess resonance by listening, not mouth appearance alone.",
    ],
    openingReview: [
      { minutes: 2, teacherPrompt: "Is the target always heavy, always light, or context-dependent?" },
      { minutes: 2, teacherPrompt: "What vowel or stopping condition controls the decision?" },
    ],
    conceptExplanation: [
      { audience: "student", text: definitionEn },
      { audience: "teacher", text: "Fullness is resonance created by tongue elevation; it is not an added alif, waw, or changed vowel." },
    ],
    lessonPath: [
      { step: 1, title: "Find", text: "Locate the target letter." },
      { step: 2, title: "Read context", text: "Check its vowel, preceding vowel, and stopping state." },
      { step: 3, title: "Classify", text: "Choose always heavy, always light, or conditional." },
      { step: 4, title: "Shape", text: "Raise or lower the back of the tongue without changing the vowel." },
      { step: 5, title: "Recite", text: "Apply the decision naturally in the full phrase." },
    ],
    visualExplanation: [{ type: "rule-equation", display: formula, teacherUse: "Reveal target, context, decision, and sound shape." }],
    ruleSummary: { condition, result: definitionEn, location: "The target letter and its taught vowel or stopping context.", letters },
    letterGroups: groups.length ? groups : [{ name: { ar, en }, letters }],
    quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: "Model the same vowel with heavy and light resonance.", studentAction: "Identify which production preserves the word.", feedback: "Correct resonance without changing the vowel." },
      { sequence: 2, teacherAction: "Reveal the context one element at a time.", studentAction: "State the decision and recite.", feedback: "Require the full reason before sound correction." },
    ],
    oralPractice: [{
      cycle: ["find target", "inspect vowel", "inspect neighbors", "decide", "recite"],
      examplesRequired: examples.length,
      teacherObservation: ["correct context", "correct decision", "stable vowel", "natural resonance"],
    }],
    interactiveActivities: [
      activity("1 · Meaning", "What is tafkheem?", ["Full resonance in the letter's body", "Adding a long alif", "Raising volume only"], "Full resonance in the letter's body"),
      activity("2 · Meaning", "What is tarqeeq?", ["Light resonance without filling the mouth", "Removing the letter", "Adding kasrah"], "Light resonance without filling the mouth"),
      activity("3 · Trigger", "What controls this lesson's decision?", [condition, "Word length", "Page number"], condition),
      activity("4 · Error", "What must remain unchanged?", ["The written vowel", "The verse order only", "The English meaning only"], "The written vowel"),
      activity("5 · Mastery", "How is correct resonance confirmed?", ["Teacher-observed recitation", "Visual recognition alone", "Maximum loudness"], "Teacher-observed recitation"),
      ...extra,
    ],
    commonMistakes: [
      "Turning fathah into an alif-like sound.",
      "Making every alif heavy.",
      "Ignoring a preceding kasrah.",
      "Applying a memorized ra rule without checking stopping context.",
    ],
    correctionTechniques: [
      "Alternate a heavy and light example with the same vowel.",
      "Mark the controlling vowel.",
      "Practice the target alone, then reconnect.",
      "Record allowed ra faces separately and keep one consistent choice.",
    ],
    knowledgeChecks: [
      { type: "recognition", prompt: "Classify ten mixed examples.", success: "At least eight correct with context." },
      { type: "recitation", prompt: "Recite a mixed set.", success: "Two teacher-approved attempts." },
    ],
    teacherQuestions: ["Which letter is targeted?", "What is its vowel?", "What precedes it?", "Are we connecting or stopping?"],
    studentTasks: ["Mark the controller.", "State heavy or light with reason.", "Recite a contrast pair."],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Isti'la and vowels" },
      { minutes: 8, phase: "Definition", display: formula },
      { minutes: 10, phase: "Contrast", display: "Heavy / light" },
      { minutes: 12, phase: "Decisions", display: "Context cards" },
      { minutes: 8, phase: "Recitation", display: "Teacher listening" },
      { minutes: 4, phase: "Exit", display: "Decision and reason" },
    ],
    independentPractice: ["Record four heavy/light contrasts without changing vowels."],
    homework: ["Prepare five examples with target, controller, ruling, and reason."],
    exitTicket: ["Name the controller.", "Choose heavy or light.", "Recite correctly."],
    masteryCriteria: ["Finds the target.", "Reads context correctly.", "Explains the decision.", "Preserves the vowel.", "Passes two attempts."],
    teacherNotes: ["Do not equate tafkheem with loudness.", "Exceptional ra cases should be approved by a qualified Tajweed teacher."],
    sourceNotes: [`Uses printed pages ${pages.join(", ")}.`, "Decision practice is an instructional-design addition."],
    verificationStatus: "source-aligned; qualified-teacher sound review required",
  };
}

const specs = [
  {
    id:"tajweed-p2-u03-l01-definitions",n:1,ar:"تعريف التفخيم والترقيق وأقسام الحروف",en:"Tafkheem and tarqeeq definitions and categories",pages:[19],
    definitionAr:"التفخيم سمن يدخل على جسم الحرف فيمتلئ الفم بصداه مع ارتفاع أقصى اللسان، والترقيق نحول يدخل على الحرف فلا يمتلئ الفم بصداه. والحروف ثلاثة أقسام: مفخمة دائمًا، ومرققة دائمًا، ومترددة بحسب السياق.",
    definitionEn:"Tafkheem fills the mouth with full resonance through posterior-tongue elevation; tarqeeq keeps resonance light. Letters divide into always heavy, always light, and context-dependent groups.",
    formula:"دائم التفخيم | متردد بحسب السياق | دائم الترقيق",
    condition:"Which of the three tafkheem/tarqeeq categories contains the letter",letters:["خص ضغط قظ","الألف واللام والراء","باقي الحروف"],
    groups:[
      {name:{ar:"مفخمة دائمًا",en:"Always heavy"},letters:["خ","ص","ض","غ","ط","ق","ظ"]},
      {name:{ar:"مترددة",en:"Context-dependent"},letters:["ا","ل لفظ الجلالة","ر"]},
      {name:{ar:"مرققة دائمًا",en:"Always light"},letters:["باقي الحروف"]},
    ],
    examples:[example("قَالَ","Always-heavy qaf","ق","تفخيم","Qaf belongs to خص ضغط قظ.","Raise the posterior tongue without changing fathah.",19),example("بِسْمِ","Always-light ba","ب","ترقيق","Ba is among the remaining letters.","Keep the mouth free of heavy resonance.",19),example("ٱللَّهِ","Context-dependent lam","لّ","بحسب السياق","Lam in Allah follows the preceding vowel.","Inspect what comes before the Name.",19)],
  },
  {
    id:"tajweed-p2-u03-l02-always-heavy",n:2,ar:"الحروف المفخمة دائمًا",en:"Letters that are always heavy",pages:[20],
    definitionAr:"حروف الاستعلاء السبعة خص ضغط قظ مفخمة في جميع أحوالها، وتتفاوت قوة تفخيمها بحسب صفاتها وحركتها، وحروف الإطباق الأربعة أقوى من غيرها.",
    definitionEn:"The seven isti'la letters خص ضغط قظ are always heavy, though their degree varies with characteristics and vowel; the four itbaq letters are generally stronger in fullness.",
    formula:"خص ضغط قظ = تفخيم دائم مع تفاوت الدرجة",condition:"The target is one of the seven isti'la letters",letters:["خ","ص","ض","غ","ط","ق","ظ"],
    examples:[example("طَالَ","Heavy ta","ط","تفخيم دائم","Ta combines isti'la and itbaq.","Use full resonance with stable fathah.",20),example("قِيلَ","Heavy qaf with kasrah","قِ","تفخيم دائم","Kasrah lowers the degree but does not remove tafkheem.","Keep qaf full without turning kasrah into another vowel.",20),example("خَيْرٌ","Heavy kha","خ","تفخيم دائم","Kha remains heavy with a lighter degree than itbaq letters.","Preserve throat articulation and fullness.",20)],
  },
  {
    id:"tajweed-p2-u03-l03-levels",n:3,ar:"مراتب التفخيم",en:"Levels of tafkheem",pages:[20,21,22],
    definitionAr:"للتفخيم مراتب صحيحة عند أهل الأداء؛ يعرض الكتاب منهج الثلاث مراتب ومنهج الخمس، وعلى القارئ الالتزام بمنهج واحد. وفي الخمس: المفتوح بعده ألف، ثم المفتوح، ثم المضموم، ثم الساكن، ثم المكسور.",
    definitionEn:"The book presents accepted three-level and five-level approaches to tafkheem; the reader should follow one consistently. In the five-level model, open-plus-alif is strongest and kasrah is lowest.",
    formula:"قَال > قَ > قُ > قْ > قِ (منهج خمس مراتب)",condition:"The vowel of the heavy letter and, for fathah, whether alif follows",letters:["ـَا","ـَ","ـُ","ـْ","ـِ"],
    groups:[
      {name:{ar:"الأقوى",en:"Strongest"},letters:["مفتوح بعده ألف"]},
      {name:{ar:"الوسط",en:"Middle levels"},letters:["مفتوح","مضموم","ساكن"]},
      {name:{ar:"الأدنى",en:"Lowest"},letters:["مكسور"]},
    ],
    examples:[example("قَالَ","Highest qaf level","قَا","أعلى التفخيم","Qaf has fathah followed by alif.","Keep fullness without corrupting alif.",21),example("قُلْ","Dammah level","قُ","مرتبة تفخيم","Dammah supports strong fullness.","Round the vowel naturally.",21),example("قِيلَ","Kasrah level","قِ","أدنى التفخيم","Kasrah lowers the degree while qaf remains heavy.","Do not make qaf light.",22)],
    extra:[activity("6 · Order","Which is strongest in the five-level model?",["Heavy letter with fathah followed by alif","Heavy letter with kasrah","Heavy letter with sukoon"],"Heavy letter with fathah followed by alif")],
  },
  {
    id:"tajweed-p2-u03-l04-context-letters",n:4,ar:"الحروف التي تفخم تارة وترقق تارة",en:"Letters that alternate between heavy and light",pages:[23],
    definitionAr:"الألف المدية لا توصف بالتفخيم أو الترقيق استقلالًا بل تتبع ما قبلها، ولام لفظ الجلالة والراء يتغير حكمهما بحسب الحركة والسياق المفصل.",
    definitionEn:"Madd alif follows the preceding letter in heaviness or lightness, while lam in Allah and ra change according to their detailed vowel and context rules.",
    formula:"الألف تتبع ما قبلها | لام الله والراء يحكمهما السياق",condition:"The target is alif madd, lam in Allah, or ra and requires contextual inspection",letters:["ا","لّ في الله","ر"],
    examples:[example("طَالَ","Alif follows heavy ta","طَا","تفخيم تابع","Alif follows the heavy letter before it.","Keep the alif full without treating it as independently heavy.",23),example("لِسَانٌ","Alif follows light sin","سَا","ترقيق تابع","Alif follows light sin.","Do not introduce heavy resonance.",23),example("نَادَىٰ","Alif follows light dal","دَىٰ","ترقيق تابع","The preceding dal is light.","Keep the alif light.",23)],
  },
  {
    id:"tajweed-p2-u03-l05-lam-allah",n:5,ar:"لام لفظ الجلالة",en:"Lam in the Name of Allah",pages:[23,24],
    definitionAr:"تفخم لام لفظ الجلالة إذا سبقها فتح أو ضم، أو ساكن قبله فتح أو ضم، وترقق إذا سبقها كسر أصلي أو عارض، أو ساكن قبله كسر.",
    definitionEn:"Lam in Allah is heavy after fathah or dammah (including a sakin separator controlled by them) and light after permanent or incidental kasrah, including a sakin separator controlled by kasrah.",
    formula:"فتح/ضم قبل الله = تفخيم | كسر قبل الله = ترقيق",
    condition:"The vowel before the Name of Allah, looking past a sakin separator when needed",letters:["اللَّه"],
    groups:[
      {name:{ar:"تفخيم",en:"Heavy lam"},letters:["قَالَ اللَّهُ","رَسُولُ اللَّهِ","عَلَى اللَّهِ"]},
      {name:{ar:"ترقيق",en:"Light lam"},letters:["بِاللَّهِ","لِلَّهِ","قُلِ اللَّهُمَّ"]},
    ],
    examples:[example("قَالَ ٱللَّهُ","After fathah","لّ","تفخيم لام الجلالة","Fathah precedes the Name.","Use a full lam while preserving fathah.",23),example("رَسُولُ ٱللَّهِ","After dammah","لّ","تفخيم لام الجلالة","Dammah precedes the Name.","Use full resonance.",23),example("بِٱللَّهِ","After kasrah","لّ","ترقيق لام الجلالة","Kasrah directly precedes the Name.","Keep lam light.",24),example("قُلِ ٱللَّهُمَّ","After incidental kasrah","لّ","ترقيق لام الجلالة","The pronounced connecting kasrah controls lam.","Use light lam in connection.",24)],
    extra:[
      activity("6 · Apply","Lam in بِاللَّهِ is:",["Light","Heavy","Always optional"],"Light"),
      activity("6 · Apply","Lam in قَالَ اللَّهُ is:",["Heavy","Light","Silent"],"Heavy"),
    ],
  },
  {
    id:"tajweed-p2-u03-l06-ra",n:6,ar:"أحكام الراء تفخيمًا وترقيقًا",en:"Ra: heavy and light cases",pages:[25,26,27],
    definitionAr:"تفخم الراء في حالات الفتح والضم وما يتبعهما، وترقق مع الكسر الأصلي أو عند السكون بعد كسر أصلي إذا لم يمنع مانع، وتوجد حالات عند الوقف أو مجاورة حرف الاستعلاء يجوز فيها الوجهان بحسب التفصيل.",
    definitionEn:"Ra is generally heavy with fathah, dammah, or contexts governed by them; it is light with kasrah and eligible sukoon after permanent kasrah. Stopping and isti'la contexts include detailed exceptions and allowed faces.",
    formula:"رَ/رُ وما يتبعهما = تفخيم | رِ أو رْ بعد كسر أصلي = ترقيق مع فحص الاستثناء",
    condition:"Ra's vowel, preceding vowels and sakin letters, stopping state, and any following isti'la letter",letters:["رَ","رُ","رِ","رْ"],
    groups:[
      {name:{ar:"تفخيم",en:"Heavy"},letters:["رَ","رُ","رْ بعد فتح/ضم","رْ بعد كسر عارض"]},
      {name:{ar:"ترقيق",en:"Light"},letters:["رِ","رْ بعد كسر أصلي بلا مانع","وقف بعد ياء ساكنة"]},
      {name:{ar:"وجهان",en:"Allowed faces"},letters:["حالات مخصوصة في الوقف والاستعلاء"]},
    ],
    examples:[example("رَمَضَانَ","Ra with fathah","رَ","تفخيم الراء","Ra carries fathah.","Use full ra without adding alif.",25),example("كُفِرُوا","Ra with dammah","رُ","تفخيم الراء","Ra carries dammah.","Use full resonance with correct rounding.",25),example("فِرْعَوْنَ","Sakin ra after kasrah","رْ","ترقيق الراء","Permanent kasrah precedes sakin ra with no blocking isti'la condition.","Keep ra light and controlled.",26),example("خَبِيرٌ","Ra with kasrah","رِ","ترقيق الراء","Ra itself carries kasrah.","Use light ra.",26)],
    extra:[
      activity("6 · Apply","Ra in رَمَضَانَ is:",["Heavy","Light","Silent"],"Heavy"),
      activity("6 · Apply","Ra carrying kasrah is generally:",["Light","Heavy","Always optional"],"Light"),
      activity("6 · Method","Before deciding a sakin ra, inspect:",["Preceding vowel, separators, stopping, and isti'la context","Only the letter after the word","Word length"],"Preceding vowel, separators, stopping, and isti'la context"),
    ],
  },
  {
    id:"tajweed-p2-u03-l07-review",n:7,ar:"المراجعة الشاملة للتفخيم والترقيق",en:"Tafkheem and tarqeeq cumulative practice",pages:[19,20,21,22,23,24,25,26,27],
    definitionAr:"تجمع المراجعة بين تحديد فئة الحرف ومرتبته وحركة السياق، ثم تطبيق أحكام الألف ولام لفظ الجلالة والراء دون تغيير الحركات.",
    definitionEn:"The review combines letter category, tafkheem level, and vowel context, then applies alif-following, lam-in-Allah, and ra decisions without changing vowels.",
    formula:"حدد الحرف → اقرأ السياق → اختر الحكم والمرتبة → حافظ على الحركة",
    condition:"Mixed always-heavy, always-light, alif, lam-in-Allah, and ra contexts",letters:["خص ضغط قظ","ا","لّ","ر"],
    examples:[example("قَالَ","Heavy qaf and following alif","قَا","تفخيم","Qaf is always heavy and alif follows it.","Use the high level without an added sound.",27),example("بِٱللَّهِ","Light lam in Allah","لّ","ترقيق","Kasrah controls the lam.","Keep it light.",27),example("رَسُولُ ٱللَّهِ","Heavy ra and lam","رَ","تفخيم","Ra has fathah and lam follows dammah.","Apply each decision separately.",27),example("فِرْعَوْنَ","Light sakin ra","رْ","ترقيق","Permanent kasrah controls eligible sakin ra.","Keep ra light.",27)],
    extra:[
      activity("6 · Mixed","Alif in طَالَ follows:",["Heavy ta","Its own independent ruling","The next lam"],"Heavy ta"),
      activity("6 · Mixed","Lam in لِلَّهِ is:",["Light","Heavy","Optional"],"Light"),
      activity("6 · Mixed","Which set is always heavy?",["خص ضغط قظ","فحثه شخص سكت","لن عمر"],"خص ضغط قظ"),
      activity("6 · Mixed","What must never change while shaping resonance?",["The written vowel","The title","The page number"],"The written vowel"),
    ],
  },
];

export const part2Unit03Lessons = specs.map(make);
