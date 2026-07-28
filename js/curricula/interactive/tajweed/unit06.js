const source = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part One", pdf: "en_Tajweed_Rules_of_the_Quran_Part_01.pdf",
  pdfPages: pages, printedPages: pages, chapter: "Lam Saakinah", section,
  verification: "book source checked; teacher pronunciation review required",
});
const example = (arabic, label, target, trigger, rule, why, how, page, boundary = "within-one-word") => ({
  arabic, surah: { ar: "مثال قرآني", en: label }, ayah: "—", targetText: target, triggerLetter: trigger,
  previousLetter: "لْ", rule, teacherExplanation: why, readingInstruction: how,
  commonError: "Showing or merging lam in the wrong place.", wordBoundary: boundary, sourcePage: page,
  verificationStatus: "teacher-review-required",
});
const quiz = (stage, prompt, items, answer, right, wrong) => ({
  stage, type: "lam-decision", instruction: { en: "Choose the best answer." }, prompt, items,
  acceptedAnswers: [answer], feedbackCorrect: right, feedbackIncorrect: wrong,
});
function make({ id, number, ar, en, pages, definition, formula, letters, groups, examples, quizzes, outcomes }) {
  const quizFallbacks = [
    quiz("4 · Method", "What must be identified before deciding the lam sound?", ["The lam category and next letter", "The page number", "Word length"], "The lam category and next letter", "Correct.", "Category and trigger control the decision."),
    quiz("5 · Recitation", "What confirms mastery?", ["Teacher-observed correct recitation", "Spelling alone", "Reading quickly"], "Teacher-observed correct recitation", "Correct.", "Lam treatment must be heard in context."),
  ];
  return {
    id, unitId: "unit-06", lessonNumber: number, title: { ar, en }, source: source(pages, en),
    contentOrigin: "source-and-instructional-design", level: "Foundation", estimatedMinutes: 45,
    prerequisites: ["Recognize lam and sukoon.", "Recognize shaddah.", "Inspect the immediate next letter."],
    learningOutcomes: outcomes,
    definition: {
      linguistic: { ar: "اللام الساكنة لام خالية من الحركة.", en: "Lam saakinah is lam with no vowel." },
      technical: { ar: definition, en: definition },
      studentFriendly: { ar: definition, en: definition },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "اللام الساكنة", transliteration: "al-lam as-sakinah", en: "lam with sukoon" },
      { ar: "الإظهار", transliteration: "al-izhar", en: "pronouncing lam clearly" },
      { ar: "الإدغام", transliteration: "al-idgham", en: "merging lam into the following letter" },
      { ar: "لام التعريف", transliteration: "lam at-ta'rif", en: "lam of the definite article ال" },
    ],
    teacherPreparation: ["Prepare sun- and moon-letter cards.", "Highlight written lam and the following letter.", "Model written-but-not-pronounced lam.", "Use teacher listening for final mastery."],
    openingReview: [{ minutes: 2, teacherPrompt: "Find لْ." }, { minutes: 2, teacherPrompt: "Identify the immediate next letter." }],
    conceptExplanation: [
      { audience: "student", text: definition },
      { audience: "teacher", text: "Always identify the category of lam before deciding whether it is clear or merged." },
    ],
    lessonPath: [
      { step: 1, title: "Find", text: "Locate lam saakinah." }, { step: 2, title: "Name", text: "Identify its category." },
      { step: 3, title: "Inspect", text: "Check the following letter." }, { step: 4, title: "Decide", text: "Show or merge lam." },
      { step: 5, title: "Recite", text: "Apply the decision in context." },
    ],
    visualExplanation: [{ type: "rule-equation", display: formula, teacherUse: "Reveal after learner prediction." }],
    ruleSummary: { condition: "A written or spoken lam saakinah is present.", result: definition, location: "Its category and next letter determine the reading.", letters },
    letterGroups: groups, quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: "Show lam and its context.", studentAction: "Name category and next letter.", feedback: "Require both before the rule." },
      { sequence: 2, teacherAction: "Model the boundary.", studentAction: "Isolate, connect, recite.", feedback: "Correct visibility and sound separately." },
    ],
    oralPractice: [{ cycle: ["locate", "categorize", "inspect", "decide", "recite"], examplesRequired: examples.length, teacherObservation: ["correct category", "correct lam treatment", "accurate next letter"] }],
    interactiveActivities: quizzes.length >= 5 ? quizzes : [...quizzes, ...quizFallbacks].slice(0, 5),
    commonMistakes: ["Deciding from spelling alone.", "Merging every lam.", "Showing lam before a sun letter.", "Confusing the word category."],
    correctionTechniques: ["Box the whole word.", "Circle the following letter.", "Contrast one clear and one merged example.", "Require a spoken reason."],
    knowledgeChecks: [{ type: "recognition", prompt: "Classify ten examples.", success: "At least eight are correct." }, { type: "recitation", prompt: "Recite a mixed set.", success: "Teacher approves two attempts." }],
    teacherQuestions: ["Which lam category is this?", "What follows lam?", "Is lam pronounced or merged?", "Where is the shaddah heard?"],
    studentTasks: ["Sort examples.", "Highlight lam and trigger.", "Explain before reciting."],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Lam and sukoon" }, { minutes: 8, phase: "Definition", display: formula },
      { minutes: 10, phase: "Teacher model", display: "Contrasts" }, { minutes: 10, phase: "Guided decisions", display: "Mixed cards" },
      { minutes: 8, phase: "Recitation", display: "Teacher listening" }, { minutes: 4, phase: "Exit", display: "Explain and recite" },
    ],
    independentPractice: ["Classify teacher-approved lam examples."], homework: ["Prepare four examples with category, trigger, and rule."],
    exitTicket: ["Name the category.", "State the rule.", "Recite one example."],
    masteryCriteria: ["Identifies the lam category.", "Uses the next letter.", "Scores 8 of 10.", "Recites correctly twice."],
    teacherNotes: ["Written presence does not guarantee audible lam.", "Keep category and sound as separate decisions."],
    sourceNotes: [`Uses pages ${pages.join(", ")}.`, "Activities are instructional-design additions."],
    verificationStatus: "source-aligned; teacher recitation review required",
  };
}
const sun = ["ت","ث","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ل","ن"];
const moon = ["ء","ب","ج","ح","خ","ع","غ","ف","ق","ك","م","ه","و","ي"];
export const unit06Lessons = [
  make({
    id:"tajweed-u06-l01-categories",number:"6.1",ar:"أقسام اللام الساكنة",en:"Five categories of lam saakinah",pages:[59],
    definition:"تأتي اللام الساكنة في خمس فئات تعليمية: لام التعريف، ولام الفعل، ولام الاسم، ولام الأمر، ولام الحرف؛ ويُحدَّد حكمها من الفئة والحرف التالي.",
    formula:"لام التعريف | الفعل | الاسم | الأمر | الحرف",letters:["ال","فعل","اسم","أمر","حرف"],
    groups:[
      {name:{ar:"لام التعريف",en:"Definite article"},letters:["ال"]},{name:{ar:"لام الفعل",en:"Verb lam"},letters:["قُلْ"]},
      {name:{ar:"لام الاسم",en:"Noun lam"},letters:["أَلْسِنَة"]},{name:{ar:"لام الأمر",en:"Command lam"},letters:["لْيَكْتُب"]},
      {name:{ar:"لام الحرف",en:"Particle lam"},letters:["هَلْ","بَلْ"]},
    ],
    examples:[
      example("ٱلْقَمَرُ","Definite article","لْقَ","ق","لام التعريف","Lam belongs to ال.","Classify before deciding.",59),
      example("قُلْ نَعَمْ","Verb","لْ نَ","ن","لام الفعل","Lam is part of a verb.","Keep the category visible.",59,"across-two-words"),
      example("هَلْ أَتَىٰ","Particle","لْ أَ","ء","لام الحرف","Lam belongs to the particle هل.","Pronounce according to the following letter.",59,"across-two-words"),
    ],
    outcomes:["Name five categories.","Identify a category from context.","Delay the sound decision until category is known."],
    quizzes:[
      quiz("1 · Categories","Which is lam of the definite article?",["ال","هل","قل"],"ال","Correct.","Look for the definite article."),
      quiz("1 · Categories","Which example contains verb lam?",["قُلْ","ٱلْقَمَر","هَلْ"],"قُلْ","Correct.","Lam is inside the verb."),
      quiz("2 · Method","What comes before the sound decision?",["Identify the category","Guess from color","Always merge"],"Identify the category","Correct.","Category comes first."),
      quiz("3 · Recall","How many categories are taught?",["5","2","14"],"5","Correct.","There are five."),
    ],
  }),
  make({
    id:"tajweed-u06-l02-definite-clear",number:"6.2",ar:"لام التعريف القمرية",en:"Lam of the definite article: clear reading",pages:[60],
    definition:"تُظهر لام التعريف إذا جاء بعدها أحد الحروف القمرية الأربعة عشر، فتُقرأ اللام الساكنة بوضوح.",
    formula:"الْ + الحروف القمرية = إظهار اللام",letters:moon,
    groups:[{name:{ar:"الحروف القمرية",en:"Moon letters"},letters:moon}],
    examples:[
      example("وَٱلْقَمَرِ إِذَا تَلَىٰهَا","Ash-Shams","لْقَ","ق","إظهار قمري","Qaf is a moon letter.","Pronounce lam clearly before qaf.",60),
      example("ٱلْحَمْدُ لِلَّهِ","Al-Fatihah","لْحَ","ح","إظهار قمري","Ha is a moon letter.","Keep lam audible.",60),
      example("ٱلْيَوْمَ","Qur'anic word","لْيَ","ي","إظهار قمري","Ya is a moon letter.","Read lam then ya.",60),
    ],
    outcomes:["Name moon letters.","Recognize written sukoon on lam.","Read lam clearly."],
    quizzes:[
      quiz("1 · Group","Which is a moon-letter group?",["ء ب ج ح خ","ت ث د ذ ر","س ش ص ض ط"],"ء ب ج ح خ","Correct.","These begin the moon list."),
      quiz("2 · Decision","ٱلْقَمَرُ",["Clear lam","Merged lam"],"Clear lam","Correct.","Qaf is a moon letter."),
      quiz("2 · Decision","ٱلْحَمْدُ",["Clear lam","Merged lam"],"Clear lam","Correct.","Ha is a moon letter."),
      quiz("3 · Error","A learner drops lam before ya.",["Restore clear lam","Merge more","Add ghunnah"],"Restore clear lam","Correct.","Ya is a moon letter."),
    ],
  }),
  make({
    id:"tajweed-u06-l03-definite-merge",number:"6.3",ar:"لام التعريف الشمسية",en:"Lam of the definite article: merging",pages:[60,61],
    definition:"تُدغم لام التعريف إذا جاء بعدها أحد الحروف الشمسية الأربعة عشر، فلا تُنطق اللام ويُشدَّد الحرف التالي.",
    formula:"ال + الحروف الشمسية = إدغام اللام وتشديد التالي",letters:sun,
    groups:[{name:{ar:"الحروف الشمسية",en:"Sun letters"},letters:sun}],
    examples:[
      example("وَٱلشَّمْسِ وَضُحَىٰهَا","Ash-Shams","لشَّ","ش","إدغام شمسي","Shin is a sun letter.","Do not pronounce lam; strengthen shin.",61),
      example("ٱلنَّاسِ","An-Nas","لنَّ","ن","إدغام شمسي","Noon is a sun letter.","Enter directly into strengthened noon.",61),
      example("ٱلرَّحْمَـٰنِ","Qur'anic word","لرَّ","ر","إدغام شمسي","Ra is a sun letter.","Merge lam into ra.",61),
    ],
    outcomes:["Name sun letters.","Recognize shaddah on the next letter.","Merge lam correctly."],
    quizzes:[
      quiz("1 · Group","Which is a sun-letter group?",["ت ث د ذ ر","ء ب ج ح خ","ع غ ف ق ك"],"ت ث د ذ ر","Correct.","These are sun letters."),
      quiz("2 · Decision","ٱلشَّمْسُ",["Merged lam","Clear lam"],"Merged lam","Correct.","Shin is a sun letter."),
      quiz("2 · Decision","ٱلنَّاسُ",["Merged lam","Clear lam"],"Merged lam","Correct.","Noon carries the strengthened sound."),
      quiz("3 · Error","A learner says the lam in الرحمن.",["Merge into ra","Keep lam clearer","Add a vowel"],"Merge into ra","Correct.","Ra is a sun letter."),
    ],
  }),
  make({
    id:"tajweed-u06-l04-other-categories",number:"6.4",ar:"اللام في الأفعال والأسماء والأوامر والحروف",en:"Lam in verbs, commands, nouns, and particles",pages:[61,62],
    definition:"تُظهر اللام الساكنة في الأسماء والأفعال والأوامر والحروف في الأصل، وقد تُدغم عند التقاء اللام أو الراء وفق الموضع المنقول؛ لذلك تُفحص الفئة والحرف التالي معًا.",
    formula:"لام غير التعريف → الأصل الإظهار، وافحص ل/ر",letters:["ل","ر","باقي الحروف"],
    groups:[
      {name:{ar:"الأصل",en:"Default"},letters:["إظهار"]},
      {name:{ar:"موضع الإدغام",en:"Merging context"},letters:["ل","ر"]},
    ],
    examples:[
      example("قُلْ نَعَمْ","Verb lam","لْ نَ","ن","إظهار","Lam is in a verb and noon follows.","Pronounce lam clearly.",62,"across-two-words"),
      example("هَلْ أَتَىٰ","Particle lam","لْ أَ","ء","إظهار","Hamzah follows particle lam.","Keep lam clear.",62,"across-two-words"),
      example("قُل رَّبِّ","Verb before ra","ل رَّ","ر","إدغام","Ra follows the verb lam in connected reading.","Merge according to the transmitted reading.",62,"across-two-words"),
    ],
    outcomes:["Identify non-definite lam.","Apply the default clear rule.","Recognize l/ra merging contexts."],
    quizzes:[
      quiz("1 · Category","قُلْ contains which lam?",["Verb lam","Definite article","Noun lam"],"Verb lam","Correct.","Lam is part of the verb."),
      quiz("2 · Default","What is the default for these categories?",["Clear lam","Always merge","Always hide"],"Clear lam","Correct.","Show lam unless a valid merging context applies."),
      quiz("3 · Decision","هَلْ أَتَىٰ",["Clear lam","Merged lam"],"Clear lam","Correct.","Hamzah follows."),
      quiz("3 · Decision","قُل رَّبِّ",["Merged into ra","Clear moon lam","Hidden lam"],"Merged into ra","Correct.","Ra creates the merging context."),
    ],
  }),
  make({
    id:"tajweed-u06-l05-review",number:"6.5",ar:"استثناءات ومراجعة اللام الساكنة",en:"Exception and mixed review",pages:[59,60,61,62],
    definition:"تبدأ المراجعة بتحديد فئة اللام، ثم الحرف التالي، ثم الإظهار أو الإدغام؛ مع عدم تطبيق قاعدة الشمس والقمر على كل لام في القرآن.",
    formula:"فئة اللام → الحرف التالي → إظهار أو إدغام",letters:["قمري","شمسي","فعل","اسم","أمر","حرف"],
    groups:[
      {name:{ar:"تعريف قمري",en:"Definite clear"},letters:moon},
      {name:{ar:"تعريف شمسي",en:"Definite merged"},letters:sun},
      {name:{ar:"غير التعريف",en:"Other categories"},letters:["افحص السياق"]},
    ],
    examples:[
      example("ٱلْقَمَرُ","Clear definite","لْقَ","ق","إظهار قمري","Qaf is a moon letter.","Show lam.",62),
      example("ٱلشَّمْسُ","Merged definite","لشَّ","ش","إدغام شمسي","Shin is a sun letter.","Merge lam.",62),
      example("هَلْ أَتَىٰ","Particle","لْ أَ","ء","إظهار","This is not the definite article.","Show lam clearly.",62,"across-two-words"),
      example("قُل رَّبِّ","Verb context","ل رَّ","ر","إدغام","This is verb lam before ra.","Merge in connected reading.",62,"across-two-words"),
    ],
    outcomes:["Rebuild all categories.","Avoid overapplying sun/moon rules.","Classify mixed examples.","Recite a balanced set."],
    quizzes:[
      quiz("1 · Mixed","ٱلْقَمَرُ",["Clear definite lam","Merged definite lam","Verb lam"],"Clear definite lam","Correct.","Qaf is moon."),
      quiz("1 · Mixed","ٱلنَّاسُ",["Merged definite lam","Clear definite lam","Particle lam"],"Merged definite lam","Correct.","Noon is sun."),
      quiz("1 · Mixed","هَلْ أَتَىٰ",["Clear particle lam","Sun lam","Moon lam"],"Clear particle lam","Correct.","This is not ال."),
      quiz("2 · Method","What is the first question?",["Which lam category?","Is there ghunnah?","How long is madd?"],"Which lam category?","Correct.","Category comes first."),
      quiz("3 · Mastery","Can sun/moon labels be applied to every lam?",["No","Yes"],"No","Correct.","They specifically describe lam of the definite article."),
    ],
  }),
];
