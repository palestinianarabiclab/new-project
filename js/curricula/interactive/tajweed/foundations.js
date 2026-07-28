const unitNames = {
  "unit-00": "Qur'anic Markings and Orientation",
  "unit-01": "Introduction to Tajweed",
  "unit-02": "Articulation Points",
};

const mkExample = (arabic, label, target, explanation, instruction, page) => ({
  arabic,
  surah: { ar: "مثال تعليمي", en: label },
  ayah: "—",
  targetText: target,
  triggerLetter: target,
  previousLetter: "موضع الدرس",
  rule: label,
  teacherExplanation: explanation,
  readingInstruction: instruction,
  commonError: "Applying a neighboring rule or changing the intended sound.",
  wordBoundary: "instructional-context",
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const check = (stage, prompt, items, answer, right = "Correct.", wrong = "Review the lesson rule.") => ({
  stage,
  type: "foundation-decision",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: right,
  feedbackIncorrect: wrong,
});

function build(spec) {
  const {
    unit, n, id, ar, en, pages, definitionAr, definitionEn, formula, condition,
    letters = [], examples = [], outcomes = [], teacherNote = "", extra = [],
  } = spec;
  return {
    id,
    unitId: unit,
    lessonNumber: `${Number(unit.slice(-2))}.${n}`,
    title: { ar, en },
    source: {
      book: "Tajweed Rules of the Qur'an — Part One",
      pdf: "en_Tajweed_Rules_of_the_Quran_Part_01.pdf",
      pdfPages: pages,
      printedPages: pages,
      chapter: unitNames[unit],
      section: en,
      verification: "book source aligned; Arabic and recitation require qualified-teacher review",
    },
    contentOrigin: "source-and-instructional-design",
    level: "Foundation",
    estimatedMinutes: en.includes("review") ? 55 : 40,
    prerequisites: ["Recognize Arabic letters and basic vowel marks.", "Follow a teacher model.", "Use the Hafs course convention consistently."],
    learningOutcomes: outcomes.length ? outcomes : [
      `Explain ${en.toLowerCase()}.`,
      "Recognize the rule in a written sample.",
      "Apply the taught decision sequence.",
      "Demonstrate the skill under teacher observation.",
    ],
    definition: {
      linguistic: { ar: definitionAr, en: definitionEn },
      technical: { ar: definitionAr, en: definitionEn },
      studentFriendly: { ar: definitionAr, en: definitionEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: "القاعدة", transliteration: "al-qa'idah", en: "the rule" },
      { ar: "التطبيق", transliteration: "at-tatbiq", en: "application" },
      { ar: "الموضع", transliteration: "al-mawdi'", en: condition },
    ],
    teacherPreparation: [
      "Display one correct and one contrasting sample.",
      "Mark the exact visual or sound trigger.",
      "Model slowly before normal-speed recitation.",
      "Prepare a brief exit check.",
    ],
    openingReview: [
      { minutes: 2, teacherPrompt: "What do you notice in the marked location?" },
      { minutes: 2, teacherPrompt: "Which earlier skill helps here?" },
    ],
    conceptExplanation: [
      { audience: "student", text: definitionEn },
      { audience: "teacher", text: teacherNote || `Require identification, explanation, and application of ${condition}.` },
    ],
    lessonPath: [
      { step: 1, title: "Observe", text: "Locate the visual or sound trigger." },
      { step: 2, title: "Name", text: "State the term or articulation area." },
      { step: 3, title: "Explain", text: "Describe what changes and what remains unchanged." },
      { step: 4, title: "Apply", text: "Read or demonstrate under teacher guidance." },
      { step: 5, title: "Check", text: "Contrast with the nearest common error." },
    ],
    visualExplanation: [{ type: "rule-equation", display: formula, teacherUse: "Reveal each part of the decision in order." }],
    ruleSummary: { condition, result: definitionEn, location: unitNames[unit], letters },
    letterGroups: [
      { name: { ar: "مواضع الدرس", en: "Lesson targets" }, letters: letters.length ? letters : ["✓"] },
    ],
    quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: "Reveal and model one target.", studentAction: "Identify and explain.", feedback: "Correct the decision before performance." },
      { sequence: 2, teacherAction: "Present a contrast.", studentAction: "Apply and self-correct.", feedback: "Approve only accurate recognition and sound." },
    ],
    oralPractice: [{
      cycle: ["observe", "name", "explain", "apply", "check"],
      examplesRequired: examples.length,
      teacherObservation: ["correct trigger", "correct explanation", "accurate sound or action", "self-correction"],
    }],
    interactiveActivities: [
      check("1 · Definition", "Which statement matches this lesson?", [definitionEn, "Every mark is ignored.", "Recitation is based on guessing."], definitionEn),
      check("2 · Trigger", "What should the learner identify first?", [condition, "The page color", "The English word length"], condition),
      check("3 · Method", "What follows recognition?", ["Explain and apply under teacher guidance", "Read faster immediately", "Skip the contrast"], "Explain and apply under teacher guidance"),
      check("4 · Evidence", "What confirms recitation mastery?", ["Teacher-observed correct performance", "A visual quiz alone", "Memorizing the title"], "Teacher-observed correct performance"),
      check("5 · Error", "What is the safest correction sequence?", ["Stop, identify, model, repeat", "Guess, speed up, continue", "Add a vowel"], "Stop, identify, model, repeat"),
      ...extra,
    ],
    commonMistakes: [
      "Memorizing the label without recognizing the trigger.",
      "Applying a rule outside its context.",
      "Relying on visual recognition without correct sound.",
      "Skipping teacher correction.",
    ],
    correctionTechniques: [
      "Highlight only the trigger.",
      "Use a correct/incorrect contrast.",
      "Return to isolated production before context.",
      "Require the learner to explain the correction.",
    ],
    knowledgeChecks: [
      { type: "recognition", prompt: "Identify eight mixed samples.", success: "At least seven correct with explanation." },
      { type: "performance", prompt: "Apply the lesson in context.", success: "Two teacher-approved attempts." },
    ],
    teacherQuestions: ["What is the trigger?", "What is its name?", "What should the reader do?", "What error must be avoided?"],
    studentTasks: ["Highlight the target.", "Explain the decision.", "Apply and self-check."],
    liveClassFlow: [
      { minutes: 5, phase: "Review", display: "Prior skill" },
      { minutes: 8, phase: "Definition", display: formula },
      { minutes: 10, phase: "Model", display: "Correct / contrast" },
      { minutes: 10, phase: "Practice", display: "Guided examples" },
      { minutes: 5, phase: "Exit", display: "Recognize and apply" },
    ],
    independentPractice: ["Prepare five teacher-approved examples with written explanations."],
    homework: ["Review the definition and demonstrate three examples."],
    exitTicket: ["Name the target.", "State the rule.", "Apply it correctly."],
    masteryCriteria: ["Recognizes the target.", "Explains the rule.", "Applies it accurately.", "Passes two observed attempts."],
    teacherNotes: [teacherNote || "Knowledge and performance should be assessed separately.", "Qualified-teacher listening is required for sound judgments."],
    sourceNotes: [`Uses pages ${pages.join(", ")}.`, "Practice structure is an instructional-design addition."],
    verificationStatus: "source-aligned; qualified-teacher review required",
  };
}

