const asArray = (value) => Array.isArray(value) ? value : [];

export function classifyTajweedLesson(lesson) {
  const context = `${lesson?.unitId || ''} ${lesson?.title?.en || ''} ${lesson?.source?.chapter || ''}`;
  if (/part3-|stop|stopping|start|pause|sakt|cut off|joined|separated|feminine ha|special words/i.test(context)) return 'reading-state';
  if (/articulation|makhraj|mouth|throat|tongue|lips|nasal|letter formation/i.test(context)) return 'articulation';
  if (/manners|prostration|principles|course scope|orientation|grammar term|past-tense|present-tense|command verb|noun|particle/i.test(context)) return 'concept';
  return 'letter-rule';
}

export function buildTajweedPresentation(lesson) {
  const kind = classifyTajweedLesson(lesson);
  const isPracticalPath = String(lesson?.unitId || '').startsWith('starter-');
  const examples = asArray(lesson?.quranExamples);
  const firstExample = examples[0] || {};
  const letters = asArray(lesson?.ruleSummary?.letters);
  const keyLabel = kind === 'reading-state'
    ? 'Marker or reading state'
    : kind === 'articulation'
      ? 'Articulation point'
      : kind === 'concept'
        ? 'Controlling idea'
        : 'Letter or trigger';
  const performanceLabel = firstExample.readingInstruction || asArray(lesson?.oralPractice).length
    ? 'Pronunciation'
    : 'Application';

  return {
    version: 1,
    delivery: 'teacher-led-screen-share',
    kind,
    keyLabel,
    performanceLabel,
    stages: isPracticalPath ? [
      { key: 'see', number: 1, label: 'See' },
      { key: 'hear-say', number: 2, label: 'Hear and say' },
      { key: 'read', number: 3, label: 'Read' },
      { key: 'practise', number: 4, label: 'Practise' },
      { key: 'check', number: 5, label: 'Check' },
    ] : [
      { key: 'definition', number: 1, label: 'Definition' },
      { key: 'keys', number: 2, label: letters.length ? 'Letters / markers' : 'Key idea' },
      { key: 'example', number: 3, label: 'Worked example' },
      { key: 'performance', number: 4, label: performanceLabel },
      { key: 'questions', number: 5, label: 'Questions' },
      { key: 'application', number: 6, label: 'Application' },
      { key: 'summary', number: 7, label: 'Summary' },
    ],
    source: {
      book: lesson?.source?.book || '',
      pages: asArray(lesson?.source?.printedPages),
      verification: lesson?.source?.verification || '',
    },
    readiness: {
      definition: !!(lesson?.definition?.studentFriendly?.ar || lesson?.definition?.studentFriendly?.en || lesson?.definition?.technical?.en),
      keys: letters.length > 0 || !!lesson?.ruleSummary?.condition,
      example: examples.length > 0,
      questions: asArray(lesson?.interactiveActivities).length > 0,
      application: asArray(lesson?.guidedPractice).length > 0 || asArray(lesson?.oralPractice).length > 0,
      summary: !!(lesson?.definition?.memoryFormula || lesson?.ruleSummary?.result),
      source: !!lesson?.source?.book && asArray(lesson?.source?.printedPages).length > 0,
    },
  };
}
