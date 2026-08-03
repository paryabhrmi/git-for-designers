# English Content (Phase 5B)

Phase 5A built the bilingual *shell*. Phase 5B delivers the complete **English
learning experience**: all 30 levels, every quiz, scenario, glossary entry,
track, mission, badge, rank, and the achievement experience — plus full LTR
layout support — while the Persian product stays intact.

## Scope

| Area | Persian | English |
| --- | ---: | ---: |
| Levels (title, subtitle, body) | 30 | 30 |
| Level quiz questions | 166 | 166 |
| Scenario practice questions | 9 | 9 |
| Glossary entries | 72 | 72 |
| Learning tracks | 4 | 4 |
| Guided missions | 4 | 4 |
| Mission steps | 20 | 20 |
| Mission choices | 60 | 60 |
| Badges | 11 | 11 |
| Ranks | 6 | 6 |
| Phases | 4 | 4 |

## Locale content architecture

**Persian data modules stay the structural and behavioral source of truth.**
`data/levels.js`, `scenarios.js`, `glossary.js`, `tracks.js`, `missions.js`,
`badges.js`, `ranks.js`, `phases.js` continue to own IDs, ordering, correct
answer indexes, choice tones, `commandPreview` strings, branch names, level
membership, prerequisites, XP thresholds, and badge eligibility closures.

**English modules carry text only:**

```
data/en/
  levels.js      barrel → EN_LEVELS (30)
  levels-1.js    levels 1–10   (id, title, subtitle, body, quiz[{q,o,why}])
  levels-2.js    levels 11–20
  levels-3.js    levels 21–30
  content.js     EN_SCENARIO, EN_GLOSSARY, EN_TRACKS, EN_MISSIONS,
                 EN_BADGES, EN_RANKS, EN_PHASES
```

English objects deliberately **omit** `a` (correct index), `tone`, `correct`,
`commandPreview`, `branch`, `levelIds`, `trackId`, `icon`, and thresholds — those
can never diverge between locales because they exist only once.

**`js/content.js` is the merge hub.** It merges the selected locale's text over
the shared structure and exports stable collections (`LEVELS`, `PHASES`,
`GLOSSARY`, `TRACKS`, `TRACK_BY_ID`, `MISSIONS`, `MISSION_BY_ID`, `BADGES`,
`RANKS`, plus `earned`, `rankOf`, `trackOfLevel`, `missionsForTrack`). Arrays are
mutated in place, so every consumer keeps one reference across language switches.
`applyContentLocale(lang)` is idempotent and runs from `i18n.setLang()` before
each render.

UI chrome (navigation, buttons, dialogs, feedback headings, progress labels,
error and empty states, accessibility labels) lives in the Phase 5A `STRINGS`
catalog in `js/i18n.js` and is read through `t(key)`.

## Stable shared IDs

Language never changes identity. Level IDs `1–30`, track IDs (`core`,
`ai-prototype`, `design-system`, `design-technologist`), mission IDs
(`core-ship-change`, `ai-safe-checkpoint`, `ds-token-conflict`,
`dt-clean-branch`), step IDs, choice IDs, and badge IDs are identical in both
locales. Routes are language-neutral (`#/level-8`, `#/track-core`,
`#/mission-ds-token-conflict`), so a link shared by a Persian learner opens the
same content for an English learner.

## Storage and shared progress

Storage key is unchanged: **`git-course-fa-v3`**. Progress is keyed by content
IDs only — `done` (level IDs), `missionsDone` (mission IDs), `tries`, `learner`,
plus the `lang` preference added in Phase 5A. There is **no separate English
progress tree**: a level passed in Persian is passed in English, XP and badges
are computed once from the same data, and achievement eligibility (all 30 levels)
is shared. Switching language never rewrites stored IDs and never revokes an
earned badge or achievement.

## Terminology guide (English)

Git · GitHub · repository · working tree · staging area (the index) · commit ·
branch · local branch · remote · remote repository · remote-tracking reference
(`origin/main`) · clone · stage / unstage · push · fetch · pull · merge · rebase
· cherry-pick · restore · reset · revert · conflict · conflict marker ·
Pull Request · branch protection · status check · shared history · local history.

Rules applied throughout: Git and GitHub stay distinct; a Pull Request is a
platform feature, never a Git command; `restore`, `reset`, and `revert` are never
collapsed into "undo"; "remote-tracking reference" is not replaced by "remote
branch"; a private repository is never described as automatically secure;
secrets are never recommended for committed storage; AI-generated code is never
described as automatically correct. Git commands, flags, paths, and code are
untranslated and rendered LTR in both languages.

