// A screen-share-first path for learners who may not read Arabic yet.
// Keep every lesson teachable from one screen: see, hear, imitate, read, check.

const units = {
  "starter-01": "Noorani foundation: letters and shapes",
  "starter-02": "Noorani reading skills",
  "starter-03": "Pronunciation and essential Tajweed",
};

const arabicTitles = {
  "alphabet-board":"الحروف العربية المفردة", "joined-letters":"الحروف المركبة", "muqattaat":"الحروف المقطعات",
  "short-vowels":"الحركات", "tanween":"التنوين", "word-spelling":"تهجي الكلمات", "madd":"المد",
  "small-madd":"حروف المد الصغيرة", "leen":"اللين", "madd-leen-applications":"تطبيقات على المد واللين",
  "sukoon":"السكون والجزم", "sukoon-applications":"تطبيقات على السكون", "shaddah":"الشدة",
  "shaddah-assessment":"تقويم الشدة", "shaddah-sukoon":"الشدة مع السكون",
  "double-shaddah":"الشدة المزدوجة", "shaddah-after-madd":"الشدة بعد المد",
};

const example = (arabic, target, cue, instruction, error) => ({
  arabic,
  targetText: target,
  previousLetter: target,
  triggerLetter: cue,
  teacherExplanation: instruction,
  readingInstruction: instruction,
  commonError: error,
  surah: { ar: "تدريب الحصة", en: "Live class practice" },
  ayah: "—",
  verificationStatus: "teacher-modelled practice",
});

