# Curriculum Map — Git for Designers

This document separates **what exists today** from a **proposed track structure**.  
No lesson content was rewritten for this map.

Related audit: [`docs/curriculum-audit.md`](./curriculum-audit.md)

---

## Part A — Current inventory (as shipped)

Every existing level appears **exactly once** below.

### Inventory counts

| Item | Count |
| --- | ---: |
| Levels | 30 |
| Base quiz questions | 166 |
| Scenario questions | 9 |
| Questions after runtime merge | 175 |
| Scenario-backed levels | 8 |
| Glossary entries | 72 |
| Badges | 10 |
| Ranks | 6 |
| Phases | 4 |

### Current phase structure

```text
Phase 1  “حتماً یاد بگیر”              Levels  1 ………… 14
Phase 2  “برای کار حرفه‌ای”            Levels 15 ………… 20
Phase 3  “برای Design Technologist”    Levels 21 ………… 27
Phase 4  “فقط در صورت نیاز”            Levels 28 ……… 30
```

### Complete current level list

| # | Title | Current phase | Scenario? |
| ---: | --- | --- | --- |
| 1 | مفاهیم پایه و ضروری | 1 | no |
| 2 | راه‌اندازی اولیه | 1 | no |
| 3 | ساخت و دریافت Repository | 1 | no |
| 4 | مدیریت تغییرات | 1 | yes (2) |
| 5 | نوشتن Commit حرفه‌ای | 1 | no |
| 6 | فایل‌های قابل ردگیری و .gitignore | 1 | no |
| 7 | Branch | 1 | yes |
| 8 | اتصال Local و Remote | 1 | yes |
| 9 | Merge | 1 | no |
| 10 | Merge Conflict | 1 | yes |
| 11 | Pull Request | 1 | yes |
| 12 | Pull Request برای طراحان | 1 | no |
| 13 | خواندن Diff | 1 | yes |
| 14 | بازگرداندن و اصلاح تغییرات | 1 | yes |
| 15 | Reset | 2 | no |
| 16 | Stash | 2 | no |
| 17 | Tag و Release | 2 | no |
| 18 | GitHub Issues و مدیریت کار | 2 | no |
| 19 | Collaboration | 2 | no |
| 20 | امنیت | 2 | no |
| 21 | Git برای پروژه‌های AI | 3 | yes |
| 22 | Git برای Prototypeها | 3 | no |
| 23 | Git برای Design System | 3 | no |
| 24 | Git برای Figma و Design Tokens | 3 | no |
| 25 | GitHub Actions و CI/CD | 3 | no |
| 26 | مرجع دستورهای خط فرمان | 3 | no |
| 27 | Rebase | 3 | no |
| 28 | Cherry-pick | 4 | no |
| 29 | Git Internals (اختیاری) | 4 | no |
| 30 | جمع‌بندی و نقشهٔ راه | 4 | no |

### Current unlock / completion model

- Linear unlock: each level opens after passing the previous quiz (≥70%).
- Certificate + badge «پایان مسیر» require **all 30** levels.
- Tension: Phase 4 / Level 29 are labeled optional-need, but completion is mandatory.

### Current strengths

- Designer examples throughout (tokens, Figma, handoff PRs, prototypes).
- Clear Git vs GitHub naming in early levels and PR lesson.
- Strong practice coverage on conflict, PR review, AI diff review.
- Undo family (restore / revert / reset) sequenced carefully (14 → 15).

### Current duplicated or thin spots

| Topic | Where it repeats / thins |
| --- | --- |
| Daily add/commit/diff | Levels 4, 5, 13, 26 |
| Branch + push -u | Levels 7, 8, 22, 30 |
| Secrets / .env | Levels 6 and 20 |
| CLI encyclopedia | Level 26 largely recapitulates 1–16 |
| Pull semantics | Level 8 + glossary; rebase nuance delayed to 27 |
| SemVer / Release | Level 17 after designers already need it for 23–24 |

### Current missing topics (relative to Level 30’s own roadmap text)

Level 30’s phase-4 summary mentions Submodules, Monorepo, and org-repo management, but **no shipped level teaches them**. Cherry-pick + Internals fill Phase 4 instead.

---

## Part B — Proposed structure (original proposal)

