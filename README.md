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

## Intended audience

- product designers
- design technologists
- designers collaborating with developers
- designers working with AI-generated prototypes
- design-system contributors

## Features

- **30 curriculum levels** (in both languages) with lessons, copyable Git command examples, and a short quiz at the end of each level (a level unlocks after passing the previous quiz at ≥70%).
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
- **Hash-based routing** (`#/level-<id>`, `#/tracks`, `#/track-<id>`, `#/missions`, `#/mission-<id>`, `#/glossary`, `#/certificate`).
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

Actively developed. This is a **release-candidate quality pass**, not a released
product. See [`docs/public-readiness.md`](docs/public-readiness.md) for the
current readiness assessment and known limitations, and [`docs/`](docs/) for the
curriculum audit, curriculum map, and learning-experience design notes.

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