const specs = [
  ["starter-01",1,"alphabet-board","ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي","The complete Arabic alphabet",["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","هـ","و","ي"],"Choose one letter to see its sound, articulation point, vowels, connected forms, and examples.","حرف واحد ← مخرج ← صوت ← حركات ← أشكال","Do not recite the alphabet as a song. Choose letters randomly and teach one sound at a time.","Memorising the alphabet order without recognising or pronouncing each letter."],
  ["starter-01",2,"joined-letters","بـت تـب ثـب نـب يـت","Joining letters",["بـت","تـب","ثـب","نـب","يـت"],"Recognise each letter after it joins another letter; its basic sound does not change.","ب + ت = بـت | ن + ب = نـب","Point to each letter separately, then sweep under the complete combination.","Treating a joined shape as a new letter."],
  ["starter-01",3,"muqattaat","الم كهيعص حم","Qur'anic opening letters",["الم","كهيعص","حم","يس"],"Read each opening letter by its name, not as a normal word.","اَلِفْ لَامْ مِيمْ","Point to one letter at a time and model its full name.","Blending the letters into a word."],
  ["starter-02",1,"short-vowels","بَ بِ بُ","Short vowels",["َ","ِ","ُ"],"A short vowel gives one quick sound: a, i, or u.","بَ = ba | بِ = bi | بُ = bu","Use one beat only and show the mouth movement.","Stretching a short vowel."],
  ["starter-02",2,"tanween","بً بٍ بٌ","Tanween",["ً","ٍ","ٌ"],"Tanween adds a light n sound at the end.","بً = ban | بٍ = bin | بٌ = bun","Contrast one vowel with its matching tanween.","Dropping or over-stretching the final n sound."],
  ["starter-02",3,"word-spelling","أَبَدًا خَلَقَ كُتُبٌ","Spelling words",["أَبَدًا","خَلَقَ","كُتُبٌ"],"Build the word one reading unit at a time, join each new unit, then read it directly.","أَ | بَ | دًا ← أَبَدًا","Move from tongue spelling to visual spelling and finally direct reading.","Reading the whole word from memory before decoding its units."],
  ["starter-02",4,"madd","بَا بِي بُو","Madd",["بَا","بِي","بُو"],"A matching madd letter lengthens the preceding vowel for two counts.","بَ + ا = بَا | بِ + ي = بِي | بُ + و = بُو","Use two equal finger taps for every natural madd.","Making the two-count madd uneven."],
  ["starter-02",5,"small-madd","هٰذَا بِهٖ لَهُۥ","Small madd letters",["هٰذَا","بِهٖ","لَهُۥ"],"Small alif, yā and wāw signs are pronounced as two-count madd letters.","ٰ = ا | ۦ = ي | ۥ = و","Point to the small letter and count exactly two beats.","Ignoring the small letter because it is not written full size."],
  ["starter-02",6,"leen","خَوْف بَيْت","Leen",["خَوْف","بَيْت"],"Wāw or yā sākinah after fatḥah makes a soft sound without natural madd in connected reading.","ـَوْ | ـَيْ","Keep the sound soft and do not force a two-count stretch while connecting.","Confusing leen with natural madd."],
  ["starter-02",7,"madd-leen-applications","ءَامَنَ جَاءَ خَوْف","Applications of madd and leen",["ءَامَنَ","جَاءَ","فِيهِ","خَوْف"],"Compare the learned lengths and keep examples of the same type equal.","هجّئ ← عدّ الحركات ← اقرأ وصلاً ووقفاً","Use tongue spelling, visual spelling, then direct reading.","Changing the count each time the same madd type appears."],
  ["starter-03",1,"sukoon","أَبْ إِبْ أُبْ","Sukoon / jazm",["أَبْ","إِبْ","أُبْ","يَخْ"],"A sākin letter has no vowel and forms one unit with the vowelled letter before it.","أَ + بْ = أَبْ","Use sukoon to correct the articulation point without adding a vowel.","Adding a vowel after the sākin letter."],
  ["starter-03",2,"sukoon-applications","يَخْلُقْ نَعْبُدْ مِنْ","Applications of sukoon",["يَخْلُقْ","نَعْبُدْ","مِنْ بَعْدِ"],"Combine single and double reading units, then practise correct stopping and connected reading.","يَخْ | لُ | قْ ← يَخْلُقْ","Introduce an applied rule only when it appears in a readable word.","Stopping between units after they have been joined."],
  ["starter-03",3,"shaddah","أَبَّ إِنَّ ثُمَّ","Shaddah",["أَبَّ","إِنَّ","ثُمَّ"],"A mushaddad letter is two letters in performance: the first sākin and the second vowelled.","أَبْ + بَ = أَبَّ","Join the two parts without a breath or pause.","Reading shaddah as one light letter."],
  ["starter-03",4,"shaddah-assessment","رَبَّ حَقٌّ","Shaddah assessment",["رَبَّ","حَقٌّ","إِيَّاكَ"],"Check that the learner can decode and hold shaddah before mixing it with new patterns.","فكّ الشدة ← اجمع ← اقرأ مباشرة","Use unseen examples and correct the consonant hold, not the vowel length.","Stretching the vowel instead of holding the consonant."],
  ["starter-03",5,"shaddah-sukoon","عَبْدٌ ثُمَّ","Shaddah with sukoon",["عَبْدٌ","ثُمَّ","مِنْ رَبِّهِمْ"],"Read adjacent sākin and mushaddad units without dropping or inserting a sound.","وحدة ساكنة + وحدة مشددة ← وصل","Slow the two units, then reconnect them naturally.","Inserting a vowel between the units."],
  ["starter-03",6,"double-shaddah","إِنَّ رَبَّكَ","Double shaddah",["إِنَّ رَبَّكَ","ثُمَّ إِنَّ"],"Maintain each shaddah when two doubled units occur close together.","فكّ الأولى ← فكّ الثانية ← صِل","Keep one steady breath and listen for both doubled consonants.","Dropping the second shaddah."],
  ["starter-03",7,"shaddah-after-madd","ضَالِّينَ حَاجُّوكَ","Shaddah after madd",["الضَّالِّينَ","حَاجُّوكَ","الصَّافَّاتِ"],"Hold the required madd, then enter the mushaddad letter without breaking the word.","مدّ مضبوط ← حرف مشدد ← إكمال الكلمة","Count the madd first, then join into the shaddah and read directly.","Shortening the madd or separating it from the shaddah."],
];

