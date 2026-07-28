const source = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part One",
  pdf: "en_Tajweed_Rules_of_the_Quran_Part_01.pdf",
  pdfPages: pages,
  printedPages: pages,
  chapter: "Meem Saakinah Rules",
  section,
  verification: "book source checked; Qur'anic examples require teacher recitation review",
});

const example = (arabic, surah, ayah, targetText, triggerLetter, rule, explanation, instruction, page, boundary = "across-two-words") => ({
  arabic,
  surah: { ar: surah, en: surah },
  ayah,
  targetText,
  rule,
  triggerLetter,
  previousLetter: "مْ",
  teacherExplanation: explanation,
  readingInstruction: instruction,
  commonError: "Using the wrong lip closure or ghunnah timing.",
  wordBoundary: boundary,
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const activity = (stage, prompt, items, answer, correct, incorrect) => ({
  stage,
  type: "rule-decision",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: correct,
  feedbackIncorrect: incorrect,
});

function makeLesson({
  id, number, titleAr, titleEn, pages, definitionAr, definitionEn,
  formula, letters, groups, examples, activities, outcomes, notes = [],
}) {
  const activityFallbacks = [
    activity("4 · Method", "What must be checked first?", ["Meem saakinah and the immediate next letter", "The verse number", "Any later letter"], "Meem saakinah and the immediate next letter", "Correct.", "Use the immediate-next-letter routine."),
    activity("5 · Recitation", "What confirms sound mastery?", ["Teacher-observed recitation", "A visual answer alone", "Reading quickly"], "Teacher-observed recitation", "Correct.", "The rule must be heard in live application."),
  ];
  return {
    id,
    unitId: "unit-04",
    lessonNumber: number,
    title: { ar: titleAr, en: titleEn },
    source: source(pages, titleEn),
    contentOrigin: "source-and-instructional-design",
    level: "Foundation",
    estimatedMinutes: 45,
    prerequisites: ["Recognize meem: م.", "Recognize meem saakinah: مْ.", "Use the immediate-next-letter decision routine."],
    learningOutcomes: outcomes,
    definition: {
      linguistic: { ar: "السكون هو خلو الحرف من الحركة.", en: "Sukoon means that the letter has no vowel." },
      technical: { ar: definitionAr, en: definitionEn },
      studentFriendly: { ar: definitionAr, en: definitionEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "الميم الساكنة", transliteration: "al-mim as-sakinah", en: "meem with no vowel: مْ" },
      { ar: titleAr, transliteration: titleEn, en: definitionEn },
      { ar: "غنة حركتين", transliteration: "ghunnah harakatayn", en: "a controlled two-count nasal sound" },
    ],
    teacherPreparation: ["Prepare a meem-saakinah card.", "Highlight only the immediate next letter.", "Model the boundary before the full phrase.", "Assess pronunciation by live listening."],
    openingReview: [
      { minutes: 2, teacherPrompt: "Find meem saakinah among مَ، مْ، مُ." },
      { minutes: 2, teacherPrompt: "Point to the immediately following letter." },
    ],
    conceptExplanation: [
      { audience: "student", text: definitionEn },
      { audience: "teacher", text: "Separate visual recognition, rule explanation, lip position, and ghunnah timing." },
    ],
    lessonPath: [
      { step: 1, title: "Find", text: "Locate meem saakinah." },
      { step: 2, title: "Inspect", text: "Read the next letter." },
      { step: 3, title: "Decide", text: "Select the meem rule." },
      { step: 4, title: "Recite", text: "Apply lip position and ghunnah." },
      { step: 5, title: "Verify", text: "Recite to the teacher." },
    ],
    visualExplanation: [{ type: "rule-equation", display: formula, teacherUse: "Reveal the result after the learner identifies the trigger." }],
    ruleSummary: {
      condition: "Meem saakinah is followed immediately by the lesson trigger.",
      result: definitionEn,
      location: "Within one word or across two words when the relevant boundary occurs.",
      letters,
    },
    letterGroups: groups,
    quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: "Show target and trigger.", studentAction: "Name both and state the rule.", feedback: "Require a complete reason." },
      { sequence: 2, teacherAction: "Model the boundary.", studentAction: "Isolate, connect, and recite.", feedback: "Correct lips and ghunnah separately." },
    ],
    oralPractice: [{ cycle: ["listen", "locate", "isolate", "connect", "recite"], examplesRequired: examples.length, teacherObservation: ["accurate meem", "accurate trigger", "correct ghunnah", "smooth continuation"] }],
    interactiveActivities: activities.length >= 5 ? activities : [...activities, ...activityFallbacks].slice(0, 5),
    commonMistakes: ["Looking beyond the immediate next letter.", "Adding or removing ghunnah incorrectly.", "Using an exaggerated lip movement."],
    correctionTechniques: ["Practice the two-letter boundary.", "Use a mirror for lip position.", "Use two finger taps when ghunnah is required."],
    knowledgeChecks: [
      { type: "recognition", prompt: "Classify ten mixed boundaries.", success: "At least eight are correct with reasons." },
      { type: "recitation", prompt: "Recite teacher-selected examples.", success: "Teacher approves two consecutive attempts." },
    ],
    teacherQuestions: ["Where is مْ?", "What comes immediately after it?", "What rule applies?", "Is ghunnah required?"],
    studentTasks: ["Highlight target and trigger.", "Explain before reciting.", "Contrast with another meem rule."],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Meem and sukoon" },
      { minutes: 7, phase: "Definition", display: formula },
      { minutes: 8, phase: "Teacher model", display: "Verified boundaries" },
      { minutes: 10, phase: "Guided practice", display: "Rule decisions" },
      { minutes: 10, phase: "Recitation", display: "Teacher listening" },
      { minutes: 5, phase: "Exit check", display: "Explain and recite" },
    ],
    independentPractice: ["Mark meem-saakinah boundaries in teacher-approved phrases."],
    homework: ["Prepare three examples and explain the trigger before reciting."],
    exitTicket: ["Identify the trigger.", "State the rule.", "Recite one example."],
    masteryCriteria: ["Recognizes the target.", "Names the trigger group.", "Scores at least 8 of 10.", "Recites correctly in two attempts."],
    teacherNotes: ["Knowledge mastery does not replace teacher-observed recitation.", ...notes],
    sourceNotes: [`The lesson uses source pages ${pages.join(", ")}.`, "Activities and sequencing are instructional-design additions."],
    verificationStatus: "source-aligned; live teacher pronunciation review required",
  };
}

