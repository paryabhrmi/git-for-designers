/**
 * Bilingual core (Phase 5A shell, completed in Phase 5B).
 *
 * Owns the UI language state, the shell string catalog, and how lang/dir are
 * applied to the document. Both Persian (fa) and English (en) are complete:
 * curriculum content is localized in js/content.js and UI chrome through the
 * STRINGS catalog below.
 *
 * Direction follows the language: fa -> rtl, en -> ltr. The layout mirrors via
 * CSS logical properties; the few physical cases have explicit html[dir="ltr"]
 * rules. Git commands and code stay LTR in both languages.
 *
 * The chosen language persists as an additive `lang` field ('fa' | 'en') in the
 * existing storage payload (key unchanged).
 */
import { state } from './state.js';
import { applyContentLocale } from './content.js';

export const LANGS = ['fa', 'en'];

/**
 * Shell string catalog. Every key must have both fa and en (validator-enforced).
 *
 * Voice, in both languages:
 *
 * 1. Second person, direct. The learner is addressed as «تو» / "you".
 * 2. The interface never says "I". Only the author does, and only in the
 *    personal note about data on the intro screen.
 * 3. One word for one thing. «نشان» is a badge; «دستاورد» is the end-of-path
 *    award. They were both «نشان» once, and there is a badge literally called
 *    «پایان مسیر» — so the two read as the same object.
 * 4. Verbs, not noun piles. The level opens; its lock does not open.
 * 5. No dead ends. Every failure names what to do instead, and the alternative
 *    it names has to actually exist on screen.
 * 6. A button says what it does. "Share" is a category; "Share the image" is
 *    an action.
 * 7. Git terminology stays English in both locales, and stays LTR.
 *
 * If a message has to apologise for a broken feature, fix the feature. The
 * "public URL is not configured" line is kept only as a guard — the button that
 * used to trigger it is now hidden when there is no URL.
 */
