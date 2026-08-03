/**
 * Bilingual architecture core (Phase 5A).
 *
 * Owns the UI language state, the shell string catalog, and how lang/dir are
 * applied to the document. Persian (fa) is the complete default locale; English
 * (en) currently covers the application SHELL only (navigation, controls,
 * dialogs). Curriculum content (levels, quizzes, scenarios, missions, glossary)
 * remains Persian-only until the content-translation phase; in English mode the
 * content region is marked lang="fa" dir="rtl" for correct bidi/AT behavior and
 * a notice explains the situation.
 *
 * Direction policy: document dir stays "rtl" in both UI languages for now —
 * the dominant content is Persian, and the layout CSS still uses some physical
 * left/right properties. Full LTR mirroring is scheduled with content
 * translation; because direction is applied centrally here, that change lands
 * in one place.
 *
 * The chosen language persists as an additive `lang` field ('fa' | 'en') in the
 * existing storage payload (key unchanged).
 */
import { state } from './state.js';

export const LANGS = ['fa', 'en'];

/** Shell string catalog. Every key must have both fa and en (validator-enforced). */
export const STRINGS = {
  'skip':            { fa: 'پرش به محتوای درس', en: 'Skip to lesson content' },
  'logo.title':      { fa: 'دورهٔ Git برای طراحان', en: 'Git for Designers' },
  'logo.sub':        { fa: '۳۰ سطح · آزمون و نشان مسیر', en: '30 levels · quizzes & achievement' },
  'rail.label':      { fa: 'فهرست دوره', en: 'Course navigation' },
  'rail.close':      { fa: 'بستن فهرست', en: 'Close navigation' },
  'xp.yours':        { fa: 'امتیاز تو', en: 'Your XP' },
  'search.ph':       { fa: 'جست‌وجو در سطح‌ها…', en: 'Search levels…' },
  'search.clear':    { fa: 'پاک‌کردن جست‌وجو', en: 'Clear search' },
  'reset.btn':       { fa: 'شروع دوبارهٔ دوره', en: 'Restart the course' },
  'modal.title':     { fa: 'شروع دوبارهٔ دوره؟', en: 'Restart the course?' },
  'modal.text':      { fa: 'با این کار همهٔ سطح‌های قبول‌شده و پیشرفت تو پاک می‌شود و دوره از سطح ۱ شروع می‌شود. این کار برگشت‌پذیر نیست.', en: 'This clears all passed levels and your progress; the course starts again from level 1. This cannot be undone.' },
  'modal.cancel':    { fa: 'انصراف', en: 'Cancel' },
  'modal.confirm':   { fa: 'بله، پاک کن', en: 'Yes, clear it' },
  'mob.prev':        { fa: 'سطح قبلی', en: 'Previous level' },
  'mob.next':        { fa: 'سطح بعدی', en: 'Next level' },
  'top.menu':        { fa: 'فهرست', en: 'Menu' },
  'top.theme':       { fa: 'حالت روشن و تیره', en: 'Light / dark theme' },
  'top.lang':        { fa: 'تغییر زبان رابط · English', en: 'Interface language · فارسی' },
  'top.totop':       { fa: 'بازگشت به بالا', en: 'Back to top' },
  'nav.intro':       { fa: 'معرفی دوره و شروع', en: 'Introduction & start' },
  'nav.tracks':      { fa: 'مسیرهای یادگیری', en: 'Learning tracks' },
  'nav.missions':    { fa: 'مأموریت‌های عملی', en: 'Practice missions' },
  'nav.glossary':    { fa: 'واژه‌نامهٔ Git', en: 'Git glossary' },
  'nav.achievement': { fa: 'نشان مسیر', en: 'Path achievement' },
  'author.role':     { fa: 'طراح محصول · تهیه‌کنندهٔ دوره', en: 'Product designer · course author' },
  'en.notice':       { fa: 'رابط به انگلیسی است ولی محتوای دوره فعلاً فقط فارسی است.', en: 'The interface is in English, but course content (lessons, quizzes, missions) is currently Persian-only. Content translation is planned.' },
};

export const getLang = () => (state.lang === 'en' ? 'en' : 'fa');

/** Translate a catalog key in the current UI language, falling back to fa. */
export function t(key) {
  const e = STRINGS[key];
  if (!e) return key;
  const lang = getLang();
  return (lang === 'en' && e.en) ? e.en : e.fa;
}

/** Apply the current language to the document: lang attr, data-lang hook,
 *  static [data-i18n*] shell nodes, the English-mode notice, and the
 *  Persian-content region marking. Idempotent. */
export function applyLang() {
  const lang = getLang();
  const doc = document.documentElement;
  doc.lang = lang;
  doc.dataset.lang = lang;
  // Direction stays rtl (dominant content is Persian) — see module docblock.
  doc.dir = 'rtl';

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.title = t('top.lang');

  // Curriculum region stays Persian: mark it for correct bidi/screen-reader
  // behavior while the shell is English; remove the marks in Persian mode.
  const root = document.getElementById('root');
  if (root) {
    if (lang === 'en') { root.setAttribute('lang', 'fa'); root.setAttribute('dir', 'rtl'); }
    else { root.removeAttribute('lang'); root.removeAttribute('dir'); }
  }
  const notice = document.getElementById('langNotice');
  if (notice) {
    if (lang === 'en') { notice.hidden = false; notice.textContent = t('en.notice'); }
    else { notice.hidden = true; notice.textContent = ''; }
  }
}

/** Switch the UI language; caller persists and re-renders. */
export function setLang(lang) {
  state.lang = LANGS.includes(lang) ? lang : 'fa';
  applyLang();
}
