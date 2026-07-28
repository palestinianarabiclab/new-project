import { e, makePart3Lesson, quiz } from './part3-factory.js';

const u2 = [
  {
    id:'tajweed-p3-u02-l01-allowed',n:1,ar:'الابتداء الجائز',en:'Allowed starting',pages:[12],
    definitionAr:'الابتداء الجائز هو البدء بكلام مستقل في لفظه صحيح في معناه، لا يفسد المعنى ولا يوهم خلاف المراد.',
    definitionEn:'An allowed start begins with wording that is grammatically independent and gives a sound intended meaning.',
    formula:'لفظ مستقل + معنى صحيح = ابتداء جائز',condition:'The new beginning is grammatically independent and preserves the intended meaning',
    markers:['استقلال اللفظ','صحة المعنى'],examples:[e('ٱلْحَمْدُ لِلَّهِ','Independent beginning','ٱلْحَمْدُ','ابتداء جائز','The phrase begins a complete construction.','Begin clearly and continue the phrase.',12)],
  },
  {
    id:'tajweed-p3-u02-l02-complete-sufficient',n:2,ar:'الابتداء التام والكافي',en:'Complete and sufficient starting',pages:[13],
    definitionAr:'يكون الابتداء تامًا إذا استقل عما قبله لفظًا ومعنى، وكافيًا إذا استقل لفظًا مع بقاء صلة في المعنى لا تفسده.',
    definitionEn:'A complete start is independent in wording and meaning; a sufficient start is grammatically independent while remaining thematically related.',
    formula:'لا تعلق لفظي ولا معنوي = تام | لا تعلق لفظي مع صلة معنوية = كاف',condition:'The beginning is independent grammatically, with either no prior meaning link or only a safe thematic link',
    markers:['تام','كاف'],examples:[e('قُلْ هُوَ ٱللَّهُ أَحَدٌ','Complete beginning','قُلْ','ابتداء تام','A new independent declaration begins.','Begin from the command and complete the verse.',13),e('وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ','Sufficient beginning','وَهُوَ','ابتداء كاف','The sentence is grammatically complete though related to prior discourse.','Preserve the thematic relation.',13)],
  },
  {
    id:'tajweed-p3-u02-l03-not-allowed',n:3,ar:'الابتداء غير الجائز',en:'Starting that is not allowed',pages:[14],
    definitionAr:'الابتداء غير الجائز هو البدء بما تعلق بما قبله لفظًا أو أوهم معنى فاسدًا أو قلب المراد، ويجب الرجوع إلى موضع يصح منه المعنى.',
    definitionEn:'A disallowed start begins with wording dependent on what precedes or creates a false meaning; restart earlier where the construction is sound.',
    formula:'تعلق لفظي أو معنى فاسد = لا تبدأ هنا؛ ارجع',condition:'The beginning depends grammatically on previous words or suggests an unintended meaning',
    markers:['مضاف إليه','صفة','جواب','استثناء'],examples:[e('إِلَّا ٱلَّذِينَ ءَامَنُوا','Dependent exception','إِلَّا','ابتداء غير جائز','The exception depends on what precedes.','Restart with enough prior wording to restore the construction.',14),e('لِلَّهِ وَلَدٌ','False isolated meaning','لِلَّهِ وَلَدٌ','ابتداء قبيح','Isolation can assert the opposite of the intended negation.','Include the preceding negation.',14)],
  },
];

const u3 = [
  {
    id:'tajweed-p3-u03-l01-cutting',n:1,ar:'قطع القراءة',en:'Cutting off recitation',pages:[15],
    definitionAr:'القطع إنهاء القراءة والانصراف عنها، بخلاف الوقف الذي يكون بنية استئناف القراءة بعد التنفس.',
    definitionEn:'Cutting off ends the recitation session, unlike waqf, which pauses for breath with intention to resume.',
    formula:'إنهاء التلاوة بلا استئناف قريب = قطع',condition:'The reader intends to finish the recitation rather than resume after a breath',
    markers:['إنهاء','استعاذة عند العودة'],examples:[e('نهاية التلاوة','Session ending','نهاية','قطع','The reader intends to stop the session.','Finish at a sound meaning boundary.',15)],
  },
  {
    id:'tajweed-p3-u03-l02-application',n:2,ar:'تطبيق القطع والعودة',en:'Cut-off application and restart',pages:[16],
    definitionAr:'يختار القارئ للقطع موضعًا حسن المعنى، وعند العودة بعد انصراف يبدأ بالاستعاذة ثم من ابتداء صحيح.',
    definitionEn:'End at a sound meaning boundary; after leaving the recitation and later returning, seek refuge and begin from a valid start.',
    formula:'قطع صحيح → انصراف → استعاذة → ابتداء صحيح',condition:'Recitation ended and is resumed after a genuine interruption',
    markers:['موضع معنى','استعاذة','ابتداء'],examples:[e('أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ','Return after cut-off','أَعُوذُ','عودة بعد قطع','A new recitation session has begun.','Seek refuge, then begin from a complete location.',16)],
    extraQuestions:[quiz('6 · Contrast','Which includes intent to resume after breathing?',['Waqf','Cut-off','Session ending'],'Waqf')],
  },
];