export const STRINGS = {
  'skip':            { fa: 'پرش به محتوای درس', en: 'Skip to lesson content' },
  'logo.title':      { fa: 'Git برای طراحان', en: 'Git for Designers' },
  'logo.sub':        { fa: '30 سطح · آزمون و نشان', en: '30 levels · quizzes & achievement' },
  'rail.label':      { fa: 'فهرست مطالب', en: 'Contents' },
  'rail.close':      { fa: 'بستن فهرست', en: 'Close navigation' },
  'xp.yours':        { fa: 'امتیاز تو', en: 'Your XP' },
  'search.ph':       { fa: 'جست‌وجو در سطح‌ها…', en: 'Search levels…' },
  'search.clear':    { fa: 'پاک‌کردن جست‌وجو', en: 'Clear search' },
  'reset.btn':       { fa: 'پاک‌کردن همهٔ پیشرفت', en: 'Clear all progress' },
  'settings.btn':    { fa: 'تنظیمات', en: 'Settings' },
  'nav.system':      { fa: 'سیستم طراحی', en: 'Design system' },
  'system.badge':    { fa: 'پشت صحنهٔ رابط', en: 'Behind the interface' },
  'system.lead':     { fa: 'این صفحه، سیستم طراحی همین رابط است. همهٔ مقدارها همین لحظه از CSS زنده خوانده می‌شوند، پس هیچ‌وقت با کدِ واقعی اختلاف پیدا نمی‌کنند.', en: 'This page is this interface’s own design system. Every value is read from the live CSS at render time, so it can never drift from the real code.' },
  'system.palette.h': { fa: 'رمپ تک‌رنگ', en: 'The monochrome ramp' },
  'system.palette.p': { fa: 'کل هویت رنگی این رابط همین چهار خاکستری است. هر مرحلهٔ آموزشی یکی از آن‌ها را می‌گیرد و در نوار کناری، نشانه‌ها و نمودارها همان را تکرار می‌کند. رنگ، نقش «برند» ندارد؛ نقش «کجای مسیر هستی» را دارد.', en: 'The entire colour identity is these four greys. Each phase takes one and repeats it across the rail, its markers and its charts. Colour is not branding here — it answers “where in the path am I?”' },
  'system.ink.h':    { fa: 'متن و سطح', en: 'Ink and surface' },
  'system.ink.p':    { fa: 'متن و سطح‌ها جدا از رمپ مرحله‌ها تعریف شده‌اند تا تعویض تم روشن و تیره، هویت مرحله را خراب نکند.', en: 'Text and surfaces are defined separately from the phase ramp, so switching between light and dark never disturbs a phase’s identity.' },
  'system.semantic.h': { fa: 'رنگ معنایی', en: 'Semantic colour' },
  'system.semantic.p': { fa: 'تنها جایی که رنگ غیرخاکستری مجاز است: پاسخ درست و نادرست آزمون. عمداً هیچ دکمهٔ ناوبری‌ای سبز نیست تا سبز فقط یک معنی داشته باشد.', en: 'The only place non-grey colour is allowed: right and wrong quiz answers. No navigation button is green on purpose, so green keeps exactly one meaning.' },
  'system.type.h':   { fa: 'مقیاس تایپ', en: 'Type scale' },
  'system.type.p':   { fa: 'متن اصلی روی حدود 66 کاراکتر در خط تنظیم شده و ارتفاع خط 1.95 است — فارسی به فضای عمودی بیشتری از لاتین نیاز دارد.', en: 'Body text is tuned to roughly 66 characters per line with a 1.95 line height — Persian needs more vertical space than Latin.' },
  'system.type.display': { fa: 'تیتر صفحه', en: 'Page display' },
  'system.type.section': { fa: 'تیتر بخش', en: 'Section heading' },
  'system.type.body':    { fa: 'متن درس', en: 'Lesson body' },
  'system.type.meta':    { fa: 'متن فرعی', en: 'Meta text' },
  'system.space.h':  { fa: 'فاصله', en: 'Spacing' },
  'system.space.p':  { fa: 'یک مقیاس 4 پیکسلی. هر فاصله در رابط از یکی از این توکن‌ها می‌آید، نه از عدد دستی.', en: 'A 4px scale. Every gap in the interface comes from one of these tokens, never a hand-typed number.' },
  'system.dir.h':    { fa: 'دوجهتی بودن', en: 'Bidirectionality' },
  'system.dir.p':    { fa: 'سخت‌ترین بخش این پروژه. رابط بین راست‌به‌چپ و چپ‌به‌راست آینه می‌شود، ولی دستورهای Git هرگز آینه نمی‌شوند.', en: 'The hardest part of this project. The interface mirrors between RTL and LTR, but Git commands never mirror.' },
  'system.dir.ui':   { fa: 'رابط: آینه می‌شود', en: 'Interface: mirrors' },
  'system.dir.uiNote': { fa: 'به‌جای left و right از خاصیت‌های منطقی CSS استفاده شده؛ به همین دلیل تعویض زبان هیچ قانون چیدمانی جدیدی لازم ندارد.', en: 'CSS logical properties are used instead of left and right, which is why switching language needs no new layout rules.' },
  'system.dir.cmd':  { fa: 'دستور: آینه نمی‌شود', en: 'Commands: never mirror' },
  'system.dir.cmdNote': { fa: 'هر بلوک دستور صریحاً dir="ltr" می‌گیرد. بدون این کار، علامت‌ها در فارسی جابه‌جا دیده می‌شوند و دستور اشتباه یاد داده می‌شود.', en: 'Every command block is explicitly dir="ltr". Without it, punctuation reorders inside Persian text and the command is taught wrong.' },
  'system.comp.h':   { fa: 'اجزای پایه', en: 'Base components' },
  'system.comp.p':   { fa: 'در هر صفحه فقط یک دکمهٔ پُر مجاز است؛ بقیه ghost هستند. این تنها قانون سلسله‌مراتب رابط است.', en: 'Only one filled button is allowed per screen; everything else is a ghost. That is the whole hierarchy rule.' },
  'system.comp.primary': { fa: 'کنش اصلی', en: 'Primary action' },
  'system.comp.ghost':   { fa: 'کنش فرعی', en: 'Secondary' },
  'system.comp.badge':   { fa: 'نشانک', en: 'Badge' },
  'settings.resetNote': { fa: 'این کار همهٔ پیشرفت ذخیره‌شده در این مرورگر را پاک می‌کند و برگشت‌پذیر نیست.', en: 'This erases all progress stored in this browser. It cannot be undone.' },
  'modal.title':     { fa: 'همهٔ پیشرفت پاک شود؟', en: 'Clear all progress?' },
  'modal.text':      { fa: 'همهٔ سطح‌های قبول‌شده و پیشرفت تو پاک می‌شود و همه‌چیز از سطح 1 شروع می‌شود. این کار برگشت‌پذیر نیست.', en: 'All passed levels and your progress are cleared, and everything starts again from level 1. This cannot be undone.' },
  'modal.cancel':    { fa: 'انصراف', en: 'Cancel' },
  'modal.confirm':   { fa: 'بله، پاک کن', en: 'Yes, clear it' },
  'mob.prev':        { fa: 'سطح قبلی', en: 'Previous level' },
  'mob.next':        { fa: 'سطح بعدی', en: 'Next level' },
  'top.menu':        { fa: 'فهرست', en: 'Menu' },
  'top.theme':       { fa: 'حالت روشن و تیره', en: 'Light / dark theme' },
  'top.lang':        { fa: 'تغییر زبان رابط · English', en: 'Interface language · فارسی' },
  'top.totop':       { fa: 'بازگشت به بالا', en: 'Back to top' },
  'nav.intro':       { fa: 'شروع از اینجا', en: 'Start here' },
  'nav.tracks':      { fa: 'مسیرهای یادگیری', en: 'Learning tracks' },
  'nav.missions':    { fa: 'مأموریت‌های عملی', en: 'Practice missions' },
  'nav.glossary':    { fa: 'واژه‌نامهٔ Git', en: 'Git glossary' },
  'nav.achievement': { fa: 'دستاورد مسیر', en: 'Path achievement' },
  'author.site':      { fa: 'وب‌سایت پریا بهرامی', en: 'Parya Bahrami’s website' },
  'author.li':        { fa: 'لینکدین پریا بهرامی', en: 'Parya Bahrami on LinkedIn' },
  'author.role':     { fa: 'طراح محصول · نویسنده', en: 'Product designer · author' },

  /* ---- shared UI atoms (reused across renderers) ---- */
  'level.n':            { fa: 'سطح {0}', en: 'Level {0}' },
  'state.passed':       { fa: 'قبول‌شده', en: 'Passed' },
  'state.here':         { fa: 'اینجایی', en: 'You are here' },
  'state.open':         { fa: 'باز', en: 'Open' },
  'state.locked':       { fa: 'قفل', en: 'Locked' },
  'state.done':         { fa: 'تکمیل‌شده', en: 'Completed' },
  'state.notStarted':   { fa: 'شروع‌نشده', en: 'Not started' },
  'filter.all':         { fa: 'همه', en: 'All' },
  'and.join':           { fa: ' و ', en: ' and ' },
  'author.name':        { fa: 'پریا بهرامی', en: 'Parya Bahrami' },
  'author.roleFull':    { fa: 'طراح محصول · نویسندهٔ این راهنما', en: 'Product designer · author of this handbook' },
  'byline.by':          { fa: 'تهیه‌شده توسط', en: 'Made by' },
  'doc.title':          { fa: '{0} | Git برای طراحان — پریا بهرامی', en: '{0} | Git for Designers — Parya Bahrami' },

  /* ---- locks & toasts ---- */
  'lock.prevQuiz':      { fa: 'اول باید آزمون سطح قبلی را قبول شوی.', en: 'You have to pass the previous level’s quiz first.' },
  'lock.goOpen':        { fa: 'برو به سطح باز', en: 'Go to the open level' },
  'lock.levelLockedGo': { fa: 'این سطح قفل است؛ اول آزمون سطح قبل را قبول شو.', en: 'This level is locked — pass the previous level’s quiz first.' },
  'lock.levelLocked':   { fa: 'این سطح هنوز قفل است.', en: 'This level is still locked.' },
  'lock.levelLockedRoute': { fa: 'این سطح هنوز قفل است؛ از سطح باز فعلی ادامه بده.', en: 'This level is still locked — continue from your current open level.' },
  'app.quizInProgress': { fa: 'آزمون نیمه‌کاره است؛ برای رفتن به سطح دیگر از فهرست استفاده کن.', en: 'This quiz is half-finished — use the contents list to move to another level.' },
  'app.reset':          { fa: 'پیشرفت پاک شد. از سطح 1 شروع کن.', en: 'Progress cleared. Start again from level 1.' },

  /* ---- intro page ---- */
  'intro.crumb':        { fa: 'شروع', en: 'Start here' },
  'intro.heroBadge':    { fa: 'راهنمای تعاملی · تمرین‌محور', en: 'Interactive · practice-first' },
  /* Kept short on purpose: at display size a bidirectional headline wraps badly,
     and the long form orphaned “Design Technologist” on its own line. The full
     audience is named in the lead instead. */
  'intro.h2':           { fa: 'Git، آن‌قدر که یک طراح واقعاً لازم دارد', en: 'Git, as much as a designer actually needs' },
  'intro.lead':         { fa: 'مرجع کامل Git نیست؛ همان بخشی است که در کار روزمرهٔ طراحی محصول، Design System و پروتوتایپ‌های ساخته‌شده با AI واقعاً به آن برمی‌خوری. هر موضوع با زبان ساده، یک مثال واقعی از کار طراحی، و آزمونی که تا قبول نشوی جلو نمی‌روی.', en: 'Not a complete Git reference — the part you genuinely run into in day-to-day product design, design systems, and AI-built prototypes. Every topic in plain language, with a real design example, and a quiz you have to pass before moving on.' },
  'intro.stat.levels':  { fa: 'سطح آموزشی', en: 'levels' },
  'intro.stat.quiz':    { fa: 'سؤال آزمون', en: 'quiz questions' },
  'intro.stat.xp':      { fa: 'امتیاز قابل کسب', en: 'XP to earn' },
  'intro.stat.mins':    { fa: 'دقیقهٔ مطالعه', en: 'minutes to read' },
  'intro.how':          { fa: 'اینجا چطور کار می‌کند؟', en: 'How this works' },
  'intro.step1.t':      { fa: '1. سطح را بخوان', en: '1. Read the level' },
  'intro.step1.d':      { fa: 'هر سطح یک موضوع کامل است: توضیح روان، مثال طراحی و دستورهای واقعی Git با قابلیت کپی.', en: 'Each level covers one topic end to end: a clear explanation, a design example, and real Git commands you can copy.' },
  'intro.step2.t':      { fa: '2. آزمون بده', en: '2. Take the quiz' },
  'intro.step2.d':      { fa: 'در پایان هر سطح چند سؤال چهارگزینه‌ای. پاسخ درست، پاسخ تو و دلیلش بعد از بررسی نمایش داده می‌شود.', en: 'A few multiple-choice questions close each level. After you check your answers you see the correct one, your own, and why.' },
  'intro.step3.t':      { fa: '3. سطح بعد باز می‌شود', en: '3. The next level unlocks' },
  'intro.step3.d':      { fa: 'با حداقل 70٪ نمره، سطح بعدی باز می‌شود. اگر قبول نشوی، توضیح‌ها را می‌خوانی و دوباره امتحان می‌کنی.', en: 'Score at least 70% and the next level unlocks. If you do not pass, read the explanations and try again.' },
  'intro.step4.t':      { fa: '4. دستاورد مسیر را بگیر', en: '4. Earn the path achievement' },
  'intro.step4.d':      { fa: 'با قبولی در هر 30 سطح، دستاورد مسیر و کارت شخصی‌سازی‌شده‌اش را می‌گیری — قابل چاپ، دانلود و اشتراک‌گذاری.', en: 'Pass all 30 levels to earn the path achievement and a personalised achievement card you can print, download, and share.' },
  'intro.badges.h':     { fa: 'نشان‌ها', en: 'Badges' },
  'intro.badges.sub':   { fa: '{0} از {1} نشان باز شده · هر سطح {2} امتیاز و نمرهٔ کامل {3} امتیاز اضافه دارد.', en: '{0} of {1} badges unlocked · every level is worth {2} XP, and a perfect score adds {3} more.' },
  'intro.name.label':   { fa: 'نام تو (روی دستاورد مسیر می‌آید)', en: 'Your name (shown on the path achievement)' },
  'intro.name.desc':    { fa: 'هر وقت خواستی عوضش کن؛ روی صفحهٔ دستاورد هم قابل ویرایش است.', en: 'You can change it whenever you like; it is editable on the achievement page too.' },
  'intro.name.ph':      { fa: 'مثلاً: سارا احمدی', en: 'e.g. Sara Ahmadi' },
  'intro.phases.h':     { fa: 'چهار مرحله', en: 'Four stages' },
  'intro.tracks.p':     { fa: 'سطح‌ها در چهار مسیر دسته‌بندی شده‌اند: از «مبانی Git» شروع کن و بعد مسیرهای تخصصی (AI و پروتوتایپ، Design System، Design Technologist) را ببین. پیشرفتت خودکار در هر مسیر شمرده می‌شود.', en: 'The levels are grouped into four tracks: start with “Git Basics”, then explore the specialised tracks (AI & prototyping, design systems, design technologist). Your progress counts towards every track automatically.' },
  'intro.tracks.btn':   { fa: 'دیدن چهار مسیر', en: 'See the four tracks' },
  'intro.continue':     { fa: 'ادامه از سطح {0}', en: 'Continue from level {0}' },
  'intro.start':        { fa: 'شروع از سطح 1', en: 'Start at level 1' },
  'intro.xpRank':       { fa: '{0} XP · رتبهٔ {1}', en: '{0} XP · rank: {1}' },
  'intro.privacy':      { fa: 'پیشرفت تو فقط در همین مرورگر ذخیره می‌شود؛ نه حسابی لازم است و نه پیشرفتت جایی آپلود می‌شود. پاک‌کردن دادهٔ مرورگر می‌تواند آن را حذف کند.', en: 'Your progress is stored in this browser only — no account is needed and your progress is not uploaded anywhere. Clearing your browser data can erase it.' },
  // Appended only when CLARITY_ID is actually set. A privacy line has to describe
  // the build the visitor is looking at: claiming collection that is switched off
  // is as wrong as hiding collection that is switched on.
  'intro.privacy.an':   { fa: 'برای اینکه بدانم کدام بخش‌ها واقعاً کار می‌کنند، آمار ناشناس استفاده با Microsoft Clarity جمع می‌شود؛ نام و پیشرفت تو در آن نیست.', en: 'To see which parts actually work, anonymous usage analytics are collected with Microsoft Clarity; your name and progress are not part of it.' },

  /* ---- lesson page ---- */
  'lesson.crumb':       { fa: 'سطح {0} · {1}', en: 'Level {0} · {1}' },
  'lesson.meter':       { fa: 'سطح <b>{0}</b> از {1}', en: 'Level <b>{0}</b> of {1}' },
  'lesson.meta.mins':   { fa: 'حدود {0} دقیقه مطالعه', en: 'about {0} min read' },
  'lesson.meta.q':      { fa: '{0} سؤال آزمون', en: '{0} quiz questions' },
  'lesson.meta.pass':   { fa: 'حد نصاب: {0} پاسخ درست', en: 'Pass mark: {0} correct answers' },
  'lesson.meta.passed': { fa: 'قبول‌شده · {0} XP', en: 'Passed · {0} XP' },
  'lesson.meta.perfect': { fa: 'نمرهٔ کامل', en: 'perfect score' },
  'lesson.meta.upto':   { fa: 'تا {0} امتیاز', en: 'up to {0} XP' },
  'lesson.meta.track':  { fa: 'بخشی از مسیر {0}', en: 'Part of the {0} track' },
  'lesson.review.h':    { fa: 'در تلاش قبلی این‌ها را اشتباه زدی', en: 'You got these wrong on your last attempt' },
  'lesson.review.go':   { fa: 'رفتن به آزمون', en: 'Go to the quiz' },
  'lesson.quiz.h':      { fa: 'آزمون سطح {0}', en: 'Level {0} quiz' },
  'lesson.quiz.sub':    { fa: '{0} سؤال · با {1} پاسخ درست، سطح بعد باز می‌شود.', en: '{0} questions · {1} correct answers unlock the next level.' },
  'lesson.gate.open':   { fa: 'سطح بعدی باز است. هر وقت آماده بودی ادامه بده.', en: 'The next level is unlocked. Continue whenever you are ready.' },
  'lesson.gate.last':   { fa: 'آخرین سطح را هم قبول شدی. دستاورد مسیر آماده است.', en: 'You passed the final level — your path achievement is ready.' },
  'lesson.gate.locked': { fa: 'سطح بعدی قفل است. آزمون بالا را قبول شو تا باز شود.', en: 'The next level is locked. Pass the quiz above to unlock it.' },
  'lesson.practice.h':  { fa: 'تمرین این مهارت', en: 'Practise this skill' },
  'lesson.practice.d':  { fa: 'مأموریت عملی «{0}» — اختیاری، و روی امتیازت اثری ندارد.', en: 'Practice mission “{0}” — optional, and it does not affect your XP.' },
  'lesson.nav.end':     { fa: 'آخرین سطح', en: 'Final level' },
  'lesson.toc':         { fa: 'در این سطح می‌خوانی', en: 'In this level' },
  'code.copy':          { fa: 'کپی', en: 'Copy' },
  'code.copied':        { fa: 'کپی شد', en: 'Copied' },
  'code.manual':        { fa: 'دستی انتخاب کن', en: 'Select it manually' },

  /* ---- quiz ---- */
  'quiz.optKeys':       { fa: 'الف,ب,پ,ت', en: 'A,B,C,D' },
  'quiz.check':         { fa: 'بررسی پاسخ‌ها', en: 'Check answers' },
  'quiz.checkCount':    { fa: 'بررسی پاسخ‌ها {0}/{1}', en: 'Check answers {0}/{1}' },
  'quiz.clear':         { fa: 'پاک‌کردن پاسخ‌ها', en: 'Clear answers' },
  'quiz.allAnswered':   { fa: 'هر {0} سؤال پاسخ داده شد', en: 'All {0} questions answered' },
  'quiz.answered':      { fa: '{0} از {1} سؤال پاسخ داده شد', en: '{0} of {1} questions answered' },
  'quiz.missing':       { fa: '{0} سؤال بی‌پاسخ مانده — پایین علامت خورده‌اند.', en: '{0} questions are still unanswered — they are marked below.' },
  'quiz.why':           { fa: 'چرا؟', en: 'Why?' },
  'quiz.fail':          { fa: '{0} پاسخ درست لازم بود. توضیح‌ها را بخوان و دوباره تلاش کن.', en: 'You needed {0} correct answers. Read the explanations and try again.' },
  'quiz.perfect':       { fa: 'نمرهٔ کامل در تلاش اول', en: 'Perfect score on the first try' },
  'quiz.try':           { fa: 'تلاش {0}', en: 'Attempt {0}' },
  'quiz.newBadge':      { fa: 'نشان تازه: {0}', en: 'New badge: {0}' },
  'quiz.redo':          { fa: 'تکرار آزمون', en: 'Retake the quiz' },
  'quiz.gate.all':      { fa: 'همهٔ سطح‌ها را کامل کردی. دستاورد مسیر آماده است.', en: 'You completed every level — your path achievement is ready.' },
  'quiz.gate.next':     { fa: 'سطح بعدی باز شد.', en: 'The next level is now unlocked.' },
  'quiz.goNext':        { fa: 'رفتن به سطح بعد', en: 'Go to the next level' },

  /* ---- rail / bottom bar ---- */
  'nav.progTxt':        { fa: '{0} از {1} سطح · {2} نشان', en: '{0} of {1} levels · {2} badges' },
  'nav.searchMode':     { fa: 'جست‌وجو در کل متن · {0} نتیجه', en: 'Full-text search · {0} results' },
  'nav.noHit':          { fa: 'سطحی با این عبارت پیدا نشد؛ عبارت کوتاه‌تری را امتحان کن.', en: 'No level matches that — try a shorter search.' },
  'mid.start':          { fa: 'شروع', en: 'Start' },
  'mid.next':           { fa: 'سطح بعد', en: 'Next level' },
  'mid.retry':          { fa: 'تلاش دوباره', en: 'Try again' },
  'mid.toquiz':         { fa: 'برو به آزمون', en: 'Go to the quiz' },

  /* ---- learning tracks ---- */
  'track.difficulty.advanced': { fa: 'پیشرفته', en: 'Advanced' },
  'track.status.required': { fa: 'ضروری · پیشنهاد برای شروع', en: 'Required · recommended starting point' },
  'track.status.advanced': { fa: 'اختیاری · پیشرفته', en: 'Optional · advanced' },
  'track.status.optional': { fa: 'اختیاری · تخصصی', en: 'Optional · specialised' },
  'track.flag.required': { fa: 'ضروری', en: 'Required' },
  'track.flag.optional': { fa: 'اختیاری', en: 'Optional' },
  'track.cta.review':   { fa: 'مرور مسیر تکمیل‌شده', en: 'Review the completed track' },
  'track.cta.continue': { fa: 'ادامهٔ مسیر', en: 'Continue the track' },
  'track.cta.start':    { fa: 'شروع مسیر', en: 'Start the track' },
  'track.card.aria':    { fa: 'مسیر {0} — {1}؛ {2} از {3} سطح', en: '{0} track — {1}; {2} of {3} levels' },
  'track.levelsOf':     { fa: '{0} از {1} سطح', en: '{0} of {1} levels' },
  'track.prog.aria':    { fa: 'پیشرفت مسیر {0}: {1} درصد', en: '{0} track progress: {1} percent' },
  'track.heroBadge':    { fa: 'چهار مسیر یادگیری', en: 'Four learning tracks' },
  'track.lead':         { fa: 'این راهنما چند نوع کار طراحی را پوشش می‌دهد. لازم نیست همه را بروی: از «مبانی Git» شروع کن، بعد هر مسیر تخصصی که به کارت می‌آید. پیشرفت هر مسیر از همان سطح‌هایی که قبول شده‌ای حساب می‌شود.', en: 'This handbook covers several kinds of design work. You do not have to take all of it: start with “Git Basics”, then pick whichever specialised track is useful to you. Each track’s progress is counted from the levels you have already passed.' },
  'track.reco.h':       { fa: 'از «مبانی Git» شروع کن', en: 'Start with “Git Basics”' },
  'track.reco.p':       { fa: 'مسیر اصلی و ضروری. سه مسیر دیگر تخصصی و اختیاری‌اند و بعد از یادگیری مبانی معنا پیدا می‌کنند.', en: 'The core, required track. The other three are specialised and optional, and only make sense once you know the basics.' },
  'track.reco.continue': { fa: 'ادامهٔ مبانی', en: 'Continue the basics' },
  'track.reco.start':   { fa: 'شروع از مبانی', en: 'Start with the basics' },
  'track.list.aria':    { fa: 'فهرست مسیرهای یادگیری', en: 'List of learning tracks' },
  'track.note':         { fa: 'سطح‌های تکمیل‌شده همین حالا در مسیرشان شمرده می‌شوند و چیزی از نو تکرار نمی‌شود. مسیرهای تخصصی جلوی تکمیل مبانی را نمی‌گیرند. دستاورد مسیر با قبولی در هر 30 سطح (همهٔ مسیرها) باز می‌شود.', en: 'Levels you have already completed count towards their track right away — nothing is repeated. The specialised tracks do not block finishing the basics. The path achievement unlocks once you pass all 30 levels (every track).' },
  'track.lvAria':       { fa: 'سطح {0}: {1} — {2}', en: 'Level {0}: {1} — {2}' },
  'track.action':       { fa: '{0} — سطح {1}: {2}', en: '{0} — level {1}: {2}' },
  'track.gate.t1':      { fa: 'سطح‌های بعدی این مسیر هنوز باز نشده‌اند', en: 'The next levels of this track are not open yet' },
  'track.gate.t2':      { fa: 'هنوز به سطح‌های این مسیر نرسیده‌ای', en: 'You have not reached this track’s levels yet' },
  'track.gate.b1':      { fa: 'بخشی از این مسیر را رفته‌ای. سطح‌های باقی‌مانده با ادامهٔ ترتیب سطح‌ها باز می‌شوند.', en: 'You have covered part of this track. The remaining levels open as you continue through the level order.' },
  'track.gate.b2':      { fa: 'این مسیر بعدتر باز می‌شود. اول در مبانی پیش برو؛ سطح‌های این مسیر با ترتیب سطح‌ها باز می‌شوند.', en: 'This track opens later on. Work through the basics first; these levels unlock in level order.' },
  'track.gate.cta':     { fa: 'ادامه از سطح باز فعلی', en: 'Continue from the current open level' },
  'track.missions.h':   { fa: 'تمرین عملی این مسیر', en: 'Hands-on practice for this track' },
  'track.missions.sub': { fa: 'مأموریت اختیاری برای تمرین همین مهارت‌ها در یک موقعیت واقعی طراحی. روی امتیاز و دستاورد مسیر اثری ندارد.', en: 'An optional mission that practises these skills in a real design situation. It does not affect your XP or the path achievement.' },
  'track.next':         { fa: 'مسیر پیشنهادی بعدی: {0}', en: 'Recommended next track: {0}' },
  'track.allDone':      { fa: 'همهٔ مسیرها را پوشش دادی. اگر هر 30 سطح را قبول شده‌ای، دستاورد مسیر آماده است.', en: 'You have covered every track. If you have passed all 30 levels, your path achievement is ready.' },
  'track.crumb':        { fa: 'مسیر {0}', en: '{0} track' },
  'track.back':         { fa: 'همهٔ مسیرها', en: 'All tracks' },
  'track.tag.diff':     { fa: 'سختی: {0}', en: 'Difficulty: {0}' },
  'track.tag.levels':   { fa: '{0} سطح', en: '{0} levels' },
  'track.prereq':       { fa: 'پیش‌نیاز: مسیر {0} را اول پیش ببر.', en: 'Prerequisite: work through the {0} track first.' },
  'track.prog.h':       { fa: 'پیشرفت مسیر', en: 'Track progress' },
  'track.prog.txt':     { fa: '{0} از {1} سطح · {2}٪', en: '{0} of {1} levels · {2}%' },
  'track.prog.barAria': { fa: 'پیشرفت مسیر {0}', en: '{0} track progress' },
  'track.levels.h':     { fa: 'سطح‌های این مسیر', en: 'Levels in this track' },

  /* ---- practice missions ---- */
  'mission.tone.correct':   { fa: 'انتخاب درست', en: 'The right call' },
  'mission.tone.unsafe':    { fa: 'در این موقعیت امن نیست', en: 'Not safe in this situation' },
  'mission.tone.risky':     { fa: 'ممکن است، ولی بهترین انتخاب نیست', en: 'Possible, but not the best choice' },
  'mission.tone.incorrect': { fa: 'این مدل ذهنی دقیق نیست', en: 'That mental model is not quite right' },
  'mission.startCta':   { fa: 'شروع تمرین', en: 'Start the mission' },
  'mission.reviewCta':  { fa: 'مرور دوباره', en: 'Review it again' },
  'mission.card.aria':  { fa: 'مأموریت {0} — {1}', en: 'Mission {0} — {1}' },
  'mission.flag':       { fa: 'مأموریت عملی', en: 'Practice mission' },
  'mission.steps':      { fa: '{0} مرحله', en: '{0} steps' },
  'mission.stepsDiff':  { fa: '{0} مرحله · {1}', en: '{0} steps · {1}' },
  'mission.heroBadge':  { fa: 'تمرین عملی', en: 'Hands-on practice' },
  'mission.lead':       { fa: 'هر مأموریت یک موقعیت واقعی طراحی است که در چند مرحله تصمیم می‌گیری و برای هر انتخاب، بازخورد روشن می‌گیری: چه اتفاقی می‌افتد، کدام حالت Git تغییر می‌کند و امن‌تر چیست. این‌ها اختیاری‌اند و مکمل درس‌ها و آزمون‌ها هستند؛ روی امتیاز و دستاورد مسیر اثری ندارند.', en: 'Every mission is a real design situation: you make a decision at each step and get clear feedback on your choice — what happens, which part of Git’s state changes, and what would be safer. Missions are optional companions to the lessons and quizzes; they do not affect your XP or the path achievement.' },
  'mission.simNotice':  { fa: 'شبیه‌سازی آموزشی — هیچ فرمانی روی سیستم تو اجرا نمی‌شود.', en: 'Educational simulation — no command is run on your machine.' },
  'mission.reco':       { fa: 'مأموریت پیشنهادی: {0}', en: 'Suggested mission: {0}' },
  'mission.recoMeta':   { fa: 'مسیر {0} · {1} مرحله · {2}', en: '{0} track · {1} steps · {2}' },
  'mission.allDone.h':  { fa: 'همهٔ مأموریت‌ها را کامل کردی', en: 'You have completed every mission' },
  'mission.allDone.p':  { fa: 'هر وقت خواستی می‌توانی دوباره مرورشان کنی.', en: 'You can go back and review them any time.' },
  'mission.filter.aria': { fa: 'فیلتر مأموریت‌ها بر اساس مسیر', en: 'Filter missions by track' },
  'mission.list.aria':  { fa: 'فهرست مأموریت‌ها', en: 'List of missions' },
  'mission.stepOf':     { fa: 'مرحلهٔ {0} از {1}', en: 'Step {0} of {1}' },
  'mission.progAria':   { fa: 'پیشرفت مأموریت: مرحلهٔ {0} از {1}', en: 'Mission progress: step {0} of {1}' },
  'mission.situationOf': { fa: 'موقعیت مرحلهٔ {0}', en: 'Situation for step {0}' },
  'mission.cmdSim':     { fa: 'شبیه‌سازی آموزشی — این فرمان روی سیستم تو اجرا نمی‌شود', en: 'Educational simulation — this command is not run on your machine' },
  'mission.choices.aria': { fa: 'گزینه‌ها', en: 'Options' },
  'mission.hint':       { fa: 'راهنمایی', en: 'Hint' },
  'mission.all':        { fa: 'همهٔ مأموریت‌ها', en: 'All missions' },
  'mission.finish':     { fa: 'پایان مأموریت', en: 'Finish the mission' },
  'mission.nextStep':   { fa: 'مرحلهٔ بعد', en: 'Next step' },
  'mission.retryNote':  { fa: 'گزینهٔ دیگری را امتحان کن؛ تلاش دوباره اشکالی ندارد.', en: 'Try another option — there is no penalty for a second attempt.' },
  'mission.context':    { fa: 'موقعیت', en: 'The situation' },
  'mission.debrief.h':  { fa: 'مأموریت کامل شد', en: 'Mission complete' },
  'mission.debrief.obj': { fa: 'در این مأموریت تمرین کردی:', en: 'In this mission you practised:' },
  'mission.replay':     { fa: 'تمرین دوباره', en: 'Practise again' },
  'mission.crumb':      { fa: 'مأموریت: {0}', en: 'Mission: {0}' },

  /* ---- glossary ---- */
  'gl.sub':             { fa: '{0} اصطلاح پرکاربرد، با معادل فارسی و لینک به سطحی که کامل توضیح داده شده.', en: '{0} everyday terms, each linked to the level where it is explained in full.' },
  'gl.searchPh':        { fa: 'مثلاً: rebase، توکن، conflict…', en: 'e.g. rebase, token, conflict…' },
  'gl.results':         { fa: '{0} نتیجه', en: '{0} results' },
  'gl.terms':           { fa: '{0} اصطلاح', en: '{0} terms' },
  'gl.hear':            { fa: 'شنیدن تلفظ {0}', en: 'Hear how {0} is pronounced' },
  'gl.pron':            { fa: 'تلفظ:', en: 'Pronunciation:' },
  'gl.empty':           { fa: 'اصطلاحی با این عبارت پیدا نشد؛ عبارت کوتاه‌تری را امتحان کن.', en: 'No term matches that — try a shorter search.' },
  'gl.noVoice':         { fa: 'این مرورگر تلفظ را پخش نمی‌کند؛ تلفظ نوشتاری زیر هر واژه آمده است.', en: 'This browser cannot play the audio — the written pronunciation is under each term.' },
  'gl.voiceFail':       { fa: 'پخش تلفظ ممکن نشد؛ تلفظ نوشتاری زیر واژه آمده است.', en: 'The audio would not play — the written pronunciation is under the term.' },

  /* ---- path achievement ---- */
  'ach.title':          { fa: 'دستاورد مسیر Git for Designers', en: 'Git for Designers path achievement' },
  'ach.short':          { fa: 'دستاورد مسیر', en: 'Path achievement' },
  'ach.page':           { fa: 'دستاورد مسیر', en: 'Path achievement' },
  'ach.disclaimer':     { fa: 'این دستاورد، یادبود دیجیتال تکمیل مسیر Git for Designers است و مدرک رسمی، دانشگاهی یا حرفه‌ای نیست.', en: 'This is a digital keepsake for finishing the Git for Designers learning path. It is not an official, academic, or professional credential.' },
  'ach.learner':        { fa: 'یادگیرنده', en: 'Learner' },
  'ach.locked.h':       { fa: 'دستاورد مسیر هنوز قفل است', en: 'The path achievement is still locked' },
  'ach.locked.p':       { fa: 'دستاورد مسیر با قبولی در آزمون هر 30 سطح باز می‌شود. تا اینجا {0} سطح را کامل کرده‌ای.', en: 'The path achievement unlocks once you pass the quiz of all 30 levels. So far you have completed {0} of them.' },
  'ach.continue':       { fa: 'ادامه از سطح {0}', en: 'Continue from level {0}' },
  'ach.card':           { fa: 'کارت دستاورد', en: 'Achievement card' },
  'ach.completed':      { fa: 'مسیر را کامل کرد', en: 'completed the path' },
  'ach.nameAria':       { fa: 'نام روی دستاورد مسیر', en: 'Name on the path achievement' },
  'ach.rank':           { fa: 'رتبه', en: 'Rank' },
  'ach.xp':             { fa: 'امتیاز', en: 'XP' },
  'ach.levelsDone':     { fa: 'سطح‌های کامل‌شده', en: 'Levels completed' },
  'ach.badges':         { fa: 'نشان‌ها', en: 'Badges' },
  'ach.ofTotal':        { fa: '{0} از {1}', en: '{0} of {1}' },
  'ach.badgesAria':     { fa: 'نشان‌های به‌دست‌آمده', en: 'Badges earned' },
  'ach.empty':          { fa: 'هنوز نشانی به‌دست نیاورده‌ای؛ مسیر را کامل کرده‌ای و می‌توانی کارت دستاورد را بسازی.', en: 'You have not earned a badge yet — but you finished the path, so you can still build your achievement card.' },
  'ach.hero':           { fa: 'نشان برجسته: {0}', en: 'Featured badge: {0}' },
  'ach.foot':           { fa: 'تکمیل‌شده در Git for Designers · پریا بهرامی', en: 'Completed in Git for Designers · Parya Bahrami' },
  'ach.build':          { fa: 'ساخت کارت دستاورد', en: 'Build the achievement card' },
  'ach.share':          { fa: 'اشتراک تصویر', en: 'Share the image' },
  'ach.print':          { fa: 'چاپ', en: 'Print' },
  'ach.editName':       { fa: 'ویرایش نام', en: 'Edit name' },
  'ach.back':           { fa: 'بازگشت به سطح‌ها', en: 'Back to the levels' },
  'ach.view':           { fa: 'دیدن دستاورد مسیر', en: 'View the path achievement' },
  'ach.panel.h':        { fa: 'ساخت و اشتراک کارت دستاورد', en: 'Build and share your achievement card' },
  'ach.hint.native':    { fa: 'می‌توانی تصویر را از طریق برگهٔ اشتراک دستگاه بفرستی، یا دانلود کنی و در LinkedIn یا Instagram بارگذاری کنی.', en: 'You can send the image through your device’s share sheet, or download it and upload it to LinkedIn or Instagram.' },
  'ach.hint.dl':        { fa: 'اشتراک‌گذاری مستقیم فایل در این مرورگر در دسترس نیست. تصویر را دانلود کن و همراه متن پست در LinkedIn یا Instagram بارگذاری کن.', en: 'Direct file sharing is not available in this browser. Download the image and upload it with the post text to LinkedIn or Instagram.' },
  'ach.dl.square':      { fa: 'دانلود تصویر مربعی', en: 'Download square image' },
  'ach.dl.story':       { fa: 'دانلود تصویر استوری', en: 'Download story image' },
  'ach.copyCaption':    { fa: 'کپی متن پست', en: 'Copy post text' },
  'ach.liShare':        { fa: 'اشتراک لینک LinkedIn', en: 'Share the link on LinkedIn' },
  'ach.caption':        { fa: 'متن پست', en: 'Post text' },
  'ach.captionCopied':  { fa: 'متن پست کپی شد.', en: 'Post text copied.' },
  'ach.downloaded':     { fa: 'تصویر کارت دستاورد دانلود شد.', en: 'Achievement card image downloaded.' },
  'ach.copyFail':       { fa: 'کپی متن ممکن نشد؛ دستی انتخاب کن.', en: 'The text could not be copied — select it manually.' },
  'ach.shareFail':      { fa: 'اشتراک‌گذاری ممکن نشد؛ تصویر را دانلود کن.', en: 'Sharing failed — download the image instead.' },
  'ach.noUrl':          { fa: 'آدرس عمومی تنظیم نشده است.', en: 'The public URL is not configured.' },
  'ach.liOpened':       { fa: 'لینک در LinkedIn باز شد؛ تصویر را جداگانه بارگذاری کن.', en: 'The link opened on LinkedIn — upload the image separately.' },
  'ach.cap.done':       { fa: 'مسیر Git for Designers را کامل کردم و نشان فتح مسیر را گرفتم.', en: 'I completed the Git for Designers path and earned the path achievement.' },
  'ach.cap.rank':       { fa: 'رتبهٔ فعلی من: {0}', en: 'My current rank: {0}' },
  'ach.cap.badges':     { fa: 'نشان‌های به‌دست‌آمده: {0}', en: 'Badges earned: {0}' },

  /* ---- interactive simulator ---- */
  'sim.head':           { fa: 'تمرین تعاملی: مسیر یک تغییر', en: 'Interactive practice: the journey of one change' },
  'sim.note':           { fa: 'دستورها را بزن و ببین فایل‌ها بین سه ناحیهٔ Git چطور جابه‌جا می‌شوند.', en: 'Run the commands and watch the files move between Git’s three areas.' },
  'sim.col.wd':         { fa: 'پوشهٔ کار', en: 'Working tree' },
  'sim.col.st':         { fa: 'ناحیهٔ آماده‌سازی', en: 'Staging area' },
  'sim.col.cm':         { fa: 'تاریخچه', en: 'History' },
  'sim.reset':          { fa: 'از نو', en: 'Start over' },
  'sim.empty':          { fa: 'خالی', en: 'Empty' },
  'sim.logEmpty':       { fa: 'هنوز دستوری اجرا نشده. با <span class="cmd">git status</span> شروع کن.', en: 'No command has been run yet. Start with <span class="cmd">git status</span>.' },
  'sim.exp.status':     { fa: '{0} فایل آمادهٔ ثبت، {1} فایل تغییرکردهٔ Stage‌نشده.', en: '{0} file(s) staged for commit, {1} changed file(s) not staged.' },
  'sim.exp.add1':       { fa: 'فقط همین فایل وارد ناحیهٔ آماده‌سازی شد.', en: 'Only this one file moved into the staging area.' },
  'sim.exp.addall':     { fa: 'همهٔ تغییرات Stage شدند — با احتیاط استفاده کن.', en: 'Every change was staged — use this one with care.' },
  'sim.exp.commit':     { fa: '{0} فایل در یک Commit ثبت شد. چیزی که Stage نبود، ثبت نشد.', en: '{0} file(s) recorded in one commit. Anything that was not staged was not recorded.' },
  'sim.exp.push':       { fa: 'Commitها روی Remote (GitHub) هم قرار گرفتند.', en: 'The commits are now on the remote (GitHub) as well.' },
  'sim.anchor':         { fa: 'سه ناحیهٔ اصلی Git', en: 'The three main areas of Git' },
};


