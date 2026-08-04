# Public Readiness — Phase 4 Quality Report

> **Status: superseded.** This is the Phase 4 quality report, kept as a record.
> The product has since shipped as [**v1.0.0**](https://github.com/paryabhrmi/git-for-designers/releases/tag/v1.0.0), live at <https://paryabhrmi.github.io/git-for-designers/> under
> the MIT licence. Statements below about nothing being deployed or about
> pending owner decisions were true when written. See
> [`release-candidate.md`](release-candidate.md) and
> [`design-review.md`](design-review.md) for what happened after.

**Branch:** `chore/public-readiness` · **Base:** `origin/main` after PR #11 (`e553489`)
**Environment:** Linux container, Node v22.22.2, Chromium 1194 (Playwright-driven), local static server (`http-server`).
**Date context:** 2026-08-03.

This report records what Phase 4 actually reviewed, what was found, what was
fixed, and what remains. Only checks that were actually executed are reported
as run.

---

## Scope

Phase 4 reviewed: application startup and error handling; routing and not-found
behavior; localStorage reliability and reset safety; level/quiz/scenario/
glossary/track/mission integrity; XP, badge, rank, and achievement behavior;
accessibility; responsive + RTL behavior; both themes; performance
characteristics; security; privacy; public metadata; asset/link integrity;
deployment readiness; repository documentation; validation tooling and CI.

## Acceptance criteria (release-candidate checklist)

- [x] Application starts without fatal errors (including with no/corrupt storage)
- [x] All major routes resolve (`intro`, `level`, `glossary`, `certificate`, `tracks`, `track`, `missions`, `mission`)
- [x] Unknown/malformed routes fail safely (level→intro, mission→hub, track→overview, garbage→intro)
- [x] All 30 level IDs remain valid and ordered
- [x] All four track IDs remain valid (`core`, `ai-prototype`, `design-system`, `design-technologist`)
- [x] All four mission IDs remain valid
- [x] Quizzes have valid answer indices; scenarios reference valid levels
- [x] Progress loads safely; malformed storage does not crash startup
- [x] Reset affects only this app's storage key (verified: unrelated key survives)
- [x] Mission completion cannot be duplicated; no reward can be farmed (missions award no XP)
- [x] Core completion remains compatible; optional tracks/missions stay optional
- [x] Achievement eligibility (`allPassed()` = all 30) and card export remain intact
- [x] Light and dark themes usable; theme persists from storage
- [x] Primary journeys keyboard-accessible (real buttons/links, visible `:focus-visible`)
- [x] No P0 or P1 finding remains open
- [x] No secret committed; no analytics/tracking; no external runtime dependency
- [x] Documentation matches actual behavior
- [x] CI validates repository invariants
- [x] Only actually-run checks are reported as passing

## Findings

| # | Finding | Priority | Area | Resolution | Evidence |
|---|---|---|---|---|---|
| 1 | `storage.load()` assigned `d.done`/`d.tries`/`d.learner` without type guards; a corrupted value (e.g. `done` stored as a string/array) survived the outer try/catch into runtime state and produced wrong behavior/derived-state errors | **P2** (robustness; not reproducible from normal app writes) | storage | **Fixed** — central sanitizer in `js/storage.js`: type-checks objects, drops non-integer level keys, normalizes `{perfect, score}`, clamps `tries` to positive integers, restricts `theme` to `light|dark` | Browser QA cases B/C/D: malformed JSON, string-typed `done`, junk keys — app starts cleanly, valid entries preserved (`۱ از ۳۰` kept from partial corruption) |
| 2 | No privacy note existed in-product despite fully-local data behavior | **P2** | privacy | **Fixed** — concise Persian privacy note added to the intro (`.privacy-note`), stating browser-local storage, no account, no upload | Renders on intro; verified in browser QA case A |
| 3 | No repository validator or CI existed — invariants (30 levels, quiz indices, track/mission integrity, route refs) were only checked ad hoc in past phases | **P2** | validation/CI | **Fixed** — dependency-free `scripts/validate.mjs` + `.github/workflows/validate.yml` (checkout@v7, setup-node@v7, minimal `contents: read`) | Validator exits 0 locally; CI YAML parsed; CI loop reproduced locally over 30 files |
| 4 | No README, CONTRIBUTING, SECURITY, or readiness documentation for a public repository | **P2** | documentation | **Fixed** — accurate README (features, privacy, run/validate instructions, status, license note), CONTRIBUTING (architecture constraints, stable IDs, validation), SECURITY (GitHub-based reporting, no invented contacts), this report | Files present in repo |
| 5 | Phosphor icon CSS is ~480 KB across four weights (largest asset class) | **P3** | performance | **Deferred** — subsetting third-party icon CSS risks breaking icons across all views for modest gain; all four weights are genuinely used | Size measurements below |
| 6 | No social-preview (og:image) asset exists | **P3** | metadata | **Deferred/documented** — no suitable repository-owned image exists; metadata remains valid without it; documented as optional work | No og:image tag added (correct) |
| 7 | No LICENSE file | **Owner decision** | legal | **Documented** — README states no reuse rights granted yet; choosing a license requires owner authorization (explicitly out of scope) | README license section |

**P0 findings: none found.** **P1 findings: none found.** The heavily-QA'd
Phases 1–3 left no critical or important defects that this audit could confirm:
startup is guarded, learner-name rendering is escaped (`escapeHtml` /
attribute-escape / `textContent`), reset never calls `localStorage.clear()`,
routes fall back gracefully, rewards cannot be duplicated, and the achievement
pipeline is intact.

## Storage compatibility

- Key unchanged: `git-course-fa-v3`. No migration required; sanitization is
  idempotent (load → save → load yields identical state) and never discards
  valid entries.
- `done` (levels) and `missionsDone` (missions) remain the sources of truth;
  invalid/unknown entries are dropped, valid ones preserved.
- Verified states in a real browser: absent key, malformed JSON, wrong-typed
  fields (`done:'garbage'`, `tries:'x'`, `learner:123`, `missionsDone:'nope'`),
  junk level keys (`'abc'`, `'-2'`), non-object level values, legacy `true`
  level values (normalized), duplicate/unknown mission IDs (deduped/dropped —
  Phase 3 logic, re-verified).

## Accessibility review

Baseline: WCAG 2.2 AA as an engineering target. **Full conformance is not
claimed** — no certified audit or real screen-reader session was performed.

- **Automated/scripted (run):** all interactive choices are real `<button>`/`<a>`
  elements; progressbars carry `aria-label` + `aria-valuenow`; decorative icons
  `aria-hidden`; hint disclosure uses `aria-expanded`/`aria-controls`; feedback
  region is `aria-live="polite"` with focus moved to the feedback heading;
  export button keyboard-focusable (verified via Playwright).
- **Manual/structural (reviewed in code + prior-phase screenshots):** `html lang="fa" dir="rtl"`;
  skip link; visible global `:focus-visible` ring; feedback is icon + text
  heading, never color-only; commands rendered LTR inside RTL.
- **Not performed:** real screen-reader (NVDA/VoiceOver) session; manual zoom/
  reflow sweep. Listed as remaining manual checks.

## Browser review

| Browser | Version | Platform | Checks run | Result | Limitations |
|---|---|---|---|---|---|
| Chromium (Playwright) | 1194 bundle | Linux container | startup (no data / malformed / corrupted storage), all 7 route families, unknown/malformed hashes, achievement card + export control, reset isolation, dark-theme persistence, console monitoring (30 assertions this phase; ~70 across Phases 2–4 flows) | **All pass, zero console errors** | Single browser only — Firefox/Safari/mobile-device testing not available in this environment |

## Responsive and RTL review

Verified in this environment across Phases 2–4 QA: 390px mobile and desktop
(1280px) in light + dark, RTL layout, LTR command blocks, no horizontal
overflow on tracks/missions/lesson views (screenshot-verified). Phase 4 made no
layout changes; the privacy note uses existing tokens and wraps safely
(`max-width: 64ch`).

## Performance review

Measurements actually collected (file sizes, `du`/`ls`, 2026-08-03):

- `index.html` ≈ 8 KB; total JS (app + data) ≈ 376 KB — of which `data/levels.js`
  is ≈ 192 KB (curriculum content) and `data/missions.js` ≈ 44 KB.
- CSS ≈ 82 KB; fonts 2 × ~35 KB woff; icon CSS ≈ 480 KB total across four
  Phosphor weights (third-party, all weights used).
- All `<img>` elements have explicit `width`/`height` (no layout shift from images).
- No runtime network requests; no Lighthouse run was performed (no score claimed).

**Changes made: none** — no confirmed performance defect was found; the app
renders route-locally without frameworks. Icon-CSS subsetting deferred as P3.

## Security review

Verified by repository-wide inspection (results, no secrets found to redact):

- **Secrets:** none (only teaching placeholders like `FIGMA_TOKEN=figd_xxxxxxxx` inside lesson text).
- **Dangerous APIs:** no `eval`, no `Function` constructor, no `document.write`, no `javascript:` URLs.
- **`innerHTML`:** used only with trusted static application/curriculum data; the single user-controlled string (learner name) is escaped at every sink (attribute-escaped input value, `escapeHtml` on the achievement card, `textContent` on edit).
- **External links:** all `target="_blank"` links carry `rel="noopener"`.
- **Network:** no `fetch`/XHR/WebSocket/sendBeacon anywhere; no remote scripts, fonts, icons, or trackers; no mixed content.
- **Export:** achievement PNG export uses only local assets and escaped inputs.

## Privacy review

Verified runtime behavior: progress only in `localStorage` (`git-course-fa-v3`);
no account, no upload, no analytics request, no tracking pixel, no email/phone
collection, no third-party runtime request. Reset clears only this app's key
(verified: an unrelated key on the same origin survives reset). A Persian
privacy note now states this in-product.

## Metadata review

Already present and accurate: UTF-8, viewport, `lang="fa" dir="rtl"`, Persian
title + description, author, `theme-color`, OG title/description/type/locale,
`twitter:card`, inline SVG favicon. **Intentionally omitted:** canonical URL,
`og:url`, `og:image`, robots/sitemap — no verified production URL or suitable
repository-owned share image exists; inventing them would be wrong. Hash routes
are not presented as separately indexable pages.

## Deployment readiness

No deployment configuration exists (no Pages workflow, no CNAME, no provider
files). The app is deployment-neutral: all references are relative, so it works
at a domain root or a repository subpath (`python3 -m http.server` verified
locally). Choosing a host is an owner decision; nothing was deployed.

## CI

- **Local validation (run):** `node --check` on all 30 JS files — pass;
  `node scripts/validate.mjs` — exit 0; CI's exact find-loop reproduced locally.
- **Remote CI:** `.github/workflows/validate.yml` added in this branch — job
  name **`validate`** (workflow `validate`), triggered on PRs to `main` and
  pushes to `main`, `permissions: contents: read`, `timeout-minutes: 10`,
  `actions/checkout@v7` + `actions/setup-node@v7` (versions verified from
  official release pages). Remote status is reported separately after push —
  it is **not** claimed as passed until GitHub reports it. The owner may later
  add the `validate` check to the main-branch ruleset.

## Known limitations

- Persian-only; no bilingual support (explicit non-goal this phase).
- Single-browser automated QA (Chromium); no real screen-reader session.
- No Lighthouse/profiling metrics collected (file-size measurements only).
- No LICENSE (owner decision pending); no social-preview image.
- Icon CSS is the largest asset class; subsetting deferred.

## Manual checks remaining

- Human spot-read of new Persian microcopy (privacy note) for tone.
- A real screen-reader pass (NVDA/VoiceOver) and manual zoom/reflow sweep.
- Verification on Firefox/Safari and at least one real mobile device.
- Owner decisions: software license; production URL (enables canonical/OG URL);
  optional social-preview image; optionally adding the `validate` check to the
  main ruleset.

## Release recommendation

**Ready with documented minor limitations.**

No P0 or P1 blocker was found or remains. The remaining items (license decision,
cross-browser/AT verification, optional share image, icon subsetting) are
documented above and do not block release-candidate review. This report does not
declare the product publicly released.
