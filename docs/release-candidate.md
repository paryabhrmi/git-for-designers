# Release Candidate Review — Phase 6

> **Status: superseded.** This is the Phase 6 release-candidate assessment, kept
> as a record of what was checked and when. The product has since shipped as
> [**v1.0.0**](https://github.com/paryabhrmi/git-for-designers/releases/tag/v1.0.0) and is live at <https://paryabhrmi.github.io/git-for-designers/>. Statements below about nothing
> being deployed, or about the licence, host and URL being undecided, were true
> when written and are no longer. The *Post-release-candidate update* section at
> the end of this file lists exactly what changed.

**Branch:** `claude/git-designers-curriculum-review-ztwe5f` · **Base:** `origin/main` at `42c9c95` (merge of PR #15)
**Environment:** Linux container, Node v22.22.2, Chromium 1194 (Playwright-driven), local static server.
**Date context:** 2026-08-04.

Phase 6 re-verified the merged product end to end, fixed the accessibility
defects it found, and assesses launch readiness. Only checks that were actually
executed are reported as run. This document does **not** declare the product
released, and nothing was deployed.

---

## Scope

Release-candidate verification of `main` as merged: startup and failure modes,
routing, the full quiz learning loop, missions, progress persistence across a
language switch, theme persistence, reset isolation, achievement export,
accessibility (contrast, names, headings, focus, reflow), runtime payload,
subpath hosting, and an editorial pass over the English corpus.

## What was verified, and how

| Area | Checks actually run | Result |
|---|---|---|
| Repository invariants | `node scripts/validate.mjs` | pass — 30 levels, 4 tracks, 4 missions, 11 badges, 72 glossary, fa+en parity |
| JavaScript syntax | `node --check` on all 37 `.js` files | pass |
| Startup | fresh storage, both locales; `html lang`/`dir` correctness | pass, zero console errors |
| Routing | all 15 route families × 2 locales | 15/15 render in both |
| Invalid routes | `#/level-999`, `#/track-nope`, `#/mission-nope`, `#/garbage`, `#/level-abc`, `#/../../etc/passwd` | 6/6 fall back safely |
| Quiz loop | levels 1 (fa+en), 15 (fa), 30 (en) answered correctly end to end; level 1 answered **wrongly** as a control | pass/fail graded correctly, XP + perfect-score + gate + badge + persistence all correct; wrong answers persisted nothing |
| Missions | full mission played to completion | recorded once; **no XP awarded** (4500 → 4500), as designed |
| Language switch | fa→en→fa mid-session with progress present | `lang`/`dir` flip correctly; 2 levels and 2 missions survive the round trip |
| Theme | toggle, then reload without re-seeding storage | persists (`dark` → reload → `dark`) |
| Reset | with an unrelated `localStorage` key present | unrelated key survives; progress cleared |
| Achievement export | real download captured and inspected, both locales | 4 valid PNGs: 1080×1080 (209/217 KB) and 1080×1920 (305/312 KB) |
| Corrupt storage | absent key, malformed JSON, wrong-typed fields, junk level keys | all start cleanly, zero errors |
| Accessibility | 2 locales × 2 themes × 4 widths × 8 views = **128 combinations** | see findings below |
| Reflow / overflow | 320 px, 390 px, 640 px (≈200 % zoom), 1280 px | **no horizontal overflow in any of the 128 combinations** |
| Runtime payload | measured in-browser | 59 requests, ~1.83 MB uncompressed; **zero external requests** |
| Subpath hosting | served from `/git-for-designers/` and exercised | all routes render, all assets resolve, zero failed requests |
| English corpus | mechanical scan of 1671 strings | no genuine language errors (see below) |

## Findings

| # | Finding | Priority | Resolution |
|---|---|---|---|
| 1 | **Skip link unreadable in dark theme.** `.skip` paints `#fff` on `var(--accent)`, which inverts to near-white (`#F0F1F2`) in dark theme — measured **1.13:1**. It is the first keyboard stop on every view, so a keyboard or screen-reader user in dark mode met a blank pill. | **P1** | **Fixed** — `[data-theme="dark"] .skip{color:#0B0C0E;}` in `styles/tokens.css`, matching the existing `.btn-primary` dark-theme pattern. Re-measured: readable in both themes (screenshot-verified). |
| 2 | **Search field had no visible focus indicator.** `.rail-search input` sets `outline:none`, which outranks the global `:focus-visible` ring on specificity; `:focus` changed only the border colour. Confirmed by real <kbd>Tab</kbd> traversal. | **P2** | **Fixed** — `.rail-search input:focus-visible` restores the 2.5 px accent ring in `styles/layout.css`. Tab traversal now shows **0** stops without an indicator. |
| 3 | **Active navigation label below AA contrast.** `.nav-item.active .nav-lb` painted the phase colour as text over a 16 % tint of the same colour — **2.87:1** on the tinted background for late-phase colours (needs 4.5:1 at 13.5 px bold). Darkening `--p4` cannot fix this: the tint darkens in lockstep. | **P2** | **Fixed** — the phase colour stays as the tinted background (still the active signal); the label uses `var(--rail-ink)`. This mirrors what the dark theme already did for the same rule, so the two themes are now consistent. |
| 4 | **Skipped heading level.** The command simulator's three column headings were `<h5>` directly under body `<h3>`s, producing an h3→h5 jump on every level that renders the simulator. | **P3** | **Fixed** — simulator columns are now `<h4>`; the CSS rule is scoped through `.sim-cols` so the lesson-body `h4` rules (including the responsive override) cannot win the cascade. Audit now reports **no skipped heading levels**; rendering is visually unchanged. |
| 5 | **Level 3's English title was a literal translation.** «ساخت و دریافت Repository» became "Creating and getting a Repository"; the lesson itself teaches `git init` versus `git clone`. | **P3** | **Fixed** — "Creating and **cloning** a Repository". This is the only content change in this phase. |
| 6 | **No `<h1>` on any view.** Headings start at `h2`; automated tools flag this and screen-reader users cannot jump to a page heading. | **P3 — documented, not fixed** | Fixing it correctly means promoting each view's top heading to `h1` **and** renumbering **330** section headings across both locales (165 fa + 165 en). A content-wide rewrite during release hardening carries more risk than the advisory benefit. Recorded as the top post-launch accessibility item. |
| 7 | **~20.5 MB of the 24 MB icon asset tree is never loaded at runtime.** `selection.json` (8.6 MB) is an IcoMoon project file referenced nowhere in the repository. The `.svg` (10.0 MB) and `.ttf` (1.9 MB) font files appear only as legacy `@font-face` fallbacks after `woff2`/`woff`, which every targeted browser uses. | **P3 — documented, not fixed** | This edits vendored third-party assets, which is an owner decision. Recommended cleanup, in order of safety: delete the four `selection.json` files (unreferenced, zero risk); then optionally drop the `.ttf`/`.svg` sources and files. Repository clone size would fall from ~24 MB to ~3.5 MB with no runtime change. |

**P0 findings: none.** Finding 1 is the most serious defect this phase found and
is fixed.

### Reported, then disproven (not defects)

Recording these so they are not "rediscovered" later:

- **Copy-button contrast (1.57:1).** The audit's background heuristic walks
  *ancestors*; the copy button is absolutely positioned over a sibling `<pre>`.
  Measured against its true background it is **10.43:1** (light) and **11.33:1**
  (dark). No defect.
- **"Theme lost on reload".** The harness re-seeded `localStorage` on every
  navigation via `addInitScript`. Seeding once and reloading shows the theme
  persists correctly.
- **"Achievement export produces no canvas".** The exporter builds an off-DOM
  canvas (`achievement-export.js:308`) and hands it to `toBlob`, so it is never
  in the document. Capturing the real download yields four valid PNGs.
- **English scan hits.** All flagged "space before punctuation", "doubled word",
  and "a/an" items are artifacts of stripping inline `<code>`/table markup, and
  every flagged lowercase `git` is a deliberately wrong command in a quiz
  distractor. The mixed straight/typographic apostrophes are a cosmetic
  inconsistency, not an error; no straight apostrophe occurs inside a `<code>`
  block, so a future sweep would be safe but was not imposed on the author's
  voice.

## Accessibility status

Baseline: WCAG 2.2 AA as an engineering target. **Full conformance is not
claimed** — no certified audit and no real screen-reader session were performed.

After the fixes, across all 128 locale × theme × width × view combinations:

- contrast below AA: **none** (the single remaining report is the disproven copy-button false positive)
- interactive elements without an accessible name: **none**
- images without `alt`: **none**
- skipped heading levels: **none**
- horizontal overflow: **none**
- keyboard stops without a visible focus indicator: **none** (22 stops sampled on the lesson view)
- landmarks present: `main`, `header`, `aside`, 2 × `nav`; 2 live regions
- **known gap:** no `h1` (finding 6)

## Performance and payload

Measured in-browser on the lesson view, both locales (identical):

- **59 requests, ~1.83 MB uncompressed** — JS 604 KB, fonts 650 KB, CSS 555 KB, images 15 KB.
- **Zero external requests.** No analytics, trackers, remote fonts, or CDN assets.
- Measured against a local server that sends **no compression**. The CSS and JS
  are highly repetitive and compress well; a host with gzip/brotli will transfer
  far less. No compressed figure is claimed because none was measured.
- Both locales load eagerly (`data/en` 191 KB alongside `data/levels.js` 187 KB);
  there is no lazy loading. Acceptable at this size, noted as future work.
- No Lighthouse run was performed, so no score is claimed.

## Deployment readiness

The application is **deployment-neutral and verified as such**: it was served
from a repository subpath (`/git-for-designers/`) and every route rendered with
all assets resolving and zero failed requests. All references are relative, so it
works at a domain root or a subpath.

Host-neutral requirements for whichever host is chosen:

1. Static file hosting; **no build step and no server runtime** are required.
2. Serve `index.html` at the chosen path; `.js`, `.css`, `.woff2` must be served
   with correct MIME types (ES modules are rejected under the wrong `Content-Type`).
3. HTTPS, so `navigator.share` and clipboard actions on the achievement card work.
4. Compression (gzip/brotli) enabled — this is where the payload figure above improves.
5. No SPA rewrite rules are needed: routing is hash-based, so every URL is `index.html`.

**No host was selected and nothing was deployed** — that is an owner decision.

## Launch blockers — owner decisions required

These are the only items standing between this release candidate and a public
launch. Each is deliberately left open because it is not mine to decide:

1. **Software license.** No `LICENSE` file exists, so **no reuse rights are
   granted** and the work is all-rights-reserved by default. A public course
   repository almost certainly wants an explicit licence (content and code may
   warrant different ones). Requires the owner's authorization.
2. **Hosting target.** No deployment configuration exists. Any static host
   meeting the five requirements above will work.
3. **Production URL.** Until a host and URL exist, `canonical` and `og:url` are
   correctly absent — inventing them would be wrong. Once the URL is known, add
   both, and optionally a social-preview image (no repository-owned image exists
   today).

## Known limitations

- Persian remains the static page metadata language for crawlers that do not run JavaScript.
- No `h1` (finding 6); no certified audit or real screen-reader session.
- **Single-browser automated QA.** Only Chromium is installed in this
  environment — there is no Firefox or WebKit engine available, so cross-browser
  verification cannot be performed here at all, by any means. It remains a
  genuine, unclosable gap in this environment.
- No native-speaker editorial read of the English prose; the mechanical scan found no errors but is not a substitute.
- No real mobile-device testing (emulated widths only).
- No compressed-transfer or Lighthouse measurements.
- Repository clone size is ~24 MB because of unused vendored icon formats (finding 7).

## Release recommendation

**Go for controlled launch, conditional on the three owner decisions above.**

The product itself is release-candidate ready: every learning journey was
verified end to end in both locales, no P0 exists, the one P1 (an invisible skip
link in dark theme) is fixed and re-verified, and the remaining open items are
documented, non-blocking, and post-launch. The launch cannot proceed on
engineering grounds alone — it is gated on a licence, a host, and a URL, none of
which this review is authorized to choose.

---

# Post-release-candidate update — 2026-08-04

Recorded so this document does not keep describing items that are now closed.

**Closed since the assessment above:**

| Was | Now |
|---|---|
| Finding 6 — no `h1` on any view | **Fixed.** Every view has exactly one `h1` and the outline has no skipped levels. Rather than a hidden heading, 336 curriculum headings were shifted a level in both locales so the structure is genuinely correct. |
| Finding 7 — ~20.5 MB of unused vendored icon formats | **Fixed** in an earlier pass; the repository is ~11 MB. |
| Launch blocker 1 — software licence | **Settled: MIT.** `LICENSE` at the root; third-party assets keep their own terms. |
| Launch blocker 2 — hosting target | **Settled: GitHub Pages**, served from `main` with `.nojekyll`, no build step. |
| Launch blocker 3 — production URL | **Settled: https://paryabhrmi.github.io/git-for-designers/.** `canonical` and `og:url` are published in `index.html`. |
| Known limitation — both locales load eagerly | **Fixed.** The inactive locale is fetched on demand: Persian startup JS 631 KB → 435 KB, with zero `data/en` requests. |

**Found and fixed after the assessment:** the completed-level tick in the
sidebar painted a hardcoded white glyph on `var(--pc)` and measured **1.13:1 in
dark theme** — the same failure class as the skip link, missed by the automated
audit because an icon-font glyph has no text node to measure. Both now derive
their colour from `var(--paper)` and pass in either theme.

**Still open, unchanged:** no screen-reader session and no cross-browser
verification (only Chromium is available in this environment — this gap cannot be
closed here by any means); no native-speaker editorial read of the English prose;
static page metadata stays Persian for non-JavaScript crawlers; and the
achievement card's rank accents remain the one place the interface leaves its
monochrome palette.

**Deployment verified before release:** the exact committed tree was exported and
served from a Pages-style subpath. All 11 route families rendered in both
locales, every font and image loaded, and there were zero failed requests and
zero console errors.