> **Update:** the four-track model below has since been **implemented in the product**
> via `data/tracks.js` and the `#/tracks` / `#/track-<id>` views. The shipped mapping
> and rules are documented in **[Part C — Implemented learning tracks](#part-c--implemented-learning-tracks-datatracksjs)**.
> This Part B is kept as the original design rationale. Level order, IDs, phases, and the
> certificate/achievement rule were **not** changed by the track work.

Proposed packaging into four learning tracks.  
Each level is assigned to **one primary track** (no silent omissions). Cross-links note secondary relevance.

### Track 1 — Core Git for Designers

**Goal:** Become independently productive on a design/engineering repo: commit cleanly, branch, sync, merge, open a design-aware PR, and recover safely.

| Order | Level | Notes |
| ---: | --- | --- |
| 1 | 1 مفاهیم پایه | Entry |
| 2 | 2 راه‌اندازی | Revise Private/VS Code wording |
| 3 | 3 Init/Clone/Remote | |
| 4 | 4 مدیریت تغییرات | Keep scenarios |
| 5 | 5 Commit حرفه‌ای | |
| 6 | 6 .gitignore | |
| 7 | 7 Branch | |
| 8 | 8 Local ↔ Remote | **Revise pull = merge/rebase** |
| 9 | 9 Merge | |
| 10 | 10 Conflict | |
| 11 | 11 Pull Request | |
| 12 | 12 PR برای طراحان | Flagship designer lesson |
| 13 | 13 خواندن Diff | Also feeds AI track |
| 14 | 14 Restore/Revert/Reflog | |
| 15 | 15 Reset | |
| 16 | 16 Stash | |
| 17 | 26 مرجع CLI | Propose non-blocking reference / merge into appendix |
| 18 | 30 جمع‌بندی | Capstone after specialist tracks *or* after Core — see progression |

**Prerequisites inside track:** strictly sequential 1→16; 26 as open reference after 8+; 30 after at least Core + one specialist track preferred.

### Track 2 — AI & Prototype Workflow

**Goal:** Use Git as quality control for AI-generated changes and multi-variant prototypes.

| Order | Level | Prerequisites | Notes |
| ---: | --- | --- | --- |
| 1 | 21 Git برای پروژه‌های AI | Core through 13–14 | Keep scenario |
| 2 | 22 Git برای Prototypeها | Core 7 + 11; ideally 25 for previews | |

Secondary references (remain primarily in Core): Level 13 (AI diff reading), Level 14 (restore points before prompts).

### Track 3 — Design System Workflow

**Goal:** Treat tokens/components as versioned products with reviewable changes.

| Order | Level | Prerequisites | Notes |
| ---: | --- | --- | --- |
| 1 | 17 Tag و Release | Core 5 + 11 | **Move earlier than current phase placement** |
| 2 | 23 Git برای Design System | 17 + Core PR/diff | |
| 3 | 24 Figma و Design Tokens | 23 | |

### Track 4 — Design Technologist Advanced Track

**Goal:** Collaboration, security, automation, and history-rewriting tools used with judgment.

| Order | Level | Prerequisites | Notes |
| ---: | --- | --- | --- |
| 1 | 18 Issues | Core 11 | |
| 2 | 19 Collaboration | Core 11–12 | |
| 3 | 20 امنیت | Core 6 + 19 | Align wording with GitHub visibility docs |
| 4 | 25 Actions / CI/CD | 11 + 19 | Helps Prototype previews |
| 5 | 27 Rebase | 9 + 15; update L8 cross-link | |
| 6 | 28 Cherry-pick | 9 + 14 | Decide optional vs certificate |
| 7 | 29 Internals | Core complete | Decide optional vs certificate; soften “immutable” |

---

## Proposed beginner → advanced progression

```text
[Core 1–16]
    ├─► [Design System: 17 → 23 → 24]
    ├─► [AI & Prototype: 21 → 22]  (optionally after 25 for previews)
    └─► [Advanced DT: 18 → 19 → 20 → 25 → 27 → (28/29 policy) ]
            └─► [Capstone 30]
Reference parallel: Level 26 cheat-sheet (non-blocking)
```

### Recommended certificate policy (proposal only)

Pick one and update copy + `allPassed` rules together later:

1. **Certificate = Core + one specialist track + capstone**, with 28–29 optional, or  
2. **Certificate = all instructional levels**, but remove “اختیاری / فقط در صورت نیاز” labels.

Do not leave optional labeling while requiring all 30.

---

## Current vs proposed — explicit distinction

| Dimension | Current (shipped) | Proposed (this map) |
| --- | --- | --- |
| Organization | 4 sequential phases by urgency | 4 role-oriented tracks with a shared Core |
| Level order | Fixed 1→30 linear unlock | Core linear; specialist tracks after Core gate |
| Level 17 | Phase 2 general professional | First lesson of Design System track |
| Level 26 | Scored Phase 3 lesson | Reference appendix / merge |
| Levels 28–29 | Phase 4 “if needed” but required for cert | Explicit optional deepening **or** required without optional label |
| Level 30 | End of Phase 4 | Capstone after Core + specialist work |
| Pull teaching | Merge-only | Fetch + integrate (merge/rebase) |
| Missing L30 topics | Mentioned, not taught | Either add later lessons or delete from roadmap copy |

### Levels accounted for

Proposed primary-track assignment covers levels **1–30 exactly once**:

- Core: 1–16, 26, 30  
- AI & Prototype: 21, 22  
- Design System: 17, 23, 24  
- Advanced DT: 18, 19, 20, 25, 27, 28, 29  

Checksum: 18 + 2 + 3 + 7 = **30**.

---

## Implementation note

This map is documentation only. Applying it requires a later content PR that may edit `data/phases.js`, level order/copy, unlock rules, and certificate conditions — explicitly out of scope for the audit PR.

---

## Part C — Implemented learning tracks (`data/tracks.js`)

The four-track model is now shipped in the product. This part documents **what was
actually implemented**, which supersedes Part B as the source of truth for tracks.

### Architecture

- **Source module:** `data/tracks.js` exports `TRACKS`, `TRACK_BY_ID`, and `trackOfLevel(levelId)`.
- **Pure data + references only.** A track lists existing level IDs (`levelIds`); it never
  duplicates lesson, quiz, or scenario content. Lesson content stays in `data/levels.js`.
- **Views:** track overview (`renderTracks` → `#/tracks`) and per-track detail (`#/track-<id>`),
  rendered by `js/render/tracks.js` and styled by `styles/tracks.css`.
- **Stable IDs (never localized):** `core`, `ai-prototype`, `design-system`, `design-technologist`.
- **Progress is derived, never stored per track.** Track progress = the learner's completed
  level IDs (`state.done`) filtered to that track's `levelIds`, reusing the existing
  linear-unlock rule. Only `state.track` (the active track in the detail view) is persisted,
  under the unchanged storage key `git-course-fa-v3`.

### Four tracks

| Track ID | Persian short title | Status | Levels | Prerequisite | Audience |
| --- | --- | --- | ---: | --- | --- |
| `core` | مبانی Git | **required** (recommended start) | 18 | — | همهٔ طراحان — نقطهٔ شروع دوره |
| `ai-prototype` | AI و پروتوتایپ | optional · تخصصی | 2 | core | کار با کد تولیدشده با AI و پروتوتایپ‌ها |
| `design-system` | Design System | optional · تخصصی | 3 | core | مشارکت‌کنندگان Design System و توکن‌ها |
| `design-technologist` | Design Technologist | optional · پیشرفته | 7 | core | Design Technologistها و کار عمیق‌تر با مهندسی |

### Level-to-track mapping (single-ownership — each level in exactly one track)

| Track | Level IDs |
| --- | --- |
| **core** | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 26, 30 |
| **ai-prototype** | 21, 22 |
| **design-system** | 17, 23, 24 |
| **design-technologist** | 18, 19, 20, 25, 27, 28, 29 |

Checksum: 18 + 2 + 3 + 7 = **30**, each level assigned exactly once. No multi-track
membership was used — a single primary owner was clearer for every level.

Notable placements vs the old phase grouping: **17 (Tag/Release)** and **23–24** form the
Design System track; **26 (CLI reference)** and **30 (capstone)** stay in Core; the advanced
history/collaboration/security levels (**18, 19, 20, 25, 27, 28, 29**) form the Design
Technologist track.

### Prerequisite relationships

- `core` has no prerequisite; it is the required starting path.
- `ai-prototype`, `design-system`, `design-technologist` each list `core` as a prerequisite
  and are marked optional.
- Prerequisites are **guidance, not new locks.** The only hard gate remains the pre-existing
  per-level linear unlock (pass level *n* to open level *n+1*). Track detail views surface a
  prerequisite note and, when a track's next level is not yet unlocked, an explanatory notice
  plus a link to the learner's current open level — they never add a lock the course did not
  already have.

### Learning missions (Phase 3)

Optional guided-practice missions map to tracks and prerequisite lessons (see
[`docs/learning-experience.md`](./learning-experience.md) for the full model):

| Mission | Track | Prerequisite lessons |
| --- | --- | --- |
| `core-ship-change` | core | 4, 5, 7, 8, 11, 12 |
| `ai-safe-checkpoint` | ai-prototype | 21, 6, 14 |
| `ds-token-conflict` | design-system | 8, 10, 17, 23, 24 |
| `dt-clean-branch` | design-technologist | 14, 27, 28 |

Missions are optional practice: they award no XP and do not change track
progress, Core completion, or path-achievement eligibility.

### Completion interpretation

- **Level completion:** unchanged — a level is done when its quiz is passed (≥70%), stored in `state.done`.
- **Track progress / completion:** derived count of a track's completed levels; a track is
  "complete" when all its levels are done. Completing an optional track is celebrated, never
  presented as a pending obligation.
- **Core completion:** all 18 Core levels done. Core does not require any optional track.
- **Overall mastery / achievement:** the نشان فتح مسیر (path achievement) still requires all
  **30** levels — unchanged (`allPassed()` in `js/state.js`). Tracks are an organizational and
  navigational layer over the same completion data; they do not change eligibility, XP, badges,
  or ranks.
