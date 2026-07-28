import fs from 'node:fs';
import path from 'node:path';
import { foundationLessons } from '../js/curricula/interactive/tajweed/foundations.js';
import { unit04Lessons } from '../js/curricula/interactive/tajweed/unit04.js';
import { unit05Lessons } from '../js/curricula/interactive/tajweed/unit05.js';
import { unit06Lessons } from '../js/curricula/interactive/tajweed/unit06.js';
import { unit07Lessons } from '../js/curricula/interactive/tajweed/unit07.js';
import { unit08Lessons } from '../js/curricula/interactive/tajweed/unit08.js';
import { unit09Lessons } from '../js/curricula/interactive/tajweed/unit09.js';
import { part2Unit01Lessons } from '../js/curricula/interactive/tajweed/part2-unit01.js';
import { part2Unit02Lessons } from '../js/curricula/interactive/tajweed/part2-unit02.js';
import { part2Unit03Lessons } from '../js/curricula/interactive/tajweed/part2-unit03.js';
import { part2Unit04Lessons } from '../js/curricula/interactive/tajweed/part2-unit04.js';
import { part2Unit05Lessons } from '../js/curricula/interactive/tajweed/part2-unit05.js';
import { part2Unit06Lessons } from '../js/curricula/interactive/tajweed/part2-unit06.js';
import { part3Unit01Lessons } from '../js/curricula/interactive/tajweed/part3-unit01.js';
import { part3Units02To04Lessons } from '../js/curricula/interactive/tajweed/part3-units02-04.js';
import { part3Units05To08Lessons } from '../js/curricula/interactive/tajweed/part3-units05-08.js';
import { buildTajweedPresentation } from '../js/curricula/interactive/tajweed/presentation.js';

const root = process.cwd();
const sampleDir = path.join(root, 'curriculum', 'samples');
const sampleLessons = fs.readdirSync(sampleDir)
  .filter((name) => name.endsWith('.json'))
  .map((name) => JSON.parse(fs.readFileSync(path.join(sampleDir, name), 'utf8')));

const lessons = [
  ...foundationLessons, ...sampleLessons, ...unit04Lessons, ...unit05Lessons,
  ...unit06Lessons, ...unit07Lessons, ...unit08Lessons, ...unit09Lessons,
  ...part2Unit01Lessons, ...part2Unit02Lessons, ...part2Unit03Lessons,
  ...part2Unit04Lessons, ...part2Unit05Lessons, ...part2Unit06Lessons,
  ...part3Unit01Lessons, ...part3Units02To04Lessons, ...part3Units05To08Lessons,
];

const errors = [];
const warnings = [];
const ids = new Set();
const kindCounts = {};

for (const lesson of lessons) {
  if (!lesson.id || ids.has(lesson.id)) errors.push(`Duplicate or missing lesson id: ${lesson.id || '(missing)'}`);
  ids.add(lesson.id);
  const presentation = buildTajweedPresentation(lesson);
  kindCounts[presentation.kind] = (kindCounts[presentation.kind] || 0) + 1;
  if (presentation.stages.length !== 7) errors.push(`${lesson.id}: presentation must contain seven stages`);
  for (const [key, ready] of Object.entries(presentation.readiness)) {
    if (!ready) warnings.push(`${lesson.id}: presentation stage needs content: ${key}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Tajweed presentation validation passed: ${lessons.length} lessons.`);
console.log(`Lesson types: ${Object.entries(kindCounts).map(([key, count]) => `${key}=${count}`).join(', ')}.`);
if (warnings.length) {
  console.log(`Review queue: ${warnings.length} item(s).`);
  console.log(warnings.join('\n'));
}