function makeLesson([unitId, n, id, ar, en, letters, definition, formula, instruction, error], sequence) {
  const sample = example(formula.split("|")[0].trim(), letters[0], letters[1] || letters[0], instruction, error);
  return {
    id: `practical-${id}`,
    unitId,
    lessonNumber: String(sequence),
    title: { ar: arabicTitles[id] || ar, en },
    level: n <= 4 && unitId === "starter-01" ? "Absolute beginner" : "Beginner",
    estimatedMinutes: 30,
    prerequisites: n === 1 && unitId === "starter-01" ? ["No Arabic knowledge required."] : ["Complete the previous practical lesson."],
    learningOutcomes: ["Recognise the target on screen.", "Imitate the teacher accurately.", "Use the target in a short reading task."],
    definition: { linguistic: { ar, en: definition }, technical: { ar, en: definition }, studentFriendly: { ar, en: definition }, memoryFormula: formula },
    keyTerms: letters.slice(0, 5).map((letter) => ({ ar: letter, transliteration: "", en: "lesson target" })),
    conceptExplanation: [{ audience: "student", text: definition }, { audience: "teacher", text: instruction }],
    visualExplanation: [{ type: "screen-share-card", display: formula, teacherUse: instruction }],
    ruleSummary: { condition: "What is highlighted on screen", result: definition, location: units[unitId], letters },
    letterGroups: [{ name: { ar: "هدف الحصة", en: "Today's targets" }, letters }],
    quranExamples: [sample, example(ar, letters.at(-1), letters[0], instruction, error)],
    guidedPractice: [{ sequence: 1, teacherAction: "Show and model.", studentAction: "Point and imitate.", feedback: "Correct one sound only." }, { sequence: 2, teacherAction: "Shuffle or use a new word.", studentAction: "Recognise and read.", feedback: "Repeat until stable." }],
    oralPractice: [{ cycle: ["see", "hear", "say", "read", "check"], examplesRequired: 2, teacherObservation: ["recognition", "mouth position", "accurate sound", "self-correction"] }],
    interactiveActivities: [{ stage: "Check", type: "live-teacher-check", instruction: { en: "Point to a target chosen by the teacher, name it, and read it." }, prompt: "Can the learner recognise and produce it without help?", items: ["Yes", "Not yet"], acceptedAnswers: ["Yes"], feedbackCorrect: "Move on.", feedbackIncorrect: "Model once, then repeat." }],
    commonMistakes: [error],
    correctionTechniques: ["Model only the target.", "Use a close-up of the mouth.", "Contrast the correct and common sound.", "Let the learner try again immediately."],
    liveClassFlow: [{ minutes: 5, phase: "See", display: "One large target" }, { minutes: 5, phase: "Hear", display: "Teacher model" }, { minutes: 8, phase: "Say", display: "Isolated practice" }, { minutes: 8, phase: "Read", display: "Short combinations" }, { minutes: 4, phase: "Check", display: "Unseen card" }],
    homework: ["Practise the lesson targets for five minutes with the same see-hear-say-read routine."],
    source: { book: "Practical Qur'an Reading Path", printedPages: [], chapter: units[unitId], verification: "Live pronunciation is checked by the teacher." },
    verificationStatus: "teacher-led practical path",
  };
}

export const practicalTajweedLessons = specs.map((spec, index) => makeLesson(spec, index + 1));

export const practicalTajweedOutline = {
  id: "practical-quran-reading",
  title: { ar: "مسار القراءة والتجويد العملي", en: "Practical Qur'an Reading & Tajweed" },
  level: "Practical Path",
  levelOrder: 1,
  audience: "Non-Arabic-speaking absolute beginners in teacher-led screen-share classes",
  delivery: "See → hear → say → read → check",
  units: [
    { id: "starter-01", title: { ar: "القاعدة النورانية: الحروف والأشكال", en: "Noorani foundation: letters and shapes" }, lessons: specs.filter(x => x[0] === "starter-01").map(x => x[4]) },
    { id: "starter-02", title: { ar: "القاعدة النورانية: بناء القراءة", en: "Noorani reading skills" }, lessons: specs.filter(x => x[0] === "starter-02").map(x => x[4]) },
    { id: "starter-03", title: { ar: "النطق والتجويد التطبيقي", en: "Pronunciation and applied Tajweed" }, lessons: specs.filter(x => x[0] === "starter-03").map(x => x[4]) },
  ],
};
