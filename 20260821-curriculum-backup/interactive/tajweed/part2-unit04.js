const src = (pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part Two",
  pdf: "tajweed-rules_part-2.pdf",
  printedPages: pages,
  pdfPages: pages.map((page) => page + 15),
  chapter: "The Two Alike, Similar, Close, and Far",
  section,
  verification: "book chapter aligned; individual idgham applications require qualified-teacher review",
});

const ex = (arabic, label, target, rule, why, how, page, boundary = "across-two-words") => ({
  arabic,
  surah: { ar: "مثال قرآني", en: label },
  ayah: "—",
  targetText: target,
  triggerLetter: target,
  previousLetter: "الحرف الأول والثاني",
  rule,
  teacherExplanation: why,
  readingInstruction: how,
  commonError: "Classifying from spelling alone without checking makhraj, characteristics, and vowel state.",
  wordBoundary: boundary,
  sourcePage: page,
  verificationStatus: "teacher-review-required",
});

const q = (stage, prompt, items, answer, right = "Correct.", wrong = "Compare makhraj, characteristics, and vowel state in that order.") => ({
  stage,
  type: "letter-relationship",
  instruction: { en: "Choose the best answer." },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: right,
  feedbackIncorrect: wrong,
});

function make(spec) {
  const { id, n, ar, en, pages, defAr, defEn, formula, condition, letters, examples, groups = [], extra = [] } = spec;
  return {
    id, unitId:"part2-unit-04", lessonNumber:`4.${n}`, title:{ar,en}, source:src(pages,en),
    contentOrigin:"book-source-and-instructional-design", level:"Part Two", estimatedMinutes:n===7?55:45,
    prerequisites:["Recall specific articulation points.","Recall essential letter characteristics.","Identify sukoon, vowels, and shaddah at a letter boundary."],
    learningOutcomes:[`Define ${en.toLowerCase()}.`,"Compare the two letters by makhraj and characteristics.","Identify small or big meeting context.","Choose clear reading or the taught idgham application.","Recite two teacher-approved attempts."],
    definition:{
      linguistic:{ar:"تُعرف علاقة الحرفين بمقارنة المخرج والصفات ثم النظر في حركة كل حرف.",en:"A two-letter relationship is determined by comparing articulation points and characteristics, then checking each letter's vowel state."},
      technical:{ar:defAr,en:defEn},studentFriendly:{ar:defAr,en:defEn},memoryFormula:formula,
    },
    keyTerms:[
      {ar:"المخرج",transliteration:"al-makhraj",en:"articulation point"},
      {ar:"الصفات",transliteration:"as-sifat",en:"letter characteristics"},
      {ar:"الإدغام الصغير",transliteration:"al-idgham as-saghir",en:"first letter sakin, second vowelled"},
      {ar:"الإدغام الكبير",transliteration:"al-idgham al-kabir",en:"both letters originally vowelled"},
    ],
    teacherPreparation:["Prepare two-letter comparison cards.","Mark makhraj, qualities, and vowel state separately.","Model clear reading before any merging.","Use only transmitted Hafs applications, not every theoretically possible merge."],
    openingReview:[{minutes:2,teacherPrompt:"Where does each letter emerge?"},{minutes:2,teacherPrompt:"Is the first letter sakin or vowelled?"}],
    conceptExplanation:[{audience:"student",text:defEn},{audience:"teacher",text:"Relationship classification does not by itself authorize merging; the transmitted reading determines the application."}],
    lessonPath:[
      {step:1,title:"Read",text:"Name the two meeting letters."},{step:2,title:"Compare makhraj",text:"Decide same, close, or distant."},
      {step:3,title:"Compare qualities",text:"Decide identical or different."},{step:4,title:"Check vowels",text:"Name small or big meeting."},
      {step:5,title:"Apply",text:"Use the taught clear or merged reading."},
    ],
    visualExplanation:[{type:"rule-equation",display:formula,teacherUse:"Reveal letters, makhraj, qualities, vowel state, then reading."}],
    ruleSummary:{condition,result:defEn,location:"Where two letters meet within a word or across a word boundary.",letters},
    letterGroups:groups.length?groups:[{name:{ar,en},letters}],
    quranExamples:examples,
    guidedPractice:[
      {sequence:1,teacherAction:"Reveal only the two letters.",studentAction:"Compare makhraj and qualities.",feedback:"Do not discuss idgham before classification."},
      {sequence:2,teacherAction:"Reveal vowels and transmitted reading.",studentAction:"Name meeting type and recite.",feedback:"Separate theoretical relation from actual Hafs application."},
    ],
    oralPractice:[{cycle:["letters","makhraj","qualities","vowels","reading"],examplesRequired:examples.length,teacherObservation:["correct relationship","correct meeting type","correct transmitted application","smooth boundary"]}],
    interactiveActivities:[
      q("1 · Order","What is compared first?",["Makhraj, then characteristics","Translation, then page","Word length"],"Makhraj, then characteristics"),
      q("2 · Small","What defines a small meeting?",["First letter sakin and second vowelled","Both letters vowelled","Both letters omitted"],"First letter sakin and second vowelled"),
      q("3 · Big","What defines a big meeting?",["Both letters originally vowelled","First letter sakin","Second letter silent"],"Both letters originally vowelled"),
      q("4 · Safety","Does a relationship automatically require idgham?",["No; the transmitted reading controls application","Yes, always","Only the font controls it"],"No; the transmitted reading controls application"),
      q("5 · Trigger","What describes this lesson?",[condition,"Any two long words","Every shaddah"],condition),
      ...extra,
    ],
    commonMistakes:["Naming a category from letter shape only.","Merging every similar pair.","Ignoring whether the first letter is sakin.","Changing the second letter's articulation after merging."],
    correctionTechniques:["Use a three-column comparison table.","Read clearly before practising idgham.","Isolate the two-letter boundary.","Restore the second letter's correct shaddah after merging."],
    knowledgeChecks:[{type:"classification",prompt:"Classify ten boundaries.",success:"Eight correct with full comparison."},{type:"recitation",prompt:"Recite a mixed transmitted set.",success:"Two teacher-approved attempts."}],
    teacherQuestions:["What are the letters?","Same or different makhraj?","Same or different qualities?","What are their vowels?","What reading is transmitted?"],
    studentTasks:["Complete the comparison.","Name small or big.","Recite the boundary."],
    liveClassFlow:[{minutes:5,phase:"Review",display:"Makhraj and qualities"},{minutes:8,phase:"Definition",display:formula},{minutes:12,phase:"Classification",display:"Comparison cards"},{minutes:10,phase:"Application",display:"Clear / merge"},{minutes:7,phase:"Recitation",display:"Teacher listening"},{minutes:3,phase:"Exit",display:"Category and reason"}],
    independentPractice:["Classify five teacher-approved boundaries before reciting."],homework:["Prepare four examples with makhraj, qualities, vowels, and reading."],
    exitTicket:["Name the relationship.","Name small or big.","Recite the transmitted form."],
    masteryCriteria:["Compares makhraj.","Compares qualities.","Checks vowels.","Separates theory from application.","Passes two attempts."],
    teacherNotes:["Do not infer a qira'ah rule solely from phonetic possibility.","Teacher review is essential for exceptional pairs."],
    sourceNotes:[`Uses printed pages ${pages.join(", ")}.`,"Decision activities are instructional additions."],
    verificationStatus:"source-aligned; qualified-teacher application review required",
  };
}

