import { defaultLessons as arabicLessons } from './lessons/index.js';
import { practicalTajweedLessons, practicalTajweedOutline } from './tajweed/practical-path.js';
import { unit04Lessons } from './tajweed/unit04.js';
import { unit05Lessons } from './tajweed/unit05.js';
import { unit06Lessons } from './tajweed/unit06.js';
import { unit07Lessons } from './tajweed/unit07.js';
import { unit08Lessons } from './tajweed/unit08.js';
import { unit09Lessons } from './tajweed/unit09.js';
import { foundationLessons } from './tajweed/foundations.js';
import { part2Unit01Lessons } from './tajweed/part2-unit01.js';
import { part2Unit02Lessons } from './tajweed/part2-unit02.js';
import { part2Unit03Lessons } from './tajweed/part2-unit03.js';
import { part2Unit04Lessons } from './tajweed/part2-unit04.js';
import { part2Unit06Lessons } from './tajweed/part2-unit06.js';
import { part3Unit01Lessons } from './tajweed/part3-unit01.js';
import { part3Units02To04Lessons } from './tajweed/part3-units02-04.js';
import { part3Units05To08Lessons } from './tajweed/part3-units05-08.js';
import { buildTajweedPresentation } from './tajweed/presentation.js';

export const INTERACTIVE_CURRICULUM_ID = 'interactive';
export const INTERACTIVE_LESSON_PREFIX = 'interactive::';
export const TAJWEED_CURRICULUM_ID = 'tajweed';
export const ARABIC_CURRICULUM_ID = 'arabic';

const lessonUrls = [
  new URL('../../../curriculum/samples/unit-03-lesson-01-noon-tanween-foundations.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-02-izhar.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-03-idgham-with-ghunnah.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-04-absolute-izhar.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-05-idgham-without-ghunnah.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-06-complete-incomplete-idgham.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-07-iqlab.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-08-ikhfa.json', import.meta.url),
  new URL('../../../curriculum/samples/unit-03-lesson-09-written-tanween-mixed-review.json', import.meta.url),
];
const [lessonResponses, outlineResponse, part2OutlineResponse, part3OutlineResponse] = await Promise.all([
  Promise.all(lessonUrls.map((url) => fetch(url))),
  fetch(new URL('../../../curriculum/course-outline.json', import.meta.url)),
  fetch(new URL('../../../curriculum/course-outline-part2.json', import.meta.url)),
  fetch(new URL('../../../curriculum/course-outline-part3.json', import.meta.url)),
]);

if (lessonResponses.some((response) => !response.ok) || !outlineResponse.ok || !part2OutlineResponse.ok || !part3OutlineResponse.ok) {
  throw new Error('Could not load the restored Tajweed curriculum.');
}

const [rawPartOne, rawPartTwo, rawPartThree] = await Promise.all([
  outlineResponse.json(), part2OutlineResponse.json(), part3OutlineResponse.json(),
]);
const sampleLessons = await Promise.all(lessonResponses.map((response) => response.json()));
const lessonSuffix = (lesson) => Number(String(lesson.lessonNumber || '').split('.').at(-1));
const pickLessons = (lessons, unitId, numbers) => lessons.filter((lesson) =>
  lesson.unitId === unitId && numbers.includes(lessonSuffix(lesson))
);

const partOneLessons = [
  ...practicalTajweedLessons.filter((lesson) => [1, 11, 12, 13].includes(Number(lesson.lessonNumber))),
  ...pickLessons(foundationLessons, 'unit-02', [2, 4, 5, 7, 8, 9]),
  ...pickLessons(sampleLessons, 'unit-03', [1, 2, 3, 5, 7, 8]),
  ...pickLessons(unit04Lessons, 'unit-04', [2, 3, 4]),
  ...pickLessons(unit05Lessons, 'unit-05', [1]),
  ...pickLessons(unit06Lessons, 'unit-06', [2, 3]),
  ...pickLessons(unit07Lessons, 'unit-07', [7, 8, 10]),
  ...pickLessons(unit09Lessons, 'unit-09', [1, 2]),
];

