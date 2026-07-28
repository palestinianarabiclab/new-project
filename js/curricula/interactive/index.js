import { defaultLessons as arabicLessons } from './lessons/index.js';
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
import { part2Unit05Lessons } from './tajweed/part2-unit05.js';
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
const outlineUrl = new URL('../../../curriculum/course-outline.json', import.meta.url);
const part2OutlineUrl = new URL('../../../curriculum/course-outline-part2.json', import.meta.url);
const part3OutlineUrl = new URL('../../../curriculum/course-outline-part3.json', import.meta.url);
const lessonResponses = await Promise.all(lessonUrls.map((url) => fetch(url)));
const [outlineResponse, part2OutlineResponse, part3OutlineResponse] = await Promise.all([
  fetch(outlineUrl),
  fetch(part2OutlineUrl),
  fetch(part3OutlineUrl),
]);

const failedLessonResponse = lessonResponses.find((response) => !response.ok);
if (failedLessonResponse) {
  throw new Error(`Could not load Tajweed lesson (${failedLessonResponse.status}).`);
}
if (!outlineResponse.ok) {
  throw new Error(`Could not load Tajweed course outline (${outlineResponse.status}).`);
}
if (!part2OutlineResponse.ok) {
  throw new Error(`Could not load Tajweed Part Two outline (${part2OutlineResponse.status}).`);
}
if (!part3OutlineResponse.ok) {
  throw new Error(`Could not load Tajweed Part Three outline (${part3OutlineResponse.status}).`);
}

const tajweedLessons = [
  ...foundationLessons,
  ...(await Promise.all(lessonResponses.map((response) => response.json()))),
  ...unit04Lessons,
  ...unit05Lessons,
  ...unit06Lessons,
  ...unit07Lessons,
  ...unit08Lessons,
  ...unit09Lessons,
  ...part2Unit01Lessons,
  ...part2Unit02Lessons,
  ...part2Unit03Lessons,
  ...part2Unit04Lessons,
  ...part2Unit05Lessons,
  ...part2Unit06Lessons,
  ...part3Unit01Lessons,
  ...part3Units02To04Lessons,
  ...part3Units05To08Lessons,
];
export const tajweedCourseOutline = await outlineResponse.json();
export const tajweedPartTwoOutline = await part2OutlineResponse.json();
export const tajweedPartThreeOutline = await part3OutlineResponse.json();
export const tajweedCourseOutlines = [
  { ...tajweedCourseOutline, level: 'Part One', levelOrder: 1 },
  tajweedPartTwoOutline,
  tajweedPartThreeOutline,
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
      lessonOrder: Number(lesson.lessonNumber?.split('.')?.[1]) || 0,
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
