const CHAPTERS = {
  'part3-unit-02': 'The Start',
  'part3-unit-03': 'The Cut Off',
  'part3-unit-04': 'The Breathless Pause',
  'part3-unit-05': 'Stopping on Word Endings',
  'part3-unit-06': 'The Joined and Separated',
  'part3-unit-07': 'The Feminine Ha',
  'part3-unit-08': 'Special Words for Hafs',
};

const source = (unitId, pages, section) => ({
  book: "Tajweed Rules of the Qur'an — Part Three",
  pdf: 'Tajweed-Rules-of-the-Quran-p3.pdf',
  printedPages: pages,
  pdfPages: pages.map((page) => page + 8),
  chapter: CHAPTERS[unitId],
  section,
  verification: 'Aligned to the scanned book; exact recitation is confirmed by a qualified teacher.',
});

const question = (stage, prompt, items, answer) => ({
  stage,
  type: 'tajweed-decision',
  instruction: { en: 'Choose the best answer.' },
  prompt,
  items,
  acceptedAnswers: [answer],
  feedbackCorrect: 'Correct. Explain the reason, then demonstrate it.',
  feedbackIncorrect: 'Return to the rule, identify the condition, and try again.',
});

const example = (item) => ({
  arabic: item.arabic,
  surah: { ar: 'مثال قرآني أو تطبيقي', en: item.label },
  ayah: item.ayah || '—',
  targetText: item.target || item.arabic,
  triggerLetter: item.trigger || item.target || item.arabic,
  previousLetter: item.context || 'موضع الحكم',
  rule: item.rule,
  teacherExplanation: item.why,
  readingInstruction: item.how,
  commonError: item.error || 'Applying the visible form without checking the reading context.',
  wordBoundary: item.boundary || 'word-or-phrase',
  sourcePage: item.page,
  verificationStatus: 'teacher-review-required',
});

export const e = (arabic, label, target, rule, why, how, page, extra = {}) =>
  example({ arabic, label, target, rule, why, how, page, ...extra });