const partOneUnitIds = ['starter-01','starter-03','unit-02','unit-03','unit-04','unit-05','unit-06','unit-07','unit-09'];
const allPartOneOutlineUnits = [...practicalTajweedOutline.units, ...(rawPartOne.units || [])];
const partOneTitleOverrides = {
  'starter-01': { ar: 'الحروف وأشكالها', en: 'Arabic Letters and Their Shapes' },
  'starter-02': { ar: 'بناء القراءة خطوة بخطوة', en: 'Building Qur’an Reading' },
  'starter-03': { ar: 'السكون والشدة', en: 'Sukoon and Shaddah' },
};
const streamlinedPartOneUnits = partOneUnitIds.map((unitId) => {
  const sourceUnit = allPartOneOutlineUnits.find((unit) => unit.id === unitId);
  return {
    ...(sourceUnit || { id: unitId, title: { ar: unitId, en: unitId } }),
    title: partOneTitleOverrides[unitId] || sourceUnit?.title || { ar: unitId, en: unitId },
    lessons: partOneLessons.filter((lesson) => lesson.unitId === unitId).map((lesson) => lesson.title.en),
  };
});
export const tajweedCourseOutline = {
  ...rawPartOne,
  level: 'Part One',
  levelOrder: 1,
  audience: 'Learners who already recognise Arabic vowel marks and can decode basic words, progressing into essential Tajweed',
  units: streamlinedPartOneUnits,
};
export const tajweedPartTwoOutline = {
  ...rawPartTwo,
  units: (rawPartTwo.units || []).filter((unit) => unit.id !== 'part2-unit-05'),
};
export const tajweedPartThreeOutline = rawPartThree;
export const tajweedCourseOutlines = [tajweedCourseOutline, tajweedPartTwoOutline, tajweedPartThreeOutline];

const tajweedLessons = [
  ...partOneLessons,
  ...part2Unit01Lessons, ...part2Unit02Lessons, ...part2Unit03Lessons, ...part2Unit04Lessons, ...part2Unit06Lessons,
  ...part3Unit01Lessons, ...part3Units02To04Lessons, ...part3Units05To08Lessons,
];

const outlineUnits = tajweedCourseOutlines.flatMap((outline) =>
  (outline.units || []).map((unit, unitIndex) => ({
    outline,
    unit,
    unitIndex,
  }))
);

const loadedTajweedLessons = Object.fromEntries(tajweedLessons.map((lesson) => [
  `${INTERACTIVE_LESSON_PREFIX}${lesson.id}`,
  {
    ...lesson,
    presentation: buildTajweedPresentation(lesson),
    schemaType: 'tajweed-v1',
    meta: {
      level: outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.outline.level || lesson.level || 'Part One',
      levelOrder: outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.outline.levelOrder || 1,
      unit: outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.unit.title?.en || '',
      unitAr: outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.unit.title?.ar || '',
      unitOrder: (outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.unitIndex ?? 0) + 1,
      lessonOrder: Number(lesson.lessonNumber?.split('.')?.at(-1)) || 0,
      lessonTitle: lesson.title.en,
      lessonTitleAr: lesson.title.ar,
      curriculumId: TAJWEED_CURRICULUM_ID,
      curriculumLabel: outlineUnits.find(({ unit }) => unit.id === lesson.unitId)?.outline.title?.en || 'Tajweed Rules of the Qur’an',
      sourceLessonId: lesson.id,
    },
    overview: {
      title: lesson.title.en,
      description: lesson.conceptExplanation?.find((item) => item.audience === 'student')?.text || '',
      goals: lesson.learningOutcomes || [],
    },
    vocabulary: { core: [], extra: [] },
    dialogue: { lines: [] },
    grammar: [],
    practice: { quiz: [], rolePlays: [], translation: [] },
    homework: { instructions: (lesson.homework || []).join('\n') },
    teacherNotes: { myNotes: '' },
  },
]));

export const interactiveLessons = {
  ...loadedTajweedLessons,
  ...Object.fromEntries(
    Object.entries(arabicLessons).map(([lessonId, lesson]) => [
      `arabic::${lessonId}`,
      {
        ...lesson,
        schemaType: 'arabic-v1',
        meta: {
          ...(lesson.meta || {}),
          curriculumId: ARABIC_CURRICULUM_ID,
          curriculumLabel: 'Palestinian Arabic Curriculum',
          sourceLessonId: lessonId,
        },
      },
    ])
  ),
};
