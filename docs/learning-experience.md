# Learning Experience — Guided Practice & Missions (Phase 3)

This document describes the Phase 3 learning-experience layer: guided, multi-step
**missions** that let learners *apply* Git concepts in realistic designer
workflows, with explanatory feedback for every choice.

Missions **complement** the existing lessons, quizzes, scenarios, tracks, badges,
ranks, XP, and path achievement — they do not replace any of them.

---

## Goals

Turn memorization into application. Every practice interaction answers:

- What is happening? (a realistic situation)
- What decision should I make? (2–4 concrete actions)
- What will that decision affect? (which Git state / Git vs GitHub)
- Why is this choice correct or unsafe? (per-choice explanatory feedback)
- What should I do next? (a clear next action)

## Non-goals (explicitly out of scope)

- No real terminal, no real Git execution, no file-system access.
- No backend, accounts, or uploaded progress.
- No XP inflation, streaks, random rewards, or punitive mechanics.
- No advanced Git concept the curriculum has not already taught.
- Missions are **optional** and never gate lessons, tracks, Core completion, or the path achievement.

## Safe-simulation principle

Every command shown is a **labelled educational simulation**. Command previews
carry the notice «شبیه‌سازی آموزشی — این فرمان روی سیستم تو اجرا نمی‌شود» and are
rendered LTR in monospace. Nothing runs; no simulated file or history is actually
changed.

---

## Mission model (`data/missions.js`)

Pure data. A mission references existing level IDs as prerequisite lessons; it
never duplicates lesson, quiz, or scenario content.

Mission fields: `id, title, shortDescription, trackId, levelIds, difficulty,
icon, context, objectives[], steps[], completionMessage, nextAction {label, href}`.

Step fields: `id, situation, commandPreview?, stateNote?, choices[], correct,
explanation, hint`.

Choice fields: `id, label, feedback, tone`, where `tone ∈ correct | unsafe |
risky | incorrect`. Every selectable choice has explanatory feedback; incorrect
choices explain the risk and the better action, without shaming.

## Missions and track coverage

| Mission ID | Title | Track | Difficulty | Steps | Prerequisite lessons |
| --- | --- | --- | --- | ---: | --- |
| `core-ship-change` | آماده‌سازی و ارسال یک تغییر طراحی برای بازبینی | core | مقدماتی | 6 | 4, 5, 7, 8, 11, 12 |
| `ai-safe-checkpoint` | چک‌پوینت امن پیش از ادامهٔ کار با کد AI | ai-prototype | تخصصی | 5 | 21, 6, 14 |
| `ds-token-conflict` | حل تعارض توکن‌های مشترک بدون بازنویسی کار تیم | design-system | تخصصی | 5 | 8, 10, 17, 23, 24 |
| `dt-clean-branch` | آماده‌کردن یک شاخهٔ تمیز برای بازبینی | design-technologist | پیشرفته | 4 | 14, 27, 28 |

All four tracks have at least one complete mission. Each mission maps to one
primary track and to the lessons it practices.

### Learning-mode coverage

- **Guided decision practice** — every step (situation → choose best action → explanatory feedback → next).
- **State-model practice** — `stateNote` labels the affected Git state (Working tree, Staging, local branch, `origin/main`, Remote, shared history).
- **Safe recovery practice** — restore vs reset vs revert; shared-history safety (revert for published commits; rebase/force-push only on unshared local work).
- **Workflow mission** — each mission chains several decisions into one realistic workflow with a final debrief and a recommended next action.

Ordering practice is expressed as choice-based "what is the correct next step?"
decisions so it stays fully keyboard- and touch-accessible (no drag-only interaction).

---

## Completion, XP, and badge behavior

- **Level completion** is unchanged — the source of truth is still `state.done` (quiz ≥70%).
- **Mission completion** is stored as a deduplicated list of mission IDs in `state.missionsDone`.
- **XP:** missions award **no XP**. XP stays tied to the 30 levels (`maxXP = 30 × 150`), so the XP bar, ranks, and achievement-card XP are untouched. This is the deliberate compatibility rule — mission XP would exceed `maxXP` and break those systems.
- **Retry** is always available and never awards anything twice (completion is a set; there is no XP to double-award). Retrying never marks a completed mission incomplete.
- **Badge:** one new badge — `missions` («مأمور میدان») — is earned by completing all four track missions. It is inserted before the `all` («پایان مسیر») badge so the crown remains the completion hero on the achievement card. Badges never gate the path achievement.

## Storage additions

Same storage key `git-course-fa-v3`; additive fields only:

- `missionsDone: string[]` — completed mission IDs (deduplicated on load; unknown IDs dropped; a missing/corrupt value falls back to `[]`).
- `mission: string|null` — the active mission for the detail route (validated against known IDs).

Reset (شروع دوبارهٔ دوره) intentionally clears `missionsDone` and `mission` along
with the rest of progress. No learner data is uploaded.

## Routes

Following the existing `#/level-<id>` hash convention (no existing route renamed):

- `#/missions` — mission hub (title, explanation, simple track filter, recommended mission, cards).
- `#/mission-<id>` — mission detail (one reusable renderer). Unknown IDs fall back gracefully to the hub. Direct load, refresh, and browser Back/Forward all work.

## Integration points

- **Navigation:** one sidebar entry «مأموریت‌های عملی» (achievement nav kept separate).
- **Track detail:** each track lists its mission(s) with completion state, labelled optional.
- **Lessons:** a lightweight «تمرین این مهارت» link appears on lessons that a mission practices — after the quiz, before the next-level cards; it never interrupts reading or blocks the lesson.

## Accessibility expectations

- Real `<button>`/`<a>` controls; keyboard-accessible choices; visible `:focus-visible` ring.
- Feedback is never color-only — each result carries an icon **and** a heading in text; the feedback region is an `aria-live="polite"` status and focus moves to the feedback heading after a choice is submitted.
- Progress is text («مرحلهٔ X از N») plus a labelled `role="progressbar"`.
- Completed state is communicated in text («تکمیل‌شده»).
- Hints are a keyboard-toggled disclosure (`aria-expanded` / `aria-controls`), not auto-revealed.
- Decorative icons are `aria-hidden`; command content stays LTR; Persian RTL is preserved; mobile tap targets remain usable and layouts do not overflow.
