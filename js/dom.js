export const $ = (s) => document.querySelector(s);
// Numerals stay Latin in both languages. IRANYekanX's Persian figures are
// noticeably lighter and narrower than its letters, so at display sizes the
// numbers read as weaker than the words around them — the opposite of what a
// stat block is for. Terminology is untouched: Git terms stay English and
// Persian prose stays Persian. The helper is kept (a dozen call sites) so the
// decision lives in one place and can be reversed in one line.
export const FA = (n) => String(n);
