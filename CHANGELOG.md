# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-08-04

First public release. An interactive, practice-first Git handbook for product
designers and design technologists, in Persian (RTL) and English (LTR), running
as a static site with no build step and no runtime dependencies.

### Learning content

- **30 levels** in both languages, each with a lesson, copyable Git command
  examples and a closing quiz. A level unlocks only after the previous quiz is
  passed at 70% or better.
- **169 quiz questions** and **9 scenarios**, with a written explanation for
  every question.
- **Four learning tracks** — a required Core path plus three optional
  specialisations (AI & Prototype, Design System, Design Technologist). Track
  progress is derived from completed levels, never tracked separately.
- **Four guided practice missions** (20 steps, 60 choices) with explanatory
  feedback for every choice, hints and retry. Missions simulate Git commands for
  teaching; nothing is executed on your machine. They award no XP by design, so
  optional practice never becomes a compulsory grind.
- **75-term glossary**, cross-linked to the level that introduces each term.
- Designer-specific coverage that general Git material skips: binary assets and
  **Git LFS**, `.gitattributes` and line-ending normalisation, and why a
  **pre-commit hook** rejected your commit.

### Product

- **XP, 11 badges and 6 ranks**, plus a path achievement with a personalised
  card exportable as a PNG in square and story formats.
- **Bilingual with shared progress** — the same completed levels, missions, XP,
  badges and achievement carry across both languages, because progress is keyed
  by ID and never by language.
- **Light and dark themes**, both persisted.
- **A design-system page** at `#/system` that documents the monochrome ramp,
  type and spacing scales and the bidirectionality rules by reading the live
  computed styles, so it cannot drift from the stylesheets.
- Full-text search across the curriculum.

### Privacy

- Progress is stored only in this browser's `localStorage`, under one key.
- No account, no backend, no cloud sync, no analytics, no tracking, and **no
  network requests at runtime** — fonts and icons are served locally.
- Reset clears only this application's key; unrelated keys on the same origin
  are left untouched.

### Accessibility

WCAG 2.2 AA is the engineering target; **full conformance is not claimed**, as no
certified audit or screen-reader session has been performed.

- Exactly one `h1` per view, with a correct heading outline throughout.
- No contrast failures, no missing accessible names, no skipped heading levels
  and no horizontal overflow, verified across both locales, both themes, four
  viewport widths and nine views.
- Every interactive control is a real button, link or input; quiz options are
  labelled radio inputs in a group, and results are announced in an `aria-live`
  region.
- A visible focus indicator on every keyboard stop.

### Engineering

- Static HTML, CSS and native ES modules. No framework, no build step, no
  runtime package dependencies.
- Hash-based routing, so every URL is `index.html` and deep links survive a
  refresh without server rewrite rules.
- All references are relative, so the site works from a domain root or a
  repository subpath.
- The inactive locale is loaded on demand: a Persian reader downloads 435 KB of
  JavaScript instead of 631 KB and makes no request for the English text.
- A dependency-free validator (`scripts/validate.mjs`) enforces the content
  invariants, run in CI on every pull request.

### Known limitations

- No screen-reader session and no cross-browser verification — only Chromium was
  available in the build environment, so Firefox and Safari are genuinely
  unverified.
- Static page metadata stays Persian for crawlers that do not execute
  JavaScript; `document.title` is correct per route once the app runs.
- No native-speaker editorial read of the English prose.
- The achievement card's rank accents are the one place the interface leaves its
  monochrome palette.

[1.0.0]: https://github.com/paryabhrmi/git-for-designers/releases/tag/v1.0.0
