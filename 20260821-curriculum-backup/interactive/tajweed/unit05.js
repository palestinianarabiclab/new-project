const src = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part One",
  pdf: "en_Tajweed_Rules_of_the_Quran_Part_01.pdf",
  pdfPages: pages,
  printedPages: pages,
  chapter: "Ghunnah",
  section,
  verification: "book source checked; live teacher listening required",
});

const ex = (arabic, label, target, rule, note, instruction, page) => ({
  arabic,
  surah: { ar: "مثال تدريبي", en: label },
  ayah: "—",
  targetText: target,
  rule,
  triggerLetter: target,
  previousLetter: target,
  teacherExplanation: note,
  readingInstruction: instruction,
  commonError: "Using the wrong duration or allowing the mouth to replace the nasal resonance.",
  wordBoundary: "instructional-boundary",
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const q = (stage, prompt, items, answer, right, wrong) => ({
  stage,
  type: "listening-and-concept",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: right,
  feedbackIncorrect: wrong,
});

function lesson({ id, number, ar, en, pages, technicalAr, technicalEn, formula, groups, examples, activities, outcomes, minutes = 45 }) {
  return {
    id, unitId: "unit-05", lessonNumber: number, title: { ar, en }, source: src(pages, en),
    contentOrigin: "source-and-instructional-design", level: "Foundation", estimatedMinutes: minutes,
    prerequisites: ["Recognize noon and meem.", "Recognize shaddah and sukoon.", "Have studied the noon-saakinah and meem-saakinah rules."],
    learningOutcomes: outcomes,
    definition: {
      linguistic: { ar: "الغنة صوت له رنين يخرج من الخيشوم.", en: "Ghunnah is a resonant nasal sound produced through the nasal passage." },
      technical: { ar: technicalAr, en: technicalEn },
      studentFriendly: { ar: technicalAr, en: technicalEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "الغنة", transliteration: "al-ghunnah", en: "nasal resonance" },
      { ar: "الخيشوم", transliteration: "al-khayshum", en: "the nasal passage" },
      { ar: "حركتان", transliteration: "harakatan", en: "two measured counts when the rule requires it" },
      { ar: "مرتبة", transliteration: "martabah", en: "a rank or degree" },
    ],
    teacherPreparation: ["Prepare a two-count hand signal.", "Model correct and exaggerated nasalization.", "Use live listening; do not grade sound from text alone.", "Keep the oral and nasal roles distinct."],
    openingReview: [
      { minutes: 2, teacherPrompt: "Ask where ghunnah resonates." },
      { minutes: 2, teacherPrompt: "Review noon and meem with shaddah." },
    ],
    conceptExplanation: [
      { audience: "student", text: technicalEn },
      { audience: "teacher", text: "Distinguish inherent nasal quality from a rule-based two-count ghunnah." },
    ],
    lessonPath: [
      { step: 1, title: "Listen", text: "Hear nasal resonance." },
      { step: 2, title: "Locate", text: "Connect it to the nasal passage." },
      { step: 3, title: "Measure", text: "Use the required duration." },
      { step: 4, title: "Compare", text: "Contrast ranks and errors." },
      { step: 5, title: "Recite", text: "Receive teacher feedback." },
    ],
    visualExplanation: [{ type: "rule-equation", display: formula, teacherUse: "Use as a memory aid after listening." }],
    ruleSummary: {
      condition: "A noon/meem form or Tajweed rule determines the strength and duration heard.",
      result: technicalEn,
      location: "The resonance exits through the nasal passage while the oral articulation prepares the letter.",
      letters: ["ن", "م"],
    },
    letterGroups: groups,
    quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: "Model one sound.", studentAction: "Identify its rank or timing.", feedback: "Ask what was heard, not only what was seen." },
      { sequence: 2, teacherAction: "Model and count.", studentAction: "Repeat, then recite independently.", feedback: "Correct duration and resonance separately." },
    ],
    oralPractice: [{ cycle: ["listen", "identify", "count", "repeat", "recite"], examplesRequired: examples.length, teacherObservation: ["nasal resonance", "correct timing", "stable oral articulation", "no exaggeration"] }],
    interactiveActivities: activities,
    commonMistakes: ["Producing every ghunnah with the same strength.", "Holding a nasal sound where no timed ghunnah is required.", "Blocking the nose or replacing resonance with a vowel.", "Counting too quickly or too slowly."],
    correctionTechniques: ["Contrast two examples.", "Use two even finger taps.", "Return to isolated noon/meem.", "Teacher models before learner repeats."],
    knowledgeChecks: [
      { type: "listening", prompt: "Identify teacher-modeled samples.", success: "At least 8 of 10 are identified." },
      { type: "recitation", prompt: "Recite varied samples.", success: "Teacher approves timing and quality twice." },
    ],
    teacherQuestions: ["Where does the resonance exit?", "Is a timed ghunnah required?", "What rank is this?", "Is the duration balanced?"],
    studentTasks: ["Sort examples by rank.", "Use a two-count gesture.", "Explain one common error.", "Recite to the teacher."],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Noon and meem" },
      { minutes: 8, phase: "Definition", display: "Nasal passage" },
      { minutes: 10, phase: "Teacher model", display: "Contrasting samples" },
      { minutes: 10, phase: "Guided listening", display: "Hidden labels" },
      { minutes: 8, phase: "Recitation", display: "Teacher observation" },
      { minutes: 4, phase: "Exit check", display: "Identify and recite" },
    ],
    independentPractice: ["Use only teacher-approved examples and timing cues."],
    homework: ["Prepare a short set for live teacher listening; do not self-certify pronunciation."],
    exitTicket: ["State the source of ghunnah.", "Identify a rank.", "Recite one teacher-selected sample."],
    masteryCriteria: ["Explains nasal articulation.", "Distinguishes ranks.", "Uses correct timing.", "Passes two teacher-observed attempts."],
    teacherNotes: ["Visual recognition cannot prove correct ghunnah.", "Avoid encouraging forceful or theatrical nasalization."],
    sourceNotes: [`The lesson follows pages ${pages.join(", ")}.`, "Listening activities are instructional-design additions."],
    verificationStatus: "source-aligned; qualified teacher listening required",
  };
}

