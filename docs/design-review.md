# Design Review — product and interface critique

**Base:** `origin/main` at `7ae21b2` (merge of PR #16) · **Date context:** 2026-08-04
**Method:** the built product was reviewed on screen — 15 views across two locales,
two themes and three widths — not by reading source. Claims below that carry a
number were measured in a real browser.

This pass is a design critique rather than a QA sweep: it looks at whether the
product does what it claims to do, and whether the interface earns its choices.

---

## What was found to be working

Recorded because a critique that only lists faults is not an accurate picture.

- **The teaching loop is sound.** Read → quiz → per-question explanation →
  gated unlock. The answer-review state (correct option marked, a separate
  "why?" block) is the strongest screen in the product.
- **Persian typography is tuned, not defaulted.** Measured: **66 characters per
  line** on desktop, **44** on mobile, line-height 1.95. That sits inside the
  comfortable band, and the extra leading is the right call for Persian. An
  earlier impression that the measure was too long did not survive measurement.
- **The intro statistics are derived from the data**, not hand-written, so they
  cannot drift as the curriculum changes.
- **The achievement card states plainly that it is not an official credential.**

## Findings and what changed

| # | Finding | Severity | Change |
|---|---|---|---|
| 1 | **Missions revealed their own answers.** `commandPreview` rendered unconditionally *above* the choices. In **14 of 20** steps the previewed command corresponded to the correct choice — in four it was character-for-character identical (`git push -u origin feature/pricing-hero`, `git restore Button.tsx`, `git cherry-pick a1b2c3d`, `git add tokens.json`). The missions were the product's differentiator — decision practice rather than command recall — and this reduced them to text matching. | **P1** | The command now renders inside the feedback block and **only after a correct choice**, as the consequence of a decision. A wrong choice reveals nothing, so a retry is still a real retry. |
| 2 | **A pass was announced four times**: the result row, the gate banner, a toast, and the unlocked next-level card. Repetition weakened the one moment the product should feel rewarding. | P2 | The redundant pass/completion toast is gone. The result row (score, XP, perfect-run) and the gate (persistent lock state) remain; badge toasts stay, because a new badge is genuinely new information. |
| 3 | **Button hierarchy was unresolved in the two highest-stakes moments.** After a quiz the primary action sat *between* two other buttons while a disabled-but-filled check button still read as the heaviest control. On the achievement screen five buttons competed, two of them filled, and the action the page exists for was not the prominent one. | P2 | The check button is hidden once answers are graded (not merely disabled) and the next-level action leads the row. On the achievement screen exactly one filled button remains — build the card. The next-level button also moved from the semantic green to the monochrome primary: green now means only "your answer was right". |
| 4 | **Four track cards laid out as 3+1.** Measured at 1280/1440px: three columns, an orphan fourth card, heights 278/278/278/300, and two titles wrapping to two lines. The narrow layout (1024px, two columns) was better composed than the wide one. | P2 | Fixed 2×2. Re-measured: **four equal columns of 400px, card heights 234/234/234/234 (Δ 0px), every title on one line.** |
| 5 | **Track subtitles were set in monospace**, so track names read as identifiers and the longest wrapped to three lines. | P3 | Set in the UI face. Monospace is retained where it is meaningful — level numerals and command blocks. |
| 6 | **Earned badges read as locked.** Every badge on the card is earned, but the non-featured ones were drawn as a low-contrast tint beside a solid hero — the standard visual language for "unavailable". | P3 | Earned badges get a defined edge; the featured badge stays distinct through size and its ring rather than by being the only solid one. |
| 7 | **The one irreversible action had the most permanent placement.** "Restart the course" sat pinned in the rail footer on every screen. | P3 | Moved behind a `Course settings` disclosure with a plain-language warning. Still two clicks away, no longer ambient. The existing confirm modal is unchanged. |
| 8 | **XP was displayed twice at once** — the rail (value, bar, rank) and a topbar pill. | P3 | The pill now appears only below 940px, where the rail has collapsed into a drawer and the pill is the only readout. |
| 9 | **The topbar was mostly void.** At 1440px roughly 900px separated the breadcrumb from the controls, because the bar ran edge-to-edge while the article column is centred at 880px. | P3 | The bar stays full-bleed for its background; its contents are inset to the article column, so the breadcrumb aligns with the text it labels. |
| 10 | **The hero headline mixed scripts at display size** and orphaned "Design Technologist" on its own line. | P3 | Shortened; the full audience is named in the lead instead, where it does not fight the line breaks. |
| 11 | **~20.5 MB of the 24 MB icon tree was never loaded.** `selection.json` (8.6 MB) is an IcoMoon project file referenced nowhere; the `.svg` (10 MB) and `.ttf` (1.9 MB) faces were legacy `@font-face` fallbacks after woff2/woff. | P3 | Removed, along with their `src` entries. **Repository: 24 MB → 11 MB; `assets/icons`: 24 MB → 3.0 MB.** Verified afterwards: all four Phosphor faces load, **46 of 46 visible icons paint, zero failed requests**. |

### The strategic gap — and the page that closes it

The most senior engineering in this repository — one behavioural source of truth
shared by both locales, live module bindings, locale-aware canvas export, RTL/LTR
mirroring through CSS logical properties — was invisible in the product. It was
documented only in `docs/`, which nobody opens.

**Added: `#/system`.** It documents the design system from the *live* computed
styles at render time: the monochrome ramp, ink and surface tokens, the semantic
pair, the type scale, the spacing scale, the bidirectionality rules, and the
one-filled-button hierarchy rule. Because every value is read from CSS rather
than transcribed, the page cannot drift from the stylesheets.

Building it immediately exposed a bug of exactly the kind it documents: hex codes
beginning with a letter (`#DFE0E2`) rendered with the hash at the wrong end in
RTL, because `#` is a bidi-neutral character before a strong-LTR run. Fixed with
the same `dir="ltr"` rule the page prescribes for Git commands.

**README rewritten as a case study** — the problem, the decisions worth
defending, and three things that were got wrong and fixed.

## Palette

The monochrome constraint was held: **no new colour was introduced.** The one
change in the colour direction removes a colour — the next-level button moved
from semantic green to the monochrome primary.

**Flagged, not changed:** the achievement card still themes itself by rank, and
four of those rank accents are not monochrome (`--ach-accent` resolves to
`#1D4ED8` blue, `#127A4B` green, `#A15C07` amber, `#0F766E` teal for the middle
ranks). This predates the review and is the only place the product leaves its
greyscale. It is deliberate-looking enough that changing it unasked would be a
design decision, not a fix — but it is worth a decision either way.

## Verification after the changes

- `node scripts/validate.mjs` — pass; `node --check` on all 38 JS files — pass.
- Quiz flow re-run end to end: levels 1 (fa + en), 15 (fa), 30 (en) answered
  correctly, level 1 answered wrongly as a control — grading, XP, perfect-run
  detection, gating and persistence all correct, zero page errors.
- Achievement export re-verified after the button change: four real PNGs
  downloaded (1080×1080 and 1080×1920, both locales).
- Accessibility audit re-run across both locales, both themes, four widths and
  **nine** views (`#/system` included): no contrast failures, no missing
  accessible names, no skipped headings, no horizontal overflow, zero keyboard
  stops without a focus indicator.
- Full RC sweep: 38 pass, with the same three known harness artifacts documented
  in `docs/release-candidate.md` (off-DOM export canvas ×2, storage re-seeded by
  the test harness on reload) — all three individually re-verified as correct.

## Still open

- No `h1` (see `docs/release-candidate.md` finding 6) — unchanged this pass.
- The rank-based achievement accents above.
- Cross-browser and screen-reader verification remain impossible in this
  environment: only Chromium is installed.