export const getLang = () => (state.lang === 'en' ? 'en' : 'fa');

/** Translate a catalog key in the current UI language, falling back to fa. */
export function t(key) {
  const e = STRINGS[key];
  if (!e) return key;
  const lang = getLang();
  return (lang === 'en' && e.en) ? e.en : e.fa;
}

/**
 * Translate a catalog key and fill its positional {0}, {1}, … placeholders.
 * Each language owns a full sentence, so word order stays natural per locale
 * instead of being glued together from fragments at the call site.
 */
export function tf(key, ...args) {
  return t(key).replace(/\{(\d+)\}/g, (m, i) => (args[i] !== undefined ? String(args[i]) : m));
}

/** Apply the current language to the document: lang attr, data-lang hook,
 *  static [data-i18n*] shell nodes, the English-mode notice, and the
 *  Persian-content region marking. Idempotent. */
export function applyLang() {
  const lang = getLang();
  const doc = document.documentElement;
  doc.lang = lang;
  doc.dataset.lang = lang;
  doc.dir = lang === 'en' ? 'ltr' : 'rtl';

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.setAttribute('alt', t(el.dataset.i18nAlt)); });
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.title = t('top.lang');
}

/** Switch the UI language; caller persists and re-renders. */
/* Async because the English text modules are fetched on demand. Callers must
   await it before rendering, or English would paint with Persian content. */
export async function setLang(lang) {
  state.lang = LANGS.includes(lang) ? lang : 'fa';
  await applyContentLocale(state.lang);
  applyLang();
}
