# Bilingual Architecture (Phase 5A)

Phase 5A introduces the **infrastructure** for a Persian/English product. It does
**not** translate curriculum content — lessons, quizzes, scenarios, missions,
and the glossary remain Persian-only until the content-translation phase (5B).

## What shipped

- **`js/i18n.js`** — the single owner of UI-language behavior:
  - `STRINGS`: shell string catalog, every key with both `fa` and `en`
    (validator-enforced parity).
  - `t(key)`: lookup in the current language with Persian fallback.
  - `getLang()` / `setLang()`: language state (`state.lang`, `'fa' | 'en'`).
  - `applyLang()`: idempotent application to the document — `html lang`,
    `data-lang`, all static `[data-i18n]` / `[data-i18n-ph]` / `[data-i18n-aria]`
    shell nodes, the English-mode notice, and the Persian-content region marks.
- **Language toggle** — a `ph-translate` button in the topbar; switching
  persists and re-renders.
- **Persistence** — additive `lang` field in the existing storage payload (key
  `git-course-fa-v3` unchanged). Legacy payloads without `lang` load as `fa`;
  invalid values fall back to `fa`. Reset keeps the language preference (it is a
  UI preference, like theme).
- **Migrated shell strings (~26 keys)** — skip link, logo, rail labels, XP
  label, search, reset button, confirm dialog, mobile/topbar control labels, the
  five special navigation entries, author role line, English-mode notice.

## Direction policy (deliberate)

`dir` stays **`rtl` in both UI languages** for now: the dominant page content is
Persian, and parts of the layout CSS still use physical left/right properties.
In English mode the shell strings are English inside the RTL layout (browsers
handle per-run bidi correctly), the content region `#root` is marked
`lang="fa" dir="rtl"`, and a visible notice explains that content is
Persian-only. Full LTR mirroring is scheduled with content translation (5B);
because direction is applied only in `applyLang()`, that change lands in one
place. The 5B prerequisite is migrating the remaining physical CSS properties
(~24 declarations across `layout/components/lesson/quiz/responsive.css`) to
logical properties.

## Accessibility model

- `html lang` always matches the UI language, so AT announces shell controls
  correctly.
- In English mode the Persian curriculum region carries `lang="fa" dir="rtl"`,
  keeping pronunciation and bidi correct for mixed content.
- The notice banner is plain text (`lang="en" dir="ltr"`), hidden in Persian
  mode via the `hidden` attribute.

## Pending migration (5B and later)

- Renderer-driven strings (lesson UI, quiz labels, toasts, track/mission views,
  achievement view, document titles) still Persian — migrate to `t()` keys as
  their views gain English content.
- Curriculum content translation (levels/quizzes/scenarios/missions/glossary) —
  a content model decision (parallel `en` fields vs. per-locale data modules)
  documented for 5B, not chosen here.
- LTR mirroring + logical-property CSS migration.
- English metadata (`<title>`, description, OG) once English content exists.

## Validation

`scripts/validate.mjs` now also checks the i18n catalog: `LANGS` defaults to
`fa` and includes `en`, and every catalog key has a non-empty string for every
language. Browser QA covered: default fa, toggle to en (shell strings, notice,
root marking, Persian content intact), reload persistence, legacy payload → fa,
toggle back, and console cleanliness.
