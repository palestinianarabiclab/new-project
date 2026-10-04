const source = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part One",
  pdf: "en_Tajweed_Rules_of_the_Quran_Part_01.pdf",
  pdfPages: pages,
  printedPages: pages,
  chapter: "How Letters Are Formed",
  section,
  verification: "book source aligned; articulation performance requires teacher observation",
});

const example = (arabic, label, target, rule, explanation, instruction, page) => ({
  arabic,
  surah: { ar: "مثال تعليمي", en: label },
  ayah: "—",
  targetText: target,
  triggerLetter: target,
  previousLetter: "موضع النطق",
  rule,
  teacherExplanation: explanation,
  readingInstruction: instruction,
  commonError: "Adding a vowel or blocking the sound incorrectly.",
  wordBoundary: "instructional-context",
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const activity = (stage, prompt, items, answer, correct, incorrect) => ({
  stage,
  type: "letter-formation",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: correct,
  feedbackIncorrect: incorrect,
});

function makeLesson(spec) {
  const { id, number, ar, en, pages, definitionAr, definitionEn, formula, focus, examples, extra = [] } = spec;
  return {
    id,
    unitId: "unit-08",
    lessonNumber: `8.${number}`,
    title: { ar, en },
    source: source(pages, en),
    contentOrigin: "source-and-instructional-design",
    level: "Foundation",
    estimatedMinutes: number === 4 ? 50 : 40,
    prerequisites: [
      "Recognize a letter's articulation point.",
      "Distinguish a vowelled letter from a sakin letter.",
      "Listen to a teacher model before independent recitation.",
    ],
    learningOutcomes: [
      `Explain ${en.toLowerCase()}.`,
      "Describe how airflow and articulation interact.",
      "Produce the target without an added vowel.",
      "Prepare the sound distinction needed for qalqalah.",
    ],
    definition: {
      linguistic: {
        ar: "الحرف صوت يعتمد على مخرج محدد أو مقدر.",
        en: "A letter is a sound that relies on a defined or estimated articulation point.",
      },
      technical: { ar: definitionAr, en: definitionEn },
      studentFriendly: { ar: definitionAr, en: definitionEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "الصوت", transliteration: "as-sawt", en: "sound" },
      { ar: "المخرج", transliteration: "al-makhraj", en: "articulation point" },
      { ar: "الحرف الساكن", transliteration: "al-harf as-sakin", en: "non-vowelled letter" },
      { ar: "الحرف المتحرك", transliteration: "al-harf al-mutaharrik", en: "vowelled letter" },
    ],
    teacherPreparation: [
      "Prepare a slow side-view demonstration of the mouth.",
      "Contrast one sakin letter with the same letter carrying fathah, dammah, and kasrah.",
      "Listen for an added vowel after every sakin production.",
      "Delay qalqalah terminology until the formation contrast is secure.",
    ],
    openingReview: [
      { minutes: 2, teacherPrompt: "Point to the letter's articulation point." },
      { minutes: 2, teacherPrompt: "Is the letter sakin or vowelled?" },
    ],
    conceptExplanation: [
      { audience: "student", text: definitionEn },
      { audience: "teacher", text: `Keep the demonstration centered on ${focus}; judge the sound by listening, not mouth shape alone.` },
    ],
    lessonPath: [
      { step: 1, title: "Prepare", text: "Place the articulation organs correctly." },
      { step: 2, title: "Release", text: "Let the sound or airflow follow the letter's state." },
      { step: 3, title: "Observe", text: "Notice whether the mouth moves toward a vowel." },
      { step: 4, title: "Check", text: "Listen for an added vowel, loss of sound, or excessive force." },
      { step: 5, title: "Repeat", text: "Produce the sound in a word under teacher observation." },
    ],
    visualExplanation: [
      { type: "rule-equation", display: formula, teacherUse: "Trace preparation, contact, and release in order." },
    ],
    ruleSummary: {
      condition: focus,
      result: definitionEn,
      location: "At the articulation point while observing the written vowel or sukoon.",
      letters: ["بْ", "بَ", "بُ", "بِ"],
    },
    letterGroups: [
      { name: { ar: "ساكن", en: "Non-vowelled" }, letters: ["بْ", "دْ", "قْ"] },
      { name: { ar: "متحرك", en: "Vowelled" }, letters: ["بَ", "بُ", "بِ"] },
    ],
    quranExamples: examples,
    guidedPractice: [
      {
        sequence: 1,
        teacherAction: "Model the sound in isolation and contrast.",
        studentAction: "Name the letter state and imitate once.",
        feedback: "Correct the articulation before increasing speed.",
      },
      {
        sequence: 2,
        teacherAction: "Place the sound inside a short word.",
        studentAction: "Recite without inserting or deleting a vowel.",
        feedback: "Approve by listening to the release and following sound.",
      },
    ],
    oralPractice: [{
      cycle: ["identify state", "prepare articulation", "produce", "listen", "repeat in context"],
      examplesRequired: examples.length,
      teacherObservation: ["correct articulation", "correct mouth direction", "no added vowel", "controlled release"],
    }],
    interactiveActivities: [
      activity("1 · Definition", "What controls the identity of a consonant sound?", ["Its articulation point and qualities", "Word length", "Page color"], "Its articulation point and qualities", "Correct.", "Return to the definition of a letter."),
      activity("2 · State", "What sign marks a non-vowelled letter?", ["Sukoon", "Fathah", "Tanween only"], "Sukoon", "Correct.", "A sakin letter carries sukoon or is made sakin by context."),
      activity("3 · Movement", "What accompanies a vowelled letter?", ["Movement toward the vowel's direction", "Complete silence", "An automatic echo"], "Movement toward the vowel's direction", "Correct.", "Observe the mouth direction."),
      activity("4 · Error", "What must not be added after a sakin letter?", ["A new vowel", "Correct articulation", "Controlled airflow"], "A new vowel", "Correct.", "Keep the letter sakin."),
      activity("5 · Preparation", "Why is this unit taught before qalqalah?", ["To distinguish normal sakin formation from controlled qalqalah", "To memorize page numbers", "To replace articulation study"], "To distinguish normal sakin formation from controlled qalqalah", "Correct.", "Qalqalah must not become an added vowel."),
      ...extra,
    ],
    commonMistakes: [
      "Producing the written letter name instead of its sound.",
      "Adding fathah, dammah, or kasrah after a sakin letter.",
      "Exaggerating mouth movement.",
      "Assuming every sakin letter requires qalqalah.",
    ],
    correctionTechniques: [
      "Use paired contrasts such as بْ / بَ.",
      "Freeze briefly at the articulation point before release.",
      "Record and replay the sound at normal speed.",
      "Move from isolation to a word, then to a short phrase.",
    ],
    knowledgeChecks: [
      { type: "recognition", prompt: "Classify twelve letter samples as sakin or vowelled.", success: "At least ten correct." },
      { type: "recitation", prompt: "Produce contrasting samples.", success: "No added vowel in two consecutive attempts." },
    ],
    teacherQuestions: [
      "Where is the articulation point?",
      "Is the letter sakin or vowelled?",
      "Which direction does the mouth move?",
      "Did you add a sound after the letter?",
    ],
    studentTasks: [
      "Mark the letter state.",
      "Describe the mouth movement.",
      "Produce the contrast under teacher observation.",
    ],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Articulation point" },
      { minutes: 8, phase: "Demonstration", display: formula },
      { minutes: 10, phase: "Contrast", display: "Sakin / vowelled" },
      { minutes: 10, phase: "Guided production", display: "Teacher listening" },
      { minutes: 5, phase: "Exit", display: "State and sound" },
    ],
    independentPractice: ["Classify and record six teacher-approved sound contrasts."],
    homework: ["Prepare four sakin/vowelled pairs and explain the mouth movement."],
    exitTicket: ["Name the letter state.", "Describe its formation.", "Produce it without an added vowel."],
    masteryCriteria: [
      "Identifies the state correctly.",
      "Explains the formation sequence.",
      "Produces the target without an added vowel.",
      "Passes two teacher-observed attempts.",
    ],
    teacherNotes: [
      "Visual movement supports learning but does not replace listening.",
      "Do not introduce bounce as a general property of sukoon.",
    ],
    sourceNotes: [
      `Uses pages ${pages.join(", ")}.`,
      "Activities and contrast drills are instructional-design additions.",
    ],
    verificationStatus: "source-aligned; teacher performance review required",
  };
}

const specs = [
  {
    id: "tajweed-u08-l01-sound-formation",
    number: 1,
    ar: "كيفية حدوث الصوت والحروف",
    en: "How sound and letters are formed",
    pages: [83],
    definitionAr: "ينشأ صوت الحرف من الهواء الخارج، ثم يتحدد باعتماده على مخرجه واكتسابه صفاته عند النطق.",
    definitionEn: "A letter sound begins with outgoing air and becomes distinct through its articulation point and sound qualities.",
    formula: "هواء خارج + مخرج + صفات = صوت حرف متميز",
    focus: "The sequence from breath and voice to articulation and release",
    examples: [
      example("أَبْ", "Closing at the lips", "بْ", "تكوّن الحرف", "The lips define the ba sound while it remains sakin.", "Close the lips, then release without adding a vowel.", 83),
      example("أَجْ", "Middle-tongue articulation", "جْ", "تكوّن الحرف", "The articulation point shapes the outgoing sound.", "Maintain the correct contact and release.", 83),
      example("أَهْ", "Throat articulation", "هْ", "تكوّن الحرف", "The sound is identified at its throat articulation area.", "Let the breath pass without changing it into another letter.", 83),
    ],
  },
  {
    id: "tajweed-u08-l02-non-vowelled",
    number: 2,
    ar: "الحروف الساكنة",
    en: "Non-vowelled letters",
    pages: [84],
    definitionAr: "الحرف الساكن يخرج بالاعتماد على مخرجه دون أن يصاحبه فتح للفم أو ضم للشفتين أو انخفاض للفك على هيئة حركة مستقلة.",
    definitionEn: "A non-vowelled letter is produced at its articulation point without an independent mouth movement toward fathah, dammah, or kasrah.",
    formula: "حرف + سكون = اعتماد على المخرج بلا حركة مضافة",
    focus: "Stable articulation without a following vowel movement",
    examples: [
      example("يَجْعَلْ", "Sakin jim and lam", "جْ", "حرف ساكن", "The jim is formed at its articulation point without a vowel after it.", "Release directly into the following sound.", 84),
      example("قَدْ", "Sakin dal", "دْ", "حرف ساكن", "Dal closes the word while retaining sukoon.", "Do not turn it into دَ or دُ.", 84),
      example("ٱلْحَمْدُ", "Sakin lam and mim", "لْ", "حرف ساكن", "The lam remains sakin before the next consonant.", "Keep the tongue placement controlled.", 84),
    ],
  },
  {
    id: "tajweed-u08-l03-vowelled",
    number: 3,
    ar: "الحروف المتحركة وحركة الفم",
    en: "Vowelled letters and mouth movement",
    pages: [85],
    definitionAr: "الحرف المتحرك يصاحبه اتجاه للفم يناسب الحركة: فتح للفم مع الفتحة، وضم للشفتين مع الضمة، وانخفاض للفك مع الكسرة.",
    definitionEn: "A vowelled letter is accompanied by a mouth direction matching its vowel: opening for fathah, lip rounding for dammah, and jaw lowering for kasrah.",
    formula: "بَ = فتح | بُ = ضم | بِ = انخفاض",
    focus: "Coordinating articulation with the direction of each short vowel",
    examples: [
      example("بَ", "Fathah direction", "بَ", "حرف متحرك", "Fathah follows the ba with an opening direction.", "Open naturally without lengthening.", 85),
      example("بُ", "Dammah direction", "بُ", "حرف متحرك", "Dammah follows with rounded lips.", "Round after forming ba; do not add waw.", 85),
      example("بِ", "Kasrah direction", "بِ", "حرف متحرك", "Kasrah follows with a lowered jaw direction.", "Keep it short; do not add ya.", 85),
    ],
  },
  {
    id: "tajweed-u08-l04-review",
    number: 4,
    ar: "مراجعة تكوّن الحروف قبل القلقلة",
    en: "Formation review before qalqalah",
    pages: [83, 84, 85, 86],
    definitionAr: "تجمع المراجعة بين تحديد المخرج وحالة الحرف وحركة الفم، وتميّز بين السكون الصحيح والصوت الزائد تمهيدًا لتعلم القلقلة.",
    definitionEn: "This review combines articulation, letter state, and mouth movement, separating correct sukoon from an added vowel before qalqalah study.",
    formula: "مخرج + ساكن/متحرك + فحص الحركة الزائدة = استعداد صحيح للقلقلة",
    focus: "Mixed diagnosis of articulation, sukoon, vowel movement, and added-vowel errors",
    examples: [
      example("أَبْ / بَ", "Sakin versus fathah", "بْ", "مقارنة", "The first ends at sukoon; the second moves into fathah.", "Produce a clearly different pair.", 86),
      example("أَدْ / دُ", "Sakin versus dammah", "دْ", "مقارنة", "The sakin dal has no rounded-vowel ending.", "Avoid saying أَدُ.", 86),
      example("أَقْ / قِ", "Sakin versus kasrah", "قْ", "مقارنة", "The first has sukoon while the second carries kasrah.", "Keep the first free of an added i sound.", 86),
    ],
    extra: [
      activity("6 · Diagnosis", "A learner says أَبَ instead of أَبْ. What happened?", ["An added fathah", "Correct sukoon", "Natural madd"], "An added fathah", "Correct.", "The sakin letter received an unwanted vowel."),
      activity("6 · Diagnosis", "Which pair best prepares for qalqalah study?", ["دْ / دَ", "ا / و", "مّ / نّ"], "دْ / دَ", "Correct.", "The contrast exposes an added-vowel error."),
      activity("6 · Mastery", "What decides successful sound production?", ["Teacher-observed listening plus correct articulation", "Visual shape alone", "Fast repetition alone"], "Teacher-observed listening plus correct articulation", "Correct.", "Sound mastery must be heard."),
    ],
  },
];

export const unit08Lessons = specs.map(makeLesson);