const specs = [
  {
    unit:"unit-00",n:1,id:"tajweed-u00-l01-scope",ar:"نطاق الدورة والرواية وطريقة الدراسة",en:"Course scope, reading tradition, and how to study",pages:[9,10,11],
    definitionAr:"تدرس الدورة أحكام الجزء الأول برواية حفص عن عاصم من طريق الشاطبية، وتجمع بين المعرفة والتلقي والتطبيق.",definitionEn:"The course teaches Part One using Hafs 'an 'Asim through Ash-Shatibiyyah and combines rule knowledge with teacher-modelled recitation.",formula:"معرفة + نموذج صحيح + تطبيق + تصحيح = تعلم التجويد",condition:"The course's reading tradition and teacher-led study method",letters:["حفص","عاصم","الشاطبية"],
    examples:[mkExample("حفص عن عاصم","Reading tradition","حفص","منهج القراءة","The course follows one transmitted reading path.","Keep the course conventions consistent.",9),mkExample("اقرأ ثم استمع ثم صحّح","Study cycle","استمع","طريقة الدراسة","Tajweed is learned through guided sound.","Repeat only after a correct model.",10)],
  },
  {
    unit:"unit-00",n:2,id:"tajweed-u00-l02-zero-marks",ar:"علامة الصفر والصفر المستطيل القائم",en:"Zero marks and standing oblong zero",pages:[15],
    definitionAr:"تدل علامة الصفر المستدير على حرف لا ينطق وصلاً ولا وقفًا، ويدل الصفر المستطيل القائم على ألف لا تنطق وصلاً وتثبت وقفًا في مواضعها.",definitionEn:"The round zero marks a letter omitted in connection and stopping; the standing oblong zero marks an alif omitted in connection but retained when stopping in its taught locations.",formula:"○ = حذف وصلاً ووقفًا | 0 قائم = حذف وصلاً وإثبات وقفًا",condition:"The shape of the small zero and whether reading connects or stops",letters:["○","۟"],
    examples:[mkExample("أُوْلَٰئِكَ","Round-zero orientation","وْ","صفر مستدير","A marked written letter may be omitted in recitation.","Follow the mushaf mark, not spelling alone.",15),mkExample("أَنَا۠","Standing oblong zero","ا۠","صفر مستطيل","The alif treatment changes with connection and stopping.","Omit in connection and retain at the taught stop.",15)],
  },
  {
    unit:"unit-00",n:3,id:"tajweed-u00-l03-sukoon-small-letters",ar:"السكون والحروف القرآنية الصغيرة",en:"Sukoon and small Qur'anic letters",pages:[16],
    definitionAr:"السكون يدل على خلو الحرف من الحركة، والحروف الصغيرة في رسم المصحف قد تدل على أصوات منطوقة غير مكتوبة بالحجم المعتاد.",definitionEn:"Sukoon marks the absence of a short vowel, while small Qur'anic letters can indicate sounds pronounced although not written at normal size.",formula:"ْ = بلا حركة | حرف صغير = صوت معتبر في القراءة",condition:"Sukoon and superscript or small Qur'anic letters",letters:["ْ","ٰ","ۥ","ۦ"],
    examples:[mkExample("ٱلْحَمْدُ","Sukoon","لْ","سكون","Lam has no short vowel.","Move directly to the following letter.",16),mkExample("هَٰذَا","Small alif","ٰ","ألف خنجرية","The small alif represents a pronounced long vowel.","Read the indicated alif sound.",16)],
  },
  {
    unit:"unit-01",n:1,id:"tajweed-u01-l01-manners",ar:"آداب التلاوة الباطنة والظاهرة",en:"Internal and external manners",pages:[17],
    definitionAr:"الآداب الباطنة تشمل الإخلاص والتدبر، والظاهرة تشمل الطهارة وحسن الهيئة واحترام كلام الله مع أداء القراءة بأدب.",definitionEn:"Internal manners include sincerity and reflection; external manners include respectful preparation, conduct, and attentive recitation.",formula:"إخلاص وتدبر + احترام واستعداد = أدب التلاوة",condition:"The learner's intention, attention, preparation, and conduct",letters:["إخلاص","تدبر","احترام"],
    examples:[mkExample("النية لله","Internal manner","النية","آداب باطنة","Sincere intention directs the act of recitation.","Renew intention before reading.",17),mkExample("الإنصات والتدبر","External practice","الإنصات","آداب التلاوة","Attention prevents careless recitation.","Prepare and listen respectfully.",17)],
  },
  {
    unit:"unit-01",n:2,id:"tajweed-u01-l02-sajdah",ar:"سجدات التلاوة",en:"Prostrations of recitation",pages:[18],
    definitionAr:"سجدة التلاوة سجود مشروع عند قراءة أو سماع مواضع السجود المعلمة في المصحف، ويُرجع في حكمها وتفاصيلها إلى المعلم والفقه المعتمد.",definitionEn:"A recitation prostration is associated with marked sajdah passages; its legal details and performance should follow the learner's qualified teacher and accepted jurisprudential guidance.",formula:"علامة سجدة + تلاوة/سماع → تطبيق بإرشاد فقهي موثوق",condition:"A marked verse of prostration and the applicable jurisprudential guidance",letters:["۩"],
    examples:[mkExample("۩","Sajdah mark","۩","سجدة تلاوة","The mushaf symbol identifies a sajdah location.","Pause instruction and follow qualified guidance.",18)],
  },
  {
    unit:"unit-01",n:3,id:"tajweed-u01-l03-istiadha-basmalah",ar:"الاستعاذة والبسملة",en:"Isti'adhah and basmalah",pages:[19],
    definitionAr:"الاستعاذة طلب الحماية بالله من الشيطان قبل القراءة، والبسملة قول بسم الله الرحمن الرحيم في مواضع البدء المقررة.",definitionEn:"Isti'adhah seeks Allah's protection before recitation, while basmalah is recited at the prescribed beginnings according to the course conventions.",formula:"بدء القراءة → استعاذة → بسملة بحسب الموضع",condition:"Beginning recitation and whether the chosen starting point calls for basmalah",letters:["أعوذ","بسم الله"],
    examples:[mkExample("أَعُوذُ بِٱللَّهِ مِنَ ٱلشَّيْطَانِ ٱلرَّجِيمِ","Isti'adhah","أَعُوذُ","استعاذة","It precedes the recitation start.","Pronounce clearly without rushing.",19),mkExample("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ","Basmalah","بِسْمِ","بسملة","It marks the prescribed beginning.","Use the selected connection form consistently.",19)],
  },
  {
    unit:"unit-01",n:4,id:"tajweed-u01-l04-four-forms",ar:"بدء السورة: أوجه الوصل الأربعة",en:"Starting a surah: four connection forms",pages:[20],
    definitionAr:"عند بدء السورة بعد الاستعاذة والبسملة أربعة أوجه: قطع الجميع، قطع الأول ووصل الثاني بالثالث، وصل الأول بالثاني وقطع الثالث، أو وصل الجميع.",definitionEn:"At a surah beginning, isti'adhah, basmalah, and the first verse may be arranged in four taught forms: separating all, separating then connecting, connecting then separating, or connecting all.",formula:"استعاذة | بسملة | أول السورة = 4 أوجه",condition:"The boundaries among isti'adhah, basmalah, and the first verse",letters:["قطع","وصل"],
    examples:[mkExample("استعاذة ۝ بسملة ۝ أول السورة","Separate all","۝","قطع الجميع","Each element ends before the next.","Use complete stops.",20),mkExample("استعاذة — بسملة — أول السورة","Connect all","—","وصل الجميع","All three are connected correctly.","Maintain grammar and breath.",20)],
  },
  {
    unit:"unit-01",n:5,id:"tajweed-u01-l05-between-surahs",ar:"البسملة بين سورتين",en:"Basmalah between two surahs",pages:[21],
    definitionAr:"بين سورتين ثلاثة أوجه جائزة مشهورة: قطع الجميع، قطع آخر السورة ووصل البسملة بأول التالية، أو وصل الجميع؛ ويمتنع وصل آخر السورة بالبسملة ثم الوقف عليها.",definitionEn:"Between two surahs, the course teaches three accepted forms and excludes connecting the prior surah to basmalah while stopping before the next surah.",formula:"آخر السورة + بسملة + أول التالية → 3 أوجه جائزة ووجه ممتنع",condition:"The three boundaries between a surah ending, basmalah, and the next beginning",letters:["3","ممتنع"],
    examples:[mkExample("آخر السورة ۝ بسملة ۝ أول التالية","Separate all","۝","وجه جائز","All boundaries are separated.","Stop cleanly at each point.",21),mkExample("آخر السورة — بسملة ۝","Excluded form","بسملة ۝","وجه ممتنع","It attaches basmalah backward then stops.","Do not use this arrangement.",21)],
  },
  {
    unit:"unit-01",n:6,id:"tajweed-u01-l06-levels",ar:"مراتب القراءة",en:"Levels of recitation",pages:[22],
    definitionAr:"مراتب القراءة تشمل التحقيق البطيء للتعليم، والتدوير المتوسط، والحدر السريع المنضبط، وكلها تحافظ على الأحكام والحروف.",definitionEn:"Recitation levels include slow instructional tahqiq, moderate tadwir, and controlled faster hadr; every level must preserve letters and Tajweed rulings.",formula:"تحقيق / تدوير / حدر + حفظ الأحكام دائمًا",condition:"Recitation pace while preserving articulation and rulings",letters:["تحقيق","تدوير","حدر"],
    examples:[mkExample("تحقيق","Slow instructional reading","تحقيق","مرتبة قراءة","Slow pace supports precision and teaching.","Do not distort counts by over-slowing.",22),mkExample("حدر","Controlled faster reading","حدر","مرتبة قراءة","Faster pace remains governed by Tajweed.","Never drop letters or rulings.",22)],
  },
  {
    unit:"unit-01",n:7,id:"tajweed-u01-l07-principles",ar:"مبادئ علم التجويد",en:"Principles of Tajweed",pages:[23,24],
    definitionAr:"التجويد إعطاء كل حرف حقه ومستحقه من المخرج والصفات والأحكام، وغايته صون اللسان عن الخطأ في كتاب الله.",definitionEn:"Tajweed gives every letter its due articulation and qualities and applies contextual rulings to protect Qur'anic recitation from error.",formula:"مخرج + صفات + أحكام = تجويد",condition:"The letter's inherent rights and contextual dues",letters:["حق الحرف","مستحق الحرف"],
    examples:[mkExample("ق","Letter right","ق","حق الحرف","Qaf keeps its articulation and inherent qualities.","Produce it from its correct makhraj.",23),mkExample("مِن رَّبِّهِمْ","Contextual due","ن ر","مستحق الحرف","The context activates an idgham ruling.","Apply the contextual rule after correct articulation.",24)],
  },
  {
    unit:"unit-01",n:8,id:"tajweed-u01-l08-errors",ar:"اللحن الجلي واللحن الخفي",en:"Obvious and hidden errors",pages:[25],
    definitionAr:"اللحن الجلي خطأ ظاهر يخل بحرف أو حركة ونحو ذلك، والخفي خلل في أحكام التجويد وجودة الأداء يدركه أهل الصنعة.",definitionEn:"An obvious error visibly changes a letter, vowel, or structure; a hidden error compromises Tajweed application or sound quality recognized through trained listening.",formula:"تغيير حرف/حركة = جلي | خلل أداء الحكم = خفي",condition:"Whether the error changes the reading structure or its Tajweed performance",letters:["جلي","خفي"],
    examples:[mkExample("أَنْعَمْتَ / أَنْعَمْتُ","Vowel-changing error","تَ","لحن جلي","Changing the ending changes the recited form.","Restore the exact written vowel.",25),mkExample("مد غير منضبط","Timing error","مد","لحن خفي","The letters remain but Tajweed quality is faulty.","Correct the count with a teacher.",25)],
  },
  {
    unit:"unit-02",n:1,id:"tajweed-u02-l01-meaning-method",ar:"معنى المخرج وطريقة معرفته",en:"Meaning and method of finding a makhraj",pages:[27],
    definitionAr:"المخرج هو محل خروج الحرف وتميزه، ويُعرف بتسكين الحرف أو تشديده وإدخال همزة وصل متحركة قبله ثم ملاحظة موضع انقطاع الصوت.",definitionEn:"A makhraj is where a letter's sound emerges and becomes distinct; it is located by making the letter sakin or strengthened, preceding it with a vowelled helper sound, and observing where sound is cut off.",formula:"اِ + حرف ساكن → موضع انقطاع الصوت = المخرج",condition:"The point where the test sound is interrupted or defined",letters:["أَبْ","أَتْ","أَقْ"],
    examples:[mkExample("أَبْ","Makhraj test for ba","بْ","اختبار المخرج","The sound ends at lip closure.","Observe where the sound is cut.",27),mkExample("أَقْ","Makhraj test for qaf","قْ","اختبار المخرج","The deepest tongue meets the upper palate.","Keep the test letter sakin.",27)],
  },
  {
    unit:"unit-02",n:2,id:"tajweed-u02-l02-five-areas",ar:"المخارج العامة الخمسة",en:"Five general articulation areas",pages:[28],
    definitionAr:"المخارج العامة خمسة: الجوف، والحلق، واللسان، والشفتان، والخيشوم، وتتوزع فيها المخارج الخاصة للحروف.",definitionEn:"The five general articulation areas are the empty space, throat, tongue, lips, and nasal passage; specific letter points are organized within them.",formula:"الجوف + الحلق + اللسان + الشفتان + الخيشوم",condition:"The general anatomical area from which the sound emerges",letters:["الجوف","الحلق","اللسان","الشفتان","الخيشوم"],
    examples:[mkExample("ا و ي","Empty space","ا","الجوف","Madd sounds extend through the oral cavity.","Keep the path open.",28),mkExample("ء ه ع ح غ خ","Throat","ء","الحلق","These letters divide across three throat points.","Locate the correct depth.",28)],
  },
  {
    unit:"unit-02",n:3,id:"tajweed-u02-l03-empty-space",ar:"الجوف وحروف المد",en:"Empty space and madd letters",pages:[29],
    definitionAr:"مخرج حروف المد الجوف، وهي الألف الساكنة بعد فتح، والواو الساكنة بعد ضم، والياء الساكنة بعد كسر.",definitionEn:"The articulation area of the madd letters is the open oral and throat cavity: sakin alif after fathah, sakin waw after dammah, and sakin ya after kasrah.",formula:"ـَ ا | ـُ وْ | ـِ يْ → الجوف",condition:"A valid madd letter flowing through the open cavity",letters:["ا","و","ي"],
    examples:[mkExample("قَالَ","Alif madd","قَا","الجوف","Alif follows fathah and flows through the cavity.","Keep the path open for two counts when natural.",29),mkExample("قِيلَ","Ya madd","قِي","الجوف","Ya follows kasrah.","Avoid narrowing it into a consonantal ya.",29),mkExample("يَقُولُ","Waw madd","قُو","الجوف","Waw follows dammah.","Round naturally without consonantal friction.",29)],
  },
  {
    unit:"unit-02",n:4,id:"tajweed-u02-l04-throat",ar:"مخارج الحلق الثلاثة",en:"Three throat articulation points",pages:[30],
    definitionAr:"للحلق ثلاثة مخارج: أقصاه للهمزة والهاء، ووسطه للعين والحاء، وأدناه للغين والخاء.",definitionEn:"The throat has three articulation points: deepest for hamzah and ha, middle for ayn and ha, and nearest the mouth for ghayn and kha.",formula:"أقصى الحلق: ء ه | وسطه: ع ح | أدناه: غ خ",condition:"The depth of articulation within the throat",letters:["ء","ه","ع","ح","غ","خ"],
    examples:[mkExample("أَهْ","Deep throat","ء ه","أقصى الحلق","Hamzah and ha emerge from the deepest area.","Separate firmness of hamzah from breathy ha.",30),mkExample("أَعْ أَحْ","Middle throat","ع ح","وسط الحلق","Ayn and ha share the middle region.","Do not replace either with hamzah or ha.",30),mkExample("أَغْ أَخْ","Near throat","غ خ","أدنى الحلق","Ghayn and kha emerge nearest the mouth.","Preserve voicing difference.",30)],
  },
  {
    unit:"unit-02",n:5,id:"tajweed-u02-l05-deep-middle-tongue",ar:"أقصى اللسان ووسطه",en:"Deepest and middle tongue",pages:[31,32],
    definitionAr:"يخرج القاف من أقصى اللسان مع ما يحاذيه من الحنك الأعلى، والكاف أسفل منه قليلًا، وتخرج الجيم والشين والياء غير المدية من وسط اللسان.",definitionEn:"Qaf emerges from the deepest tongue against the upper palate, kaf slightly forward, while jim, shin, and consonantal ya emerge from the middle tongue.",formula:"أقصى اللسان: ق ثم ك | وسط اللسان: ج ش ي",condition:"Contact of the deepest or middle tongue with the upper palate",letters:["ق","ك","ج","ش","ي"],
    examples:[mkExample("أَقْ أَكْ","Deep tongue contrast","قْ","أقصى اللسان","Qaf is deeper than kaf.","Keep their contact points distinct.",31),mkExample("أَجْ أَشْ أَيْ","Middle tongue group","جْ","وسط اللسان","The middle tongue approaches the palate.","Distinguish closure, airflow, and consonantal ya.",32)],
  },
  {
    unit:"unit-02",n:6,id:"tajweed-u02-l06-side-tongue",ar:"حافة اللسان",en:"Side of the tongue",pages:[33],
    definitionAr:"يخرج الضاد من إحدى حافتي اللسان أو كلتيهما مع الأضراس العليا، وتخرج اللام من أدنى حافتي اللسان إلى منتهى طرفه مع لثة الأسنان العليا.",definitionEn:"Dad emerges along one or both tongue sides against the upper molars; lam uses the nearer tongue edges through the tip against the upper gum area.",formula:"حافة اللسان + الأضراس = ض | أدنى الحافة إلى الطرف = ل",condition:"Side-tongue contact for dad and lam",letters:["ض","ل"],
    examples:[mkExample("أَضْ","Dad","ضْ","حافة اللسان","The side presses along the upper molars.","Avoid replacing it with ظ or د.",33),mkExample("أَلْ","Lam","لْ","حافة اللسان","The nearer edge through the tip contacts the upper gum.","Keep the sound flowing from its proper contact.",33)],
  },
  {
    unit:"unit-02",n:7,id:"tajweed-u02-l07-tip-groups",ar:"مجموعات طرف اللسان",en:"Tip of the tongue groups",pages:[34,35,36],
    definitionAr:"تتوزع حروف طرف اللسان في مجموعات متقاربة تشمل النون والراء، والطائية، والصفيرية، واللثوية، ولكل مجموعة موضع وصفات تميزها.",definitionEn:"Tip-of-tongue letters form neighboring groups including nun and ra, ta/dal/ṭa, the whistling letters, and the interdental letters; each requires distinct placement and qualities.",formula:"ن ر | ط د ت | ص ز س | ظ ذ ث",condition:"Precise tip position relative to the gums and teeth",letters:["ن","ر","ط","د","ت","ص","ز","س","ظ","ذ","ث"],
    examples:[mkExample("أَنْ أَرْ","Nun and ra","نْ","طرف اللسان","Both use the tip region with distinct contact and qualities.","Keep nasal resonance for nun and avoid excess ra repetition.",34),mkExample("أَطْ أَدْ أَتْ","Upper-gum group","ط د ت","طرف اللسان","The tip meets the roots/gum area with different qualities.","Preserve heaviness and voicing distinctions.",35),mkExample("أَصْ أَزْ أَسْ","Whistling group","ص ز س","طرف اللسان","A narrow sound channel produces sifir.","Keep each letter distinct.",35),mkExample("أَظْ أَذْ أَثْ","Interdental group","ظ ذ ث","طرف اللسان","The tongue tip approaches or passes between the incisors.","Do not retract them into ز د س.",36)],
  },
  {
    unit:"unit-02",n:8,id:"tajweed-u02-l08-lips",ar:"الشفتان",en:"Two lips",pages:[37],
    definitionAr:"تخرج الفاء من باطن الشفة السفلى مع أطراف الثنايا العليا، وتخرج الباء والميم بانطباق الشفتين، والواو غير المدية بانضمامهما دون انطباق كامل.",definitionEn:"Fa uses the inner lower lip with upper incisors; ba and mim use both lips closing, while consonantal waw uses rounded lips without full closure.",formula:"شفة سفلى + ثنايا = ف | انطباق = ب م | انضمام بلا انطباق = و",condition:"Lower-lip/teeth contact or the degree of two-lip closure",letters:["ف","ب","م","و"],
    examples:[mkExample("أَفْ","Fa","فْ","الشفتان","Air passes between lower lip and upper incisors.","Avoid closing both lips.",37),mkExample("أَبْ أَمْ","Ba and mim","بْ","انطباق الشفتين","Both lips close, with nasal resonance distinguishing mim.","Release ba and sustain mim appropriately.",37),mkExample("أَوْ","Consonantal waw","وْ","انضمام الشفتين","The lips round without complete closure.","Keep it consonantal after fathah.",37)],
  },
  {
    unit:"unit-02",n:9,id:"tajweed-u02-l09-nasal",ar:"الخيشوم",en:"Nasal passage",pages:[38],
    definitionAr:"الخيشوم مخرج الغنة، وهي صوت لذيذ مركب في جسم النون والميم يخرج من التجويف الأنفي وتختلف مرتبته بحسب الحكم.",definitionEn:"The nasal passage is the articulation area of ghunnah, the nasal sound inherent in nun and mim whose degree varies by context.",formula:"ن / م + حكم الغنة → صوت من الخيشوم",condition:"Nasal resonance associated with nun or mim",letters:["ن","م","غنة"],
    examples:[mkExample("إِنَّ","Strengthened nun","نَّ","الخيشوم","Shaddah produces a strong ghunnah rank.","Hold the nasal sound for the taught timing.",38),mkExample("ثُمَّ","Strengthened mim","مَّ","الخيشوم","Mim carries nasal resonance through the nasal passage.","Keep lip closure with nasal flow.",38)],
  },
  {
    unit:"unit-02",n:10,id:"tajweed-u02-l10-review",ar:"المراجعة الشاملة للمخارج",en:"Cumulative articulation review",pages:[27,28,29,30,31,32,33,34,35,36,37,38],
    definitionAr:"تربط المراجعة كل حرف بمخرجه العام والخاص، وتستخدم اختبار السكون والتمييز السمعي لمنع انتقال الحرف إلى مخرج مجاور.",definitionEn:"The review maps each letter to its general and specific articulation point and uses the sakin test and listening contrasts to prevent substitution.",formula:"الحرف → المخرج العام → المخرج الخاص → اختبار ساكن → أداء",condition:"Mixed classification and production across all five general areas",letters:["الجوف","الحلق","اللسان","الشفتان","الخيشوم"],
    examples:[mkExample("قَالَ","Cavity and tongue","قَا","مراجعة","Qaf and alif use different general areas.","Separate qaf contact from alif flow.",38),mkExample("مِنْهُمْ","Nasal, tongue, and throat","نْه","مراجعة","The phrase moves across several articulation areas.","Preserve each letter while transitioning.",38),mkExample("يَضْرِبُ","Side, tip, and lips","ضْرِب","مراجعة","Multiple neighboring articulations must remain distinct.","Slow the cluster, then reconnect.",38)],
    extra:[
      check("6 · Area","Which general area contains ء ه ع ح غ خ?",["Throat","Two lips","Empty space"],"Throat"),
      check("6 · Area","Which is the nasal-passage sound?",["Ghunnah","Qalqalah","Madd alif"],"Ghunnah"),
      check("6 · Method","How is a specific makhraj tested?",["Precede a sakin target and observe sound cutoff","Add a random vowel","Read only the letter name"],"Precede a sakin target and observe sound cutoff"),
    ],
  },
];

export const foundationLessons = specs.map(build);