export function makePart3Lesson(unitId, unitNumber, spec) {
  const {
    id, n, ar, en, pages, definitionAr, definitionEn, formula, condition,
    markers = [], examples = [], extraQuestions = [], notes = [],
  } = spec;
  const review = /review|cumulative/i.test(en);

  return {
    id,
    unitId,
    lessonNumber: `${unitNumber}.${n}`,
    title: { ar, en },
    source: source(unitId, pages, en),
    contentOrigin: 'book-source-and-instructional-design',
    level: 'Part Three',
    estimatedMinutes: review ? 55 : 43,
    prerequisites: [
      'Read the complete word or phrase before applying the rule.',
      'Distinguish connected reading, stopping, starting, and breathless pause.',
      'Follow the Hafs reading taught by the teacher.',
    ],
    learningOutcomes: [
      `Define ${en.toLowerCase()}.`,
      'Identify the controlling written or recitation condition.',
      'Explain the rule in plain language.',
      'Apply the rule to book examples.',
      'Demonstrate the reading accurately to the teacher.',
    ],
    definition: {
      linguistic: {
        ar: definitionAr,
        en: definitionEn,
      },
      technical: { ar: definitionAr, en: definitionEn },
      studentFriendly: { ar: definitionAr, en: definitionEn },
      memoryFormula: formula,
    },
    keyTerms: [
      { ar: 'الوصل', transliteration: 'al-wasl', en: 'connected reading' },
      { ar: 'الوقف', transliteration: 'al-waqf', en: 'stopping with breath' },
      { ar: 'الابتداء', transliteration: "al-ibtida'", en: 'starting or restarting' },
      { ar: 'السكت', transliteration: 'as-sakt', en: 'brief pause without breath' },
    ],
    teacherPreparation: [
      'Display the complete Qur’anic phrase, not the target word alone.',
      'Color the controlling letters or written boundary.',
      'Model connected and stopped forms before asking for imitation.',
      'Keep transmitted Hafs exceptions under direct teacher supervision.',
    ],
    openingReview: [
      { minutes: 2, teacherPrompt: 'Are we connecting, stopping, starting, or making sakt?' },
      { minutes: 2, teacherPrompt: 'Which written or sound condition controls the rule?' },
    ],
    conceptExplanation: [
      { audience: 'student', text: definitionEn },
      { audience: 'teacher', text: `Teach the decision in this order: context → marker → rule → sound. ${notes.join(' ')}`.trim() },
    ],
    lessonPath: [
      { step: 1, title: 'Read the context', text: 'Read the whole phrase once without interruption.' },
      { step: 2, title: 'Find the marker', text: 'Locate the controlling letter, ending, or written boundary.' },
      { step: 3, title: 'State the rule', text: 'Name the rule and explain why it applies.' },
      { step: 4, title: 'Hear the contrast', text: 'Compare correct and common incorrect performance.' },
      { step: 5, title: 'Recite', text: 'Apply it in the complete phrase.' },
    ],
    visualExplanation: [{
      type: 'rule-equation',
      display: formula,
      teacherUse: 'Reveal the context, marker, decision, and final sound one at a time.',
    }],
    ruleSummary: {
      condition,
      result: definitionEn,
      location: 'In the specified Part Three reading or written form.',
      letters: markers,
    },
    letterGroups: [{ name: { ar, en }, letters: markers }],
    quranExamples: examples,
    guidedPractice: [
      { sequence: 1, teacherAction: 'Model the complete phrase.', studentAction: 'Point to the controlling marker.', feedback: 'Require a reason before recitation.' },
      { sequence: 2, teacherAction: 'Contrast two possible readings.', studentAction: 'Choose and demonstrate the book’s Hafs form.', feedback: 'Correct the sound inside the full phrase.' },
    ],
    oralPractice: [{
      cycle: ['read context', 'find marker', 'name rule', 'contrast', 'recite'],
      examplesRequired: examples.length,
      teacherObservation: ['correct context', 'correct rule', 'accurate sound', 'smooth phrase'],
    }],
    interactiveActivities: [
      question('1 · Context', 'What must be identified first?', ['The reading context', 'The page color', 'The translation length'], 'The reading context'),
      question('2 · Marker', 'What controls this lesson?', [condition, 'Guessing from memory', 'The longest word'], condition),
      question('3 · Rule', 'When should the rule be named?', ['After locating its condition', 'Before seeing the phrase', 'Only after homework'], 'After locating its condition'),
      question('4 · Sound', 'What completes learning?', ['Teacher-observed recitation', 'A visual quiz only', 'Silent reading only'], 'Teacher-observed recitation'),
      question('5 · Transfer', 'How should a new example be solved?', ['Context → marker → rule → sound', 'Sound → guess → stop', 'Translation only'], 'Context → marker → rule → sound'),
      ...extraQuestions,
    ],
    commonMistakes: [
      'Applying a rule to the isolated spelling without reading context.',
      'Confusing stopping, starting, connection, and sakt.',
      'Memorizing an exception without its Qur’anic word.',
      'Passing a visual quiz without accurate recitation.',
    ],
    correctionTechniques: [
      'Read the phrase before isolating the target.',
      'Use a four-state card: connect, stop, start, sakt.',
      'Pair every exception with its exact written form.',
      'Require two accurate teacher-observed attempts.',
    ],
    knowledgeChecks: [
      { type: 'decision', prompt: 'Solve eight mixed examples with reasons.', success: 'At least seven correct.' },
      { type: 'recitation', prompt: 'Recite the selected examples.', success: 'Two accurate teacher-approved attempts.' },
    ],
    teacherQuestions: ['What is the context?', 'Where is the marker?', 'Why does the rule apply?', 'How should it sound?'],
    studentTasks: ['Mark the target.', 'State the condition.', 'Explain the rule.', 'Recite the full phrase.'],
    liveClassFlow: [
      { minutes: 5, phase: 'Review', display: 'Context states' },
      { minutes: 8, phase: 'Definition', display: formula },
      { minutes: 10, phase: 'Visual rule', display: 'Marker → decision' },
      { minutes: 10, phase: 'Book examples', display: 'Correct / incorrect' },
      { minutes: 8, phase: 'Recitation', display: 'Teacher listening' },
      { minutes: 3, phase: 'Exit', display: 'Rule and sound' },
    ],
    independentPractice: ['Prepare five examples using context → marker → rule → sound.'],
    homework: ['Annotate four examples and record or present their correct reading.'],
    exitTicket: ['Name the context.', 'Point to the marker.', 'State and demonstrate the rule.'],
    masteryCriteria: ['Identifies context.', 'Finds the marker.', 'Explains the rule.', 'Recites accurately.', 'Transfers to a new example.'],
    teacherNotes: ['Teacher-only semantic and recitation notes remain hidden unless Teacher Mode is enabled.', ...notes],
    sourceNotes: [`Uses printed pages ${pages.join(', ')} of Part Three.`],
    verificationStatus: 'source-aligned; qualified-teacher recitation review required',
  };
}

export const quiz = question;