const specs = [
  {
    id:"tajweed-p2-u04-l01-categories",n:1,ar:"أقسام علاقات الحروف الأربعة",en:"Four letter-relationship categories",pages:[28,29,30,31],
    defAr:"الحرفان الملتقيان إما متماثلان اتحدا مخرجًا وصفة، أو متجانسان اتحدا مخرجًا واختلفا صفة، أو متقاربان تقارب مخرجهما أو صفاتهما، أو متباعدان تباعد مخرجهما.",
    defEn:"Meeting letters are identical when makhraj and qualities match, similar-natured when makhraj matches but qualities differ, approximating when articulation or qualities are close, and distant when articulation is far apart.",
    formula:"نفس المخرج والصفات = متماثلان | نفس المخرج فقط = متجانسان | تقارب = متقاربان | بعد = متباعدان",
    condition:"Classifying two meeting letters by makhraj and characteristics",letters:["متماثلان","متجانسان","متقاربان","متباعدان"],
    groups:[
      {name:{ar:"متماثلان",en:"Identical"},letters:["نفس المخرج","نفس الصفات"]},
      {name:{ar:"متجانسان",en:"Similar nature"},letters:["نفس المخرج","صفات مختلفة"]},
      {name:{ar:"متقاربان",en:"Approximating"},letters:["مخرج/صفات متقاربة"]},
      {name:{ar:"متباعدان",en:"Distant"},letters:["مخارج متباعدة"]},
    ],
    examples:[ex("قُل لَّهُمْ","Identical lam pair","ل ل","متماثلان","Both letters are lam.","Classify first, then apply the transmitted merge.",29),ex("قَد تَّبَيَّنَ","Dal and ta","د ت","متجانسان","They share a general articulation area but differ in qualities.","Apply the taught boundary.",30),ex("قُل رَّبِّ","Lam and ra","ل ر","متقاربان","Their articulation areas and qualities are close.","Use the transmitted idgham.",31)],
  },
  {
    id:"tajweed-p2-u04-l02-meeting-idgham",n:2,ar:"التقاء الحرفين والإدغام الصغير والكبير",en:"Meeting of two letters and types of idgham",pages:[32],
    defAr:"إذا كان الأول ساكنًا والثاني متحركًا سمي اللقاء صغيرًا، وإذا كانا متحركين سمي كبيرًا. والإدغام إدخال الأول في الثاني حتى يصيرا حرفًا واحدًا مشددًا من جنس الثاني حيث ورد النقل.",
    defEn:"A small meeting has a sakin first letter and vowelled second; a big meeting has two originally vowelled letters. Where transmitted, idgham inserts the first into the second as one strengthened sound of the second letter.",
    formula:"ساكن + متحرك = صغير | متحرك + متحرك = كبير | إدغام منقول → حرف ثانٍ مشدد",
    condition:"The vowel state of two meeting letters and whether idgham is transmitted",letters:["ساكن+متحرك","متحرك+متحرك","شدة"],
    examples:[ex("قُل لَّهُمْ","Small identical meeting","لْ لَ","إدغام صغير","The first lam is sakin and the second vowelled.","Merge as one strengthened lam.",32),ex("مَا سَلَكَكُمْ فِي","Two vowelled letters","مْ ف","لقاء الحروف","Theoretical classification must be separated from transmitted reading.","Do not invent idgham.",32)],
  },
  {
    id:"tajweed-p2-u04-l03-identical",n:3,ar:"المتماثلان",en:"Two identical letters",pages:[33,34,35],
    defAr:"المتماثلان حرفان اتحدا اسمًا ومخرجًا وصفة؛ فإن كان الأول ساكنًا والثاني متحركًا وجب إدغامهما غالبًا فيصيران حرفًا واحدًا مشددًا، مع مراعاة الاستثناءات المنقولة.",
    defEn:"Identical letters share name, makhraj, and qualities. In the common small meeting, a sakin first letter merges into the vowelled second as one strengthened identical letter, subject to transmitted exceptions.",
    formula:"نفس الحرف + الأول ساكن → إدغام متماثلين صغير",
    condition:"The exact same letter meets itself, with the first sakin in the common small form",letters:["ل+ل","ب+ب","د+د","م+م"],
    examples:[ex("قُل لَّهُمْ","Lam into lam","لْ ل","متماثلان صغير","The same lam meets itself and the first is sakin.","Read one strengthened lam.",33),ex("ٱضْرِب بِّعَصَاكَ","Ba into ba","بْ ب","متماثلان صغير","The same ba meets across the word boundary.","Close the lips for one strengthened ba.",34),ex("وَقَد دَّخَلُوا","Dal into dal","دْ د","متماثلان صغير","The first dal is sakin before vowelled dal.","Read a single strengthened dal.",35)],
  },
  {
    id:"tajweed-p2-u04-l04-similar",n:4,ar:"المتجانسان",en:"Two letters of similar nature",pages:[36,37,38],
    defAr:"المتجانسان حرفان اتحدا مخرجًا واختلفا في بعض الصفات، ويقع الإدغام في أزواج محددة منقولة مثل الدال مع التاء، والتاء مع الطاء، والباء مع الميم في موضعها.",
    defEn:"Similar-natured letters share an articulation point but differ in qualities. Idgham applies only in taught transmitted pairs, such as selected dal/ta, ta/ṭa, and ba/mim boundaries.",
    formula:"نفس المخرج + صفات مختلفة + زوج منقول = إدغام متجانسين",
    condition:"Two different letters share a makhraj and form a transmitted pair",letters:["د ت ط","ت ط","ب م"],
    examples:[ex("قَد تَّبَيَّنَ","Dal into ta","دْ ت","متجانسان","Dal and ta share an articulation point while qualities differ.","Merge dal into a strengthened ta.",36),ex("وَدَّت طَّآئِفَةٌ","Ta into heavy ta","تْ ط","متجانسان","The pair shares the tongue-tip area with different qualities.","Preserve the second heavy letter after merging.",37),ex("ٱرْكَب مَّعَنَا","Ba into mim","بْ م","متجانسان","Ba and mim share lip closure but differ in nasal quality.","Merge into mim with its required ghunnah.",38)],
  },
  {
    id:"tajweed-p2-u04-l05-close",n:5,ar:"المتقاربان",en:"Two approximating letters",pages:[39,40,41],
    defAr:"المتقاربان تقارب مخرجهما أو صفاتهما أو كلاهما من غير تماثل ولا تجانس تام، ويطبق الإدغام في أزواج محددة كالقاف مع الكاف واللام مع الراء حيث ورد.",
    defEn:"Approximating letters have close articulation points or qualities without being identical or fully same-makhraj. Only specified transmitted pairs merge, such as qaf/kaf and lam/ra in their taught locations.",
    formula:"تقارب المخرج/الصفات + زوج منقول = إدغام متقاربين",
    condition:"Different letters have close articulation or qualities and form a transmitted pair",letters:["ق ك","ل ر"],
    examples:[ex("أَلَمْ نَخْلُقكُّم","Qaf into kaf","قْ ك","متقاربان","Qaf and kaf have close posterior-tongue articulation.","Apply the taught complete merge into strengthened kaf.",39),ex("قُل رَّبِّ","Lam into ra","لْ ر","متقاربان","Lam and ra have close tongue articulation.","Merge lam into a strengthened ra.",40),ex("بَل رَّفَعَهُ","Lam into ra","لْ ر","متقاربان","The same transmitted lam/ra boundary occurs.","Preserve the second ra's correct quality.",41)],
  },
  {
    id:"tajweed-p2-u04-l06-distant",n:6,ar:"المتباعدان",en:"Two distant letters",pages:[42],
    defAr:"المتباعدان حرفان تباعد مخرجهما، والأصل إظهار كل واحد منهما من مخرجه دون إدغام بسبب البعد، مع تطبيق أي حكم تجويدي مستقل يرد في السياق.",
    defEn:"Distant letters have separated articulation points; the default is to articulate each clearly rather than merge them, while still applying any independent Tajweed rule triggered by the context.",
    formula:"مخرجان متباعدان → إظهار كل حرف من مخرجه",
    condition:"The two articulation points are distant and no separate transmitted merging rule applies",letters:["حرفان من مخرجين متباعدين"],
    examples:[ex("مِنْ هَادٍ","Tongue to throat","نْ ه","متباعدان","Nun and ha emerge from distant areas.","Keep each clear while applying the relevant noon rule.",42),ex("أَنْعَمْتَ","Tongue to throat transition","نْ ع","متباعدان","Nun and ayn have distant articulation.","Show the noon clearly before ayn.",42),ex("عَلَيْهِمْ قِتَالٌ","Lips to deep tongue","مْ ق","متباعدان","Mim and qaf emerge from distant areas.","Keep mim clear before qaf.",42)],
  },
  {
    id:"tajweed-p2-u04-l07-review",n:7,ar:"المراجعة الشاملة لعلاقات الحروف",en:"Letter relationships cumulative practice",pages:[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],
    defAr:"تجمع المراجعة مقارنة المخرج والصفات وحركة الحرفين، ثم تفصل بين اسم العلاقة ونوع اللقاء والحكم المنقول في رواية حفص.",
    defEn:"Cumulative practice compares makhraj, qualities, and vowel state, then separates relationship name, meeting type, and the actual transmitted Hafs application.",
    formula:"الحرفان → المخرج → الصفات → الحركة → العلاقة → التطبيق المنقول",
    condition:"Mixed identical, similar-natured, approximating, and distant boundaries",letters:["متماثلان","متجانسان","متقاربان","متباعدان"],
    examples:[ex("قُل لَّهُمْ","Identical","لْ ل","متماثلان صغير","Same letter; first is sakin.","Merge into strengthened lam.",42),ex("قَد تَّبَيَّنَ","Similar nature","دْ ت","متجانسان صغير","Same articulation, different qualities.","Merge into strengthened ta.",42),ex("قُل رَّبِّ","Approximating","لْ ر","متقاربان صغير","Close articulation.","Merge into strengthened ra.",42),ex("مِنْ هَادٍ","Distant","نْ ه","متباعدان","Distant articulation.","Keep the boundary clear.",42)],
    extra:[
      q("6 · Mixed","Same makhraj and same qualities means:",["Identical","Similar nature","Distant"],"Identical"),
      q("6 · Mixed","Same makhraj with different qualities means:",["Similar nature","Identical","Distant"],"Similar nature"),
      q("6 · Mixed","First sakin and second vowelled means:",["Small meeting","Big meeting","No meeting"],"Small meeting"),
      q("6 · Mixed","What controls actual merging?",["The transmitted Hafs reading","Phonetic possibility alone","Font color"],"The transmitted Hafs reading"),
    ],
  },
];

export const part2Unit04Lessons = specs.map(make);