Technical claims were verified against primary sources only:
[git-scm.com/docs](https://git-scm.com/docs),
[git-scm.com/book](https://git-scm.com/book),
[docs.github.com](https://docs.github.com).

## Fallback policy

There is **no runtime fallback to Persian for required English content**. Every
English field is present, and the validator fails the build if any required
English string is empty, missing, contains a translation placeholder, or
contains Persian characters. `t()` retains a Persian fallback for UI keys as a
crash-safety net only; the validator independently proves every catalog key has
both `fa` and `en`, so the fallback can never silently mask incomplete work.

Two intentional cross-language strings exist and are allowlisted in the
validator: the language switcher names the other language in its own script
(`English` ↔ `فارسی`), which is standard practice for a language selector.

In English mode the glossary hides the Persian equivalent and pronunciation
fields (`fa`, `p`) — they are Persian-learner aids with no meaning for an
English reader — and shows the English term and definition instead.

## Direction handling (RTL/LTR)

Phase 5A pinned `dir="rtl"` for both languages because the layout was authored
RTL-first. Phase 5B completes mirroring, so `applyLang()` now sets
`dir="ltr"` for English and `dir="rtl"` for Persian.

- Direction-dependent CSS was migrated to logical properties across
  `layout.css`, `components.css`, `lesson.css`, `quiz.css`, `responsive.css`,
  and `achievement.css`: `inset-inline-start/end`, `margin-inline-*`,
  `padding-inline-*`, `border-inline-*`, `text-align: start/end`, `inset-inline`.
- Hard-coded `direction: rtl` was removed from reusable components (quiz items,
  options, explanations, glossary items) so they inherit the document direction.
- Cases logical properties cannot express are handled by explicit LTR rules at
  the end of `responsive.css`: the mobile drawer's slide transform and shadow,
  and mirroring for directional arrow/caret icons only (brand and
  non-directional icons are untouched).
- Persian strings baked into CSS `::after content` (`پاسخ درست`, `انتخاب تو`,
  `بی‌پاسخ`) get `html[lang="en"]` overrides.
- Code stays LTR in both languages: `pre` keeps `direction: ltr; text-align:
  left`, and inline `code` is `unicode-bidi: isolate`.

## Achievement export

Canvas does **not** inherit CSS direction, so `js/achievement-export.js` sets it
explicitly per locale: `ctx.direction` follows the language, meta-cell text
aligns to the inline-start edge and anchors to the correct side, the font stack
switches (IRANYekanX for Persian, system sans for English), and the disclaimer
comes from the string catalog. Export remains fully local — no network request,
no third-party library — and eligibility is shared, so switching language before
exporting never changes who is eligible.

## Language-switch behavior

The switch is a topbar control labeled with the target language endonym. On
switch: `state.lang` updates and persists, `applyContentLocale()` re-merges the
locale text, `applyLang()` updates `html lang`/`dir` and the static shell nodes,
and the current view re-renders. The **route is preserved** — the same level,
track, or mission stays open — and completion, XP, badges, rank, and achievement
eligibility are untouched. An unsubmitted quiz selection or mission step choice
is transient UI state and is re-rendered fresh; no completed progress is lost.

## Accessibility expectations

`html lang` and `dir` always match the active language. The language control is
a real keyboard-accessible button with an accessible name, labeled by language
name (not a flag). Feedback keeps icon + text (never color alone), progress bars
keep accessible names and values, decorative icons stay `aria-hidden`, and Git
commands stay LTR inside both layouts. Phase 4's accessibility baseline (WCAG 2.2
AA as an engineering target, not a certified conformance claim) is unchanged.

## Validation

```bash
node scripts/validate.mjs                                   # includes locale parity
find . -path ./.git -prune -o -name '*.js' -print0 | xargs -0 -n1 node --check
```

The validator additionally checks: identical level counts, IDs, and order across
locales; quiz counts and per-question option counts; scenario keys and lengths;
glossary length; track/mission/step/choice ID equality; badge, rank, and phase
counts; every required English string non-empty; no translation placeholders; and
no Persian characters leaking into English content or catalog values.

## Known limitations

- English metadata in `index.html` (`<title>`, description, Open Graph) is
  static Persian at load time. Runtime switching updates the document title, but
  crawlers that do not execute JavaScript see the Persian metadata. Localized
  static metadata would require per-language HTML entry points or a build step —
  both out of scope for a no-build static app.
- No canonical or `og:url` metadata: there is still no verified production URL.
- English typography uses a system sans stack (the bundled IRANYekanX is a
  Persian face); no external font was added.

## Non-goals (unchanged)

No third language, no translation API or runtime translation service, no
user-submitted translations, no separate English progress, no duplicate XP or
badge systems, no backend, accounts, cloud sync, analytics, or tracking, no new
levels, tracks, or missions, and no external runtime dependency.
