# Git for Designers — دورهٔ تعاملی Git برای طراحان

<div dir="rtl">

یک دورهٔ تعاملی برای یادگیری Git، ساخته‌شده برای طراحان محصول،
Design Technologistها و طراحانی که با تیم توسعه، پروتوتایپ‌های ساخته‌شده با
هوش مصنوعی، و Design System کار می‌کنند.

> دوره به **فارسی (RTL)** و **انگلیسی (LTR)** در دسترس است و با یک دکمه در نوار
> بالا بین دو زبان جابه‌جا می‌شوی؛ پیشرفتت بین هر دو زبان مشترک است.
> دستورهای Git در هر دو زبان انگلیسی و چپ‌به‌راست می‌مانند.

</div>

## What this is

A browser-based, self-paced Git course available in **Persian (RTL) and English
(LTR)** — all 30 levels, quizzes, scenarios, glossary, tracks, and missions exist
in both languages, and progress is shared between them. It runs as a static site
— no backend, no accounts, no build step — and stores the learner's progress
locally in the browser.

## Why this exists — and what building it involved

I wanted to learn Git properly, as a product designer rather than as a
developer. The material I could find split into two useless halves: tutorials
written for engineers that assumed a terminal was already home, and
designer-facing posts that stopped at "commit means save". In Persian there was
essentially nothing. So the first version of this was notes to myself.

It stopped being notes when I added the quiz gate. Once a level could refuse to
let you continue, it was no longer a reference — it was a course, and it had to
work for someone who is not me.

**Decisions worth defending:**

- **No framework, no build step, no runtime dependencies.** Not minimalism for
  its own sake: a learning resource that needs `npm install` to survive is a
  resource that dies in two years. This one is HTML, CSS and ES modules, and it
  will still open in a browser long after any toolchain I picked today is gone.
- **Progress is gated, not suggested.** A level unlocks only after passing the
  previous quiz at 70%. It is the one genuinely opinionated decision in the
  product, and the reason people finish it.
- **Missions award no XP.** They are optional practice; paying XP for them would
  turn an optional path into a compulsory grind and quietly break the rank
  ladder that the required track defines.
- **Persian and English share one behavioural source of truth.** The Persian
  data modules define structure; English carries text only. Adding a language
  can never fork the logic, because there is no logic to fork.
- **Commands never mirror.** The interface flips between RTL and LTR using CSS
  logical properties, but every Git command is explicitly `dir="ltr"`. Without
  that, punctuation reorders inside Persian text and the course teaches the
  wrong command. The `#/system` page documents this rule.

**What I got wrong, and fixed:**

- Storing progress keyed on localized content made a refactor silently wipe
  completed missions. Stored IDs are now language-neutral and validated against
  the canonical data modules. It was caught by reproducing it in a real browser,
  not by reading the diff.
- The mission steps showed the Git command *above* the choices. In 14 of 20
  steps that command was the correct answer, so the missions had quietly become
  a matching exercise. The command is now the consequence of a correct decision.
- The skip link was white-on-near-white in dark theme — 1.13:1, on the first
  keyboard stop of every page. Theme inversion had been applied to the token but
  not to the one component that hardcoded its text colour.

**Known limits:** no screen-reader session or cross-browser testing has been
performed; there is no `h1` yet; and both locales load eagerly.
See [`docs/release-candidate.md`](docs/release-candidate.md) for the full,
honest accounting.

## Intended audience

- product designers
- design technologists
- designers collaborating with developers
- designers working with AI-generated prototypes
- design-system contributors

## Features

- **30 levels** (in both languages) with lessons, copyable Git command examples, and a short quiz at the end of each level (a level unlocks after passing the previous quiz at ≥70%). Coverage includes the designer-specific corners that general Git material skips: binary assets and **Git LFS**, `.gitattributes` and line-ending normalisation, and why a **pre-commit hook** rejected your commit.
- **Four learning tracks** — a required **Core** path plus three optional specialized tracks (AI & Prototype, Design System, Design Technologist). Track progress is derived from completed levels.
- **Guided practice missions** — optional, multi-step decision scenarios with explanatory feedback for every choice, hints, and retry. Missions simulate Git commands for teaching; **nothing is executed** on your machine.
- **Glossary** of Git/GitHub terms.
- **XP, badges, and ranks**, and a **path achievement** with a personalized achievement card you can export as a PNG image.
- **Bilingual (fa/en)** — switch the language from the topbar; the layout mirrors between RTL and LTR, and the same completed levels, missions, XP, badges, and achievement carry across both languages. Language choice is stored locally.
- **Light and dark themes**, and locally hosted fonts and icons (no external asset requests at runtime).

