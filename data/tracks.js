/**
 * Four learning tracks for Git for Designers.
 *
 * This module is PURE DATA. Track membership references existing level IDs from
 * data/levels.js — it never duplicates lesson, quiz, or scenario content. Track
 * progress is derived at runtime from the learner's completed level IDs
 * (state.done); no per-track completion state is stored.
 *
 * Every one of the 30 levels is assigned to exactly one primary track
 * (single-ownership), matching docs/curriculum-map.md.
 *
 * Track IDs are stable and never localized: core, ai-prototype, design-system,
 * design-technologist.
 */
export const TRACKS = [
  {
    id: 'core',
    title: 'Core Git for Designers',
    shortTitle: 'مبانی Git',
    kind: 'required',            // 'required' | 'optional'
    difficulty: 'مقدماتی',
    icon: 'ph-book-open',        // Phosphor icon (vendored locally)
    audience: 'همهٔ طراحان — نقطهٔ شروع دوره',
    description: 'پایهٔ کار با Git برای طراحان: از مدل ذهنی و Commit تا Branch، همگام‌سازی با Remote، Merge، حل Conflict، Pull Request و بازگردانی امن. همین مسیر برای استفادهٔ روزمره و همکاری با تیم توسعه کافی است.',
    levelIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 26, 30],
    prerequisiteTrackIds: [],
    recommendedNextTrackIds: ['design-system', 'ai-prototype', 'design-technologist'],
    completionMessage: 'مبانی Git را کامل کردی؛ حالا آمادهٔ مسیرهای تخصصی هستی.',
  },
  {
    id: 'ai-prototype',
    title: 'AI & Prototype Workflow',
    shortTitle: 'AI و پروتوتایپ',
    kind: 'optional',
    difficulty: 'تخصصی',
    icon: 'ph-robot',
    audience: 'طراحانی که با کد تولیدشده با AI و پروتوتایپ‌های چندنسخه‌ای کار می‌کنند',
    description: 'استفاده از Git به‌عنوان کنترل کیفیت برای تغییرات ساخته‌شده با AI و پروتوتایپ‌ها: بازبینی Diff کدِ تولیدی، نگه‌داشتن نسخه‌های خوب، جداکردن آزمایش‌ها و بازگشت امن از خروجی بد.',
    levelIds: [21, 22],
    prerequisiteTrackIds: ['core'],
    recommendedNextTrackIds: ['design-system', 'design-technologist'],
    completionMessage: 'حالا Git را برای مهار کد AI و کار با پروتوتایپ‌ها بلدی.',
  },
  {
    id: 'design-system',
    title: 'Design System Workflow',
    shortTitle: 'Design System',
    kind: 'optional',
    difficulty: 'تخصصی',
    icon: 'ph-palette',
    audience: 'مشارکت‌کنندگان Design System و طراحان توکن و کامپوننت',
    description: 'مدیریت Design System به‌عنوان کدِ نسخه‌بندی‌شده: انتشار با Tag و Release، هماهنگی تغییرات توکن‌ها و کامپوننت‌ها، بررسی تغییرات و همگام‌سازی با Figma به‌عنوان منبع حقیقت.',
    levelIds: [17, 23, 24],
    prerequisiteTrackIds: ['core'],
    recommendedNextTrackIds: ['design-technologist', 'ai-prototype'],
    completionMessage: 'حالا می‌توانی Design System را مثل یک محصول نسخه‌بندی‌شده اداره کنی.',
  },
  {
    id: 'design-technologist',
    title: 'Design Technologist Advanced Track',
    shortTitle: 'Design Technologist',
    kind: 'optional',
    difficulty: 'پیشرفته',
    icon: 'ph-crown-simple',
    audience: 'Design Technologistها و طراحانی که عمیق‌تر با تیم مهندسی کار می‌کنند',
    description: 'مفاهیم پیشرفته و تخصصی: Issue و مدیریت کار، همکاری و دسترسی‌ها، امنیت، CI/CD و ابزارهای بازنویسی تاریخچه مثل Rebase و Cherry-pick و نگاهی به درون Git. برای پایهٔ دوره لازم نیست، ولی مهارت تیمی را کامل می‌کند.',
    levelIds: [18, 19, 20, 25, 27, 28, 29],
    prerequisiteTrackIds: ['core'],
    recommendedNextTrackIds: [],
    completionMessage: 'مسیر پیشرفته را هم کامل کردی؛ مجموعهٔ مهارت‌هایت کامل است.',
  },
];

export const TRACK_BY_ID = TRACKS.reduce((m, t) => { m[t.id] = t; return m; }, {});

/** Primary (single-ownership) track that a given level belongs to, or null. */
export const trackOfLevel = (levelId) => TRACKS.find(t => t.levelIds.includes(levelId)) || null;
