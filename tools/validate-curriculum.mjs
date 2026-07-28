import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(
  fs.readFileSync(path.join(root, relativePath), 'utf8')
);

const course = readJson('curriculum/course-outline.json');
const sample = readJson('curriculum/samples/unit-03-lesson-02-izhar.json');
const errors = [];
const unitIds = new Set();

for (const unit of course.units || []) {
  if (!unit.id || unitIds.has(unit.id)) errors.push(`Duplicate or missing unit id: ${unit.id}`);
  unitIds.add(unit.id);
  if (!unit.sourcePages?.length) errors.push(`${unit.id}: missing source pages`);
  if (!unit.lessons?.length) errors.push(`${unit.id}: missing lessons`);
}

const requiredLessonArrays = [
  'learningOutcomes', 'keyTerms', 'guidedPractice', 'oralPractice',
  'interactiveActivities', 'commonMistakes', 'correctionTechniques',
  'liveClassFlow', 'homework', 'exitTicket', 'masteryCriteria', 'teacherNotes'
];

for (const key of requiredLessonArrays) {
  if (!Array.isArray(sample[key]) || sample[key].length === 0) {
    errors.push(`${sample.id}: missing ${key}`);
  }
}

for (const [index, example] of (sample.quranExamples || []).entries()) {
  for (const key of ['arabic', 'surah', 'ayah', 'rule', 'triggerLetter', 'sourcePage', 'verificationStatus']) {
    if (!example[key]) errors.push(`${sample.id}: example ${index + 1} missing ${key}`);
  }
}

for (const [index, activity] of (sample.interactiveActivities || []).entries()) {
  for (const key of ['type', 'instruction', 'feedbackCorrect', 'feedbackIncorrect']) {
    if (!activity[key] || (Array.isArray(activity[key]) && activity[key].length === 0)) {
      errors.push(`${sample.id}: activity ${index + 1} missing ${key}`);
    }
  }
  if (!activity.correctAnswer && !activity.acceptedAnswers?.length) {
    errors.push(`${sample.id}: activity ${index + 1} missing an accepted answer`);
  }
  if (!activity.sourcePages?.length && !sample.source?.printedPages?.length) {
    errors.push(`${sample.id}: activity ${index + 1} missing source provenance`);
  }
}

const serialized = JSON.stringify({ course, sample });
if (/[ØÙâ�]/u.test(serialized)) errors.push('Mojibake detected in curriculum data');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Curriculum validation passed: ${course.units.length} units, sample lesson ${sample.id}.`);