const overviewExamples = [
  example("عَلَيْهِمْ", "Visual form", "A", "مْ", "—", "ميم ساكنة", "The meem is written with sukoon.", "Close the lips for meem without adding a vowel.", 49, "within-one-word"),
];

export const unit04Lessons = [
  makeLesson({
    id: "tajweed-u04-l01-overview", number: "4.1", titleAr: "أحكام الميم الساكنة", titleEn: "Meem saakinah overview", pages: [49],
    definitionAr: "الميم الساكنة ميم خالية من الحركة، ولها ثلاثة أحكام بحسب الحرف التالي: الإخفاء الشفوي، والإدغام الشفوي، والإظهار الشفوي.",
    definitionEn: "Meem saakinah is meem with no vowel. Its next letter selects one of three rules: oral concealment, oral merging, or oral manifestation.",
    formula: "مْ + ب = إخفاء | مْ + م = إدغام | مْ + باقي الحروف = إظهار",
    letters: ["ب", "م", "باقي الحروف"],
    groups: [
      { name: { ar: "إخفاء شفوي", en: "Oral concealment" }, letters: ["ب"] },
      { name: { ar: "إدغام شفوي", en: "Oral merging" }, letters: ["م"] },
      { name: { ar: "إظهار شفوي", en: "Oral manifestation" }, letters: ["باقي الحروف"] },
    ],
    examples: overviewExamples,
    outcomes: ["Recognize meem saakinah.", "Name its three rules.", "Use the immediate-next-letter routine."],
    activities: [
      activity("1 · Recognition", "Which is meem saakinah?", ["مَ", "مْ", "مُ"], "مْ", "Correct. Meem carries sukoon.", "Look for sukoon."),
      activity("2 · Rule map", "مْ + ب", ["Oral concealment", "Oral merging", "Oral manifestation"], "Oral concealment", "Correct.", "Ba has the concealment rule."),
      activity("2 · Rule map", "مْ + م", ["Oral concealment", "Oral merging", "Oral manifestation"], "Oral merging", "Correct.", "Meem causes merging."),
      activity("2 · Rule map", "مْ + ك", ["Oral concealment", "Oral merging", "Oral manifestation"], "Oral manifestation", "Correct.", "Kaf belongs to the remaining letters."),
    ],
  }),
  makeLesson({
    id: "tajweed-u04-l02-ikhfa-shafawi", number: "4.2", titleAr: "الإخفاء الشفوي", titleEn: "Oral concealment", pages: [50],
    definitionAr: "إذا جاء بعد الميم الساكنة حرف الباء تُخفى الميم مع غنة مقدارها حركتان.",
    definitionEn: "When ba follows meem saakinah, conceal the meem with a two-count ghunnah.",
    formula: "مْ + ب = إخفاء شفوي + غنة حركتين", letters: ["ب"],
    groups: [{ name: { ar: "حرف الإخفاء الشفوي", en: "Single trigger" }, letters: ["ب"] }],
    examples: [
      example("تَرْمِيهِم بِحِجَارَةٍ", "Al-Fil", 4, "م بِ", "ب", "الإخفاء الشفوي", "Ba follows meem saakinah across two words.", "Conceal meem with two-count ghunnah before ba.", 50),
      example("وَمَا هُم بِمُؤْمِنِينَ", "Al-Baqarah", 8, "م بِ", "ب", "الإخفاء الشفوي", "Ba begins the next word.", "Keep a concealed lip sound and two-count ghunnah.", 50),
    ],
    outcomes: ["Name ba as the single trigger.", "Conceal meem with two counts.", "Avoid a fully released meem."],
    activities: [
      activity("1 · Trigger", "Which letter causes oral concealment?", ["ب", "م", "ف"], "ب", "Correct.", "Ba is the only trigger."),
      activity("2 · Decision", "تَرْمِيهِم بِحِجَارَةٍ", ["Oral concealment", "Oral merging", "Oral manifestation"], "Oral concealment", "Correct.", "Ba follows مْ."),
      activity("3 · Timing", "How long is the ghunnah?", ["Two counts", "No ghunnah", "Four counts"], "Two counts", "Correct.", "Use two balanced counts."),
      activity("4 · Error", "A learner releases a full meem before ba.", ["Conceal the meem", "Make it clearer", "Remove ba"], "Conceal the meem", "Correct.", "The meem is concealed."),
    ],
  }),
  makeLesson({
    id: "tajweed-u04-l03-idgham-shafawi", number: "4.3", titleAr: "الإدغام الشفوي", titleEn: "Small merging of identical letters", pages: [51],
    definitionAr: "إذا جاء بعد الميم الساكنة ميم متحركة تُدغم الأولى في الثانية فتصيران ميمًا مشددة مع غنة حركتين.",
    definitionEn: "When a vowelled meem follows meem saakinah, merge them into one strengthened meem with two-count ghunnah.",
    formula: "مْ + م = مّ + غنة حركتين", letters: ["م"],
    groups: [{ name: { ar: "متماثلان صغير", en: "Small identical-letter merging" }, letters: ["مْ", "م"] }],
    examples: [
      example("هُوَ ٱلَّذِى خَلَقَ لَكُم مَّا فِى ٱلْأَرْضِ", "Al-Baqarah", 29, "م مَّ", "م", "الإدغام الشفوي", "Meem follows meem saakinah.", "Merge into strengthened meem with two-count ghunnah.", 51),
      example("وَلَهُم مَّا يَشْتَهُونَ", "An-Nahl", 57, "م مَّ", "م", "الإدغام الشفوي", "The two meems meet across words.", "Do not pronounce two separated meems.", 51),
    ],
    outcomes: ["Recognize meem as the trigger.", "Merge two meems.", "Maintain two-count ghunnah."],
    activities: [
      activity("1 · Trigger", "Which letter causes oral merging?", ["م", "ب", "و"], "م", "Correct.", "Meem is the trigger."),
      activity("2 · Decision", "لَكُم مَّا", ["Oral merging", "Oral concealment", "Oral manifestation"], "Oral merging", "Correct.", "Two meems meet."),
      activity("3 · Result", "What is the result?", ["Strengthened meem", "Hidden meem", "Clear separate meems"], "Strengthened meem", "Correct.", "The two meems become one strengthened meem."),
      activity("4 · Error", "A learner reads two separate meems.", ["Merge them", "Hide before ba", "Remove ghunnah"], "Merge them", "Correct.", "This is identical-letter merging."),
    ],
  }),
  makeLesson({
    id: "tajweed-u04-l04-izhar-shafawi", number: "4.4", titleAr: "الإظهار الشفوي", titleEn: "Oral manifestation and caution before fa and waw", pages: [52, 53],
    definitionAr: "تُظهر الميم الساكنة عند جميع الحروف عدا الباء والميم، مع عناية خاصة قبل الفاء والواو لقرب المخرج.",
    definitionEn: "Pronounce meem saakinah clearly before every letter except ba and meem, taking special care before fa and waw because of their nearby articulation.",
    formula: "مْ + غير ب وم = إظهار شفوي", letters: ["جميع الحروف عدا ب، م"],
    groups: [
      { name: { ar: "إظهار عام", en: "General clear reading" }, letters: ["باقي الحروف"] },
      { name: { ar: "موضعا الحذر", en: "Caution letters" }, letters: ["ف", "و"] },
    ],
    examples: [
      example("هُمْ فِيهَا خَـٰلِدُونَ", "Al-Baqarah", 39, "مْ فِ", "ف", "الإظهار الشفوي", "Fa follows meem; keep meem clear.", "Complete lip closure for meem, then move to fa.", 52),
      example("غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", "Al-Fatihah", 7, "مْ و", "و", "الإظهار الشفوي", "Waw follows meem; keep meem clear.", "Do not conceal or merge before waw.", 52),
      example("أَمْ كُنتُمْ شُهَدَآءَ", "Al-Baqarah", 133, "مْ كُ", "ك", "الإظهار الشفوي", "Kaf belongs to oral manifestation.", "Pronounce meem clearly, then kaf.", 52),
    ],
    outcomes: ["Identify the remaining-letter rule.", "Keep meem clear.", "Avoid concealment before fa and waw."],
    activities: [
      activity("1 · Decision", "هُمْ فِيهَا", ["Oral manifestation", "Oral concealment", "Oral merging"], "Oral manifestation", "Correct.", "Fa requires clear meem."),
      activity("1 · Decision", "عَلَيْهِمْ وَلَا", ["Oral manifestation", "Oral concealment", "Oral merging"], "Oral manifestation", "Correct.", "Waw requires clear meem."),
      activity("2 · Exclusion", "Which letters do not use oral manifestation?", ["ب and م", "ف and و", "ل and ر"], "ب and م", "Correct.", "Ba and meem have their own rules."),
      activity("3 · Error", "A learner hides meem before fa.", ["Keep meem clear", "Add more concealment", "Merge into fa"], "Keep meem clear", "Correct.", "Fa is only a caution letter."),
    ],
  }),
  makeLesson({
    id: "tajweed-u04-l05-review", number: "4.5", titleAr: "مراجعة أحكام الميم الساكنة", titleEn: "Mixed application review", pages: [49, 50, 51, 52, 53],
    definitionAr: "تُحدَّد أحكام الميم الساكنة بالحرف التالي: ب للإخفاء، م للإدغام، وما عداهما للإظهار.",
    definitionEn: "The next letter selects the rule: ba for concealment, meem for merging, and every other letter for clear manifestation.",
    formula: "مْ → افحص الحرف التالي → ب / م / الباقي", letters: ["ب", "م", "الباقي"],
    groups: [
      { name: { ar: "إخفاء", en: "Concealment" }, letters: ["ب"] },
      { name: { ar: "إدغام", en: "Merging" }, letters: ["م"] },
      { name: { ar: "إظهار", en: "Manifestation" }, letters: ["الباقي"] },
    ],
    examples: [
      example("تَرْمِيهِم بِحِجَارَةٍ", "Al-Fil", 4, "م بِ", "ب", "إخفاء شفوي", "Ba selects concealment.", "Conceal with two counts.", 50),
      example("خَلَقَ لَكُم مَّا", "Al-Baqarah", 29, "م مَّ", "م", "إدغام شفوي", "Meem selects merging.", "Merge with two counts.", 51),
      example("هُمْ فِيهَا", "Al-Baqarah", 39, "مْ فِ", "ف", "إظهار شفوي", "Fa belongs to manifestation.", "Keep meem clear.", 52),
    ],
    outcomes: ["Rebuild the three-rule map.", "Classify mixed examples.", "Perform all three outcomes."],
    activities: [
      activity("1 · Mixed", "مْ + ب", ["Concealment", "Merging", "Manifestation"], "Concealment", "Correct.", "Ba selects concealment."),
      activity("1 · Mixed", "مْ + م", ["Concealment", "Merging", "Manifestation"], "Merging", "Correct.", "Meem selects merging."),
      activity("1 · Mixed", "مْ + و", ["Concealment", "Merging", "Manifestation"], "Manifestation", "Correct.", "Waw is a caution letter, not concealment."),
      activity("2 · Performance", "Which rules use two-count ghunnah?", ["Concealment and merging", "Manifestation only", "All three identically"], "Concealment and merging", "Correct.", "Keep manifestation clear.", "Review the performance map."),
      activity("3 · Mastery", "What is the first step?", ["Find مْ", "Guess from color", "Look at the final letter"], "Find مْ", "Correct.", "Always locate the target first."),
    ],
    notes: ["Use this review as the mastery gate before moving to ghunnah ranks."],
  }),
];