## Privacy

<div dir="rtl">

- پیشرفت تو فقط در **همین مرورگر** (localStorage) ذخیره می‌شود.
- هیچ **حسابی** لازم نیست و هیچ داده‌ای **جایی آپلود نمی‌شود**.
- پیشرفت به‌طور خودکار **همگام‌سازی نمی‌شود**؛ پاک‌کردن دادهٔ مرورگر می‌تواند آن را حذف کند.
- این برنامه **آنالیتیکس، ردیاب، یا جمع‌آوری ایمیل/شماره** ندارد.

</div>

At runtime the application makes no network requests (verified by review): all
fonts and icons are served locally, and there is no analytics, tracking, or
progress upload. Learner state lives only in `localStorage` under a single key.

## Architecture

- Static **HTML + CSS + native JavaScript ES modules** — no framework and no required build step.
- **No runtime package dependencies.**
- **Hash-based routing** (`#/level-<id>`, `#/tracks`, `#/track-<id>`, `#/missions`, `#/mission-<id>`, `#/glossary`, `#/certificate`, `#/system`).
- **`#/system` documents the design system from the live CSS** — the colour ramp, type scale, spacing tokens and the RTL/LTR rules are read from computed styles at render time, so the page cannot drift from the stylesheets.
- Content lives in `data/` (levels, scenarios, glossary, tracks, missions, badges, ranks, phases); rendering and app logic in `js/`; styles in `styles/`; local fonts and icons in `assets/`.

## Run locally

No build is needed. Serve the repository root with any static file server, for example:

```bash
# Python (built in)
python3 -m http.server 8000

# or Node's http-server
npx http-server -p 8000 -c-1
```

Then open `http://localhost:8000/`. Opening `index.html` directly via `file://`
may not work because ES modules require an HTTP origin.

The app also works when hosted from a repository subpath (all asset and route
references are relative).

## Validate locally

A dependency-free validator checks the repository's content invariants (30
levels, quiz indices, scenario/glossary integrity, four tracks, mission
integrity, content routes, reward IDs):

```bash
node scripts/validate.mjs
```

To syntax-check every JavaScript file:

```bash
find . -path ./.git -prune -o -name '*.js' -print0 | xargs -0 -n1 node --check
```

These are the same checks run in CI (`.github/workflows/validate.yml`) on pull
requests to `main`.

## Project status

Actively developed. This is a **release candidate**, not a released product —
nothing has been deployed. See
[`docs/release-candidate.md`](docs/release-candidate.md) for the current
go/no-go assessment, what was verified and how, and the open items;
[`docs/public-readiness.md`](docs/public-readiness.md) for the earlier quality
report; and [`docs/`](docs/) for the curriculum audit, curriculum map, and
learning-experience design notes.

A public launch is currently blocked on three decisions that belong to the
repository owner: the **software license**, the **hosting target**, and the
resulting **production URL** (which enables `canonical`/`og:url`).

## Current non-goals

No third language, no backend, no accounts, no cloud sync, no analytics, no
translation service, and no real Git execution. See
[`docs/english-content.md`](docs/english-content.md) for the bilingual content
architecture and its known limitations (notably: static page metadata is Persian
for crawlers that do not run JavaScript).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short: keep the static,
no-framework, no-external-dependency architecture; preserve Persian RTL and
LTR Git commands; run `node scripts/validate.mjs` before opening a pull request.

## License and third-party notices

No software license file is present yet, so reuse rights have not been granted;
adding a license is a decision for the repository owner. Third-party assets keep
their own licenses — the Phosphor icon set is MIT-licensed (see
`assets/icons/phosphor/LICENSE`). The IRANYekanX font in `assets/fonts/` is used
under its own license terms.

## Author

Created by پریا بهرامی — [paryabahrami.ir](https://paryabahrami.ir) ·
[LinkedIn](https://www.linkedin.com/in/paryabhrmi).