const u4 = [
  {
    id:'tajweed-p3-u04-l01-meaning',n:1,ar:'معنى السكت',en:'Meaning of the breathless pause',pages:[17],
    definitionAr:'السكت قطع الصوت زمنًا يسيرًا من غير تنفس مع نية متابعة القراءة فورًا، وهو أقصر من الوقف.',
    definitionEn:'Sakt is a very brief interruption of sound without breathing, followed by immediate continuation.',
    formula:'قطع صوت قصير + لا نفس + متابعة فورية = سكت',condition:'A transmitted brief pause is made without taking a breath',
    markers:['سكتة','لا تنفس'],examples:[e('عِوَجَا ۜ قَيِّمًا','Sakt boundary','عِوَجَا ۜ','سكت','Hafs pauses briefly without breath at the transmitted location.','Pause momentarily, do not inhale, then continue.',17)],
  },
  {
    id:'tajweed-p3-u04-l02-required',n:2,ar:'السكتات الواجبة لحفص',en:'Required Hafs pauses',pages:[17,18],
    definitionAr:'لحفص سكتات مشهورة لازمة في طريق الشاطبية عند الوصل في: عوجا قيما، مرقدنا هذا، من راق، بل ران.',
    definitionEn:'In the taught Hafs route, the four well-known required pauses in connected reading occur at ‘iwaja/qayyiman, marqadina/hadha, man/raq, and bal/ran.',
    formula:'عِوَجَا | مَرْقَدِنَا | مَنْ | بَلْ + سكت بلا نفس',condition:'Connected Hafs reading reaches one of the four transmitted required sakt locations',
    markers:['عِوَجَا ۜ','مَرْقَدِنَا ۜ','مَنْ ۜ رَاقٍ','بَلْ ۜ رَانَ'],examples:[
      e('عِوَجَا ۜ قَيِّمًا','Al-Kahf','عِوَجَا ۜ','سكت لازم','The pause separates the two expressions without breath.','Briefly pause before قَيِّمًا.',17),
      e('مِن مَّرْقَدِنَا ۜ هَذَا','Ya-Sin','مَرْقَدِنَا ۜ','سكت لازم','The transmitted pause occurs before هَذَا.','Pause without inhaling.',18),
      e('وَقِيلَ مَنْ ۜ رَاقٍ','Al-Qiyamah','مَنْ ۜ رَاقٍ','سكت لازم','Sakt prevents ordinary idgham across the boundary.','Keep noon evident, pause briefly, then read ra.',18),
      e('كَلَّا بَلْ ۜ رَانَ','Al-Mutaffifin','بَلْ ۜ رَانَ','سكت لازم','Sakt separates lam from ra in the transmitted reading.','Pause without breath and keep lam evident.',18),
    ],
  },
  {
    id:'tajweed-p3-u04-l03-allowed',n:3,ar:'مواضع السكت الجائز',en:'Allowed pause applications',pages:[19],
    definitionAr:'توجد مواضع لحفص يجوز فيها السكت أو الوصل بحسب الطريق المعلَّم، فلا يخلط الطالب بين الجائز واللازم ولا يركب وجهًا على آخر.',
    definitionEn:'Some Hafs locations allow sakt or connection according to the taught transmission; the learner keeps one valid route and does not mix performance faces.',
    formula:'موضع منقول + طريق معلَّم = سكت أو وصل صحيح',condition:'The book identifies a location with transmitted optional sakt and the teacher selects a valid route',
    markers:['سكت جائز','وصل جائز'],examples:[e('مَالِيَهْ ۜ هَلَكَ','Al-Haqqah','مَالِيَهْ ۜ هَلَكَ','سكت أو إدغام بحسب الوجه','The meeting of the two ha letters has transmitted performance faces.','Use only the teacher-selected face.',19)],
    notes:['Do not combine optional faces from different transmission routes.'],
  },
];

export const part3Units02To04Lessons = [
  ...u2.map((spec) => makePart3Lesson('part3-unit-02', 2, spec)),
  ...u3.map((spec) => makePart3Lesson('part3-unit-03', 3, spec)),
  ...u4.map((spec) => makePart3Lesson('part3-unit-04', 4, spec)),
];
