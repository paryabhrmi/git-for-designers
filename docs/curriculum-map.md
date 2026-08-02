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

## Part B — Proposed structure (not implemented)

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