export const unit05Lessons = [
  lesson({
    id: "tajweed-u05-l01-definition", number: "5.1", ar: "تعريف الغنة ومخرجها", en: "Ghunnah definition and nasal articulation", pages: [55],
    technicalAr: "الغنة صفة لازمة للنون والميم، يخرج صوتها من الخيشوم، ويختلف ظهورها وقوتها بحسب حالة الحرف والحكم.",
    technicalEn: "Ghunnah is an inherent characteristic of noon and meem whose resonance exits through the nasal passage; its audible strength and timing vary by form and rule.",
    formula: "ن / م → رنين الغنة من الخيشوم",
    groups: [
      { name: { ar: "حرفا الغنة", en: "Ghunnah letters" }, letters: ["ن", "م"] },
      { name: { ar: "مخرج الغنة", en: "Resonance outlet" }, letters: ["الخيشوم"] },
    ],
    examples: [
      ex("إِنَّ", "Noon with shaddah", "نَّ", "غنة ظاهرة", "Shaddah makes the ghunnah strongly audible.", "Hold a balanced two-count ghunnah.", 55),
      ex("ثُمَّ", "Meem with shaddah", "مَّ", "غنة ظاهرة", "Meem with shaddah carries strong ghunnah.", "Close the lips for meem while resonance exits nasally.", 55),
      ex("مِنْ", "Noon saakinah", "نْ", "غنة أصلية", "Noon retains its inherent nasal quality without automatically adding a long hold.", "Follow the actual next-letter rule.", 55),
    ],
    outcomes: ["Define ghunnah.", "Name noon and meem.", "Locate nasal resonance.", "Avoid adding a timed ghunnah everywhere."],
    activities: [
      q("1 · Definition", "Where does ghunnah resonate?", ["Nasal passage", "Lips only", "Tongue only"], "Nasal passage", "Correct.", "Ghunnah exits through the nasal passage."),
      q("1 · Definition", "Which letters inherently carry ghunnah?", ["ن and م", "ل and ر", "ق and ك"], "ن and م", "Correct.", "Noon and meem are the ghunnah letters."),
      q("2 · Distinction", "Does every noon require a two-count hold?", ["No", "Yes"], "No", "Correct. Apply the specific rule.", "Timed ghunnah depends on the form and rule."),
      q("3 · Recognition", "Which form shows strong ghunnah?", ["نَّ", "لْ", "رَ"], "نَّ", "Correct.", "Shaddah on noon is a clear clue."),
      q("4 · Error", "A learner turns ghunnah into an added vowel.", ["Keep nasal resonance without a vowel", "Add a longer vowel", "Remove noon"], "Keep nasal resonance without a vowel", "Correct.", "Ghunnah is resonance, not a vowel."),
    ],
  }),
  lesson({
    id: "tajweed-u05-l02-ranks", number: "5.2", ar: "مراتب الغنة الأربع", en: "Four ranks of ghunnah", pages: [56],
    technicalAr: "تتفاوت الغنة في الظهور: تكون في أعلى مراتبها مع النون والميم المشددتين، ثم في الإدغام بغنة، ثم في الإخفاء والإقلاب، وتكون أخف في النون والميم المظهرتين أو المتحركتين دون غنة ممدودة.",
    technicalEn: "Ghunnah is heard in ranked degrees: strongest with strengthened noon/meem, then in idgham with ghunnah, then in ikhfa'/iqlab, and lightest as inherent quality in clearly pronounced or vowelled noon/meem without an added timed hold.",
    formula: "مشدد → إدغام بغنة → إخفاء/إقلاب → مظهر أو متحرك",
    groups: [
      { name: { ar: "المرتبة الأولى", en: "1 · Strongest" }, letters: ["نّ", "مّ"] },
      { name: { ar: "المرتبة الثانية", en: "2 · Idgham with ghunnah" }, letters: ["ي", "ن", "م", "و"] },
      { name: { ar: "المرتبة الثالثة", en: "3 · Ikhfa' and iqlab" }, letters: ["إخفاء", "إقلاب"] },
      { name: { ar: "المرتبة الرابعة", en: "4 · Light inherent quality" }, letters: ["مظهر", "متحرك"] },
    ],
    examples: [
      ex("إِنَّ", "Rank 1", "نَّ", "المرتبة الأولى", "Strengthened noon is at the strongest rank.", "Hold the required balanced ghunnah.", 56),
      ex("فَمَن يَعْمَلْ", "Rank 2", "ن يَ", "المرتبة الثانية", "Idgham with ya retains ghunnah.", "Merge and maintain two counts.", 56),
      ex("مِن شَرِّ", "Rank 3", "ن شَ", "المرتبة الثالثة", "Ikhfa' conceals noon with ghunnah.", "Conceal and prepare for shin.", 56),
      ex("مِنْ عَلَقٍ", "Rank 4", "نْ عَ", "المرتبة الرابعة", "Izhar keeps noon clear without adding a prolonged ghunnah.", "Complete noon clearly, then ayn.", 56),
    ],
    outcomes: ["Name the four ranks.", "Sort familiar examples.", "Distinguish timed from inherent quality.", "Recite contrasting ranks."],
    activities: [
      q("1 · Rank map", "Which is the strongest rank?", ["نّ and مّ", "Clear noon", "Vowelled meem"], "نّ and مّ", "Correct.", "Strengthened noon and meem are strongest."),
      q("1 · Rank map", "Where does idgham with ghunnah belong?", ["Second rank", "Fourth rank", "No rank"], "Second rank", "Correct.", "It follows the strengthened rank."),
      q("2 · Classification", "Classify مِن شَرِّ.", ["Ikhfa'/iqlab rank", "Strengthened rank", "Clear-light rank"], "Ikhfa'/iqlab rank", "Correct.", "This is ikhfa'."),
      q("2 · Classification", "Classify إِنَّ.", ["Strengthened rank", "Idgham rank", "Clear-light rank"], "Strengthened rank", "Correct.", "Noon carries shaddah."),
      q("3 · Concept", "Does light rank mean no ghunnah characteristic exists?", ["No", "Yes"], "No", "Correct. The inherent quality remains without an added timed hold.", "Separate inherent quality from prolonged performance."),
      q("4 · Error", "A learner gives izhar the strongest timed ghunnah.", ["Keep noon clear without added hold", "Add more ghunnah", "Merge noon"], "Keep noon clear without added hold", "Correct.", "Match performance to the rank."),
    ],
  }),
  lesson({
    id: "tajweed-u05-l03-listening-review", number: "5.3", ar: "مراجعة الغنة بالسماع والتلاوة", en: "Listening and teacher-observed recitation review", pages: [55, 56, 57], minutes: 50,
    technicalAr: "إتقان الغنة لا يثبت بالاختيار النظري وحده؛ بل يحتاج إلى سماع نموذج صحيح وتلاوة يلاحظها المعلم من حيث المخرج والمرتبة والزمن.",
    technicalEn: "Ghunnah mastery cannot be established by a visual quiz alone; it requires a correct model and teacher-observed recitation of resonance, rank, and timing.",
    formula: "اسمع → حدّد المرتبة → قلّد → اقرأ → صحّح",
    groups: [
      { name: { ar: "معرفة", en: "Knowledge" }, letters: ["تعريف", "مرتبة", "زمن"] },
      { name: { ar: "أداء", en: "Performance" }, letters: ["مخرج", "رنين", "توازن"] },
    ],
    examples: [
      ex("إِنَّ", "Strongest sample", "نَّ", "مشدد", "Teacher models a strengthened noon.", "Listen, count, and repeat.", 57),
      ex("مِنۢ بَعْدِ", "Iqlab sample", "نۢ بَ", "إقلاب", "Teacher checks hidden mim quality and ghunnah.", "Change, conceal, count, continue.", 57),
      ex("مِن شَرِّ", "Ikhfa' sample", "ن شَ", "إخفاء", "Teacher checks concealment and next-letter preparation.", "Stay between clarity and merging.", 57),
      ex("مِنْ عَلَقٍ", "Izhar contrast", "نْ عَ", "إظهار", "Teacher checks that no extra timed ghunnah is added.", "Keep noon clear.", 57),
    ],
    outcomes: ["Identify teacher-modeled ranks.", "Self-correct obvious timing errors.", "Pass teacher-observed mixed recitation.", "Separate knowledge and performance scores."],
    activities: [
      q("1 · Listening method", "What comes first?", ["Listen to a correct model", "Guess from spelling", "Record a final score"], "Listen to a correct model", "Correct.", "Aural modeling comes first."),
      q("2 · Assessment", "Can a multiple-choice quiz prove correct ghunnah?", ["No", "Yes"], "No", "Correct.", "Teacher listening is required."),
      q("2 · Assessment", "What should be scored separately?", ["Knowledge and recitation", "Color and font", "Page and title"], "Knowledge and recitation", "Correct.", "They are different mastery targets."),
      q("3 · Diagnosis", "The two counts are uneven.", ["Repeat with a steady gesture", "Ignore timing", "Add a vowel"], "Repeat with a steady gesture", "Correct.", "Use balanced counts."),
      q("3 · Diagnosis", "The learner nasalizes every noon equally.", ["Return to the rank map", "Use strongest ghunnah everywhere", "Remove all ghunnah"], "Return to the rank map", "Correct.", "The audible degree depends on form and rule."),
      q("4 · Mastery", "What confirms recitation mastery?", ["Two teacher-approved attempts", "One visual answer", "Self-rating only"], "Two teacher-approved attempts", "Correct.", "Teacher observation confirms performance."),
    ],
  }),
];
