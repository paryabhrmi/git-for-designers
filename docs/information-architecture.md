# Information Architecture — Git for Designers

What the product contains, how it is layered, and which layer each thing
belongs to. Written because the layers had grown into each other: scoring was
sitting inside the curriculum, reference pages were sitting at the same rank as
lessons, and the same thirty levels were being mapped twice by two structures
that disagreed.

Every number below was measured against the shipped build, not estimated.
Related records: [`curriculum-map.md`](./curriculum-map.md) for what the levels
are, [`design-review.md`](./design-review.md) for the interface critique.

---

## Part A — What went wrong

### A1. Two complete, incompatible maps of the same thirty levels

Phases group levels by contiguous range. Tracks group the same levels by an
explicit ID list. Both cover all 30 with no overlap and no gaps, so each level
belongs to exactly one phase **and** exactly one track, and the two never line
up:

| Track | Levels | Spans phases |
|---|---|---|
| `core` | 18 — `1–16, 26, 30` | 1, 2, 3, 4 |
| `design-technologist` | 7 — `18,19,20,25,27,28,29` | 2, 3, 4 |
| `design-system` | 3 — `17, 23, 24` | 2, 3 |
| `ai-prototype` | 2 — `21, 22` | 3 |

`core` cuts through every phase. A learner is told they are in "مرحلهٔ اول"
and in "مسیر core" at the same time, and nothing states the relationship —
because there is no clean one.

The intro page shows both maps at once: a `چهار مرحله` card block **and** a
button through to the tracks page. The phase cards are plain `div`s with no
click handler and no focus — so the page presents one map you cannot click
beside a button to a second map you can.

### A2. The track dependency graph is satisfied in reverse

All three specialised tracks declare `prerequisiteTrackIds: ['core']`. Because
`core` owns levels 26 and 30, and unlocking is strictly linear
(`isUnlocked(i) = done[LEVELS[i-1]]`), `core` is the **last** track to finish:

```
ai-prototype         completes at level 22   prerequisite: core
design-system        completes at level 24   prerequisite: core
design-technologist  completes at level 29   prerequisite: core
core                 completes at level 30   prerequisite: —
```

The prerequisite always finishes after the thing that requires it. The
condition cannot be met in any order of play. `prerequisiteTrackIds` and
`recommendedNextTrackIds` model a graph that the unlock rule does not
implement — they are decorative.

### A3. Tracks are presented as a choice that does not exist

There is no branch anywhere in the product. To reach the first level of
`ai-prototype` you must pass the twenty levels before it. "Tracks" is a
labelling over a straight corridor, presented as four paths.

### A4. Scoring was fused with the curriculum

XP appears at four points on the learning surface:

| Where | What it shows |
|---|---|
| `index.html` topbar `.lvl-pill` | total XP, on every page including every lesson |
| `lesson.js` meta row | `تا ۱۵۰ امتیاز` before, `۱۵۰ امتیاز` after |
| `quiz.js` result row | `+150 XP` chip |
| rail header | XP bar, rank tag, next-rank line |

So a reader working through a level is told their score four times, and the
curriculum cannot be navigated without the scoreboard following it around.

### A5. The top rank cannot be reached by finishing the course

`maxXP = 30 × (100 + 50) = 4500` and the top rank threshold is also `4500`. The
final rank therefore requires a perfect score on all thirty quizzes.

```
30 levels passed, no perfect scores = 3000 XP → rank 4 of 6
```

A learner who has completed the entire course and holds the achievement is
still ranked "Pull Request و کار تیمی". Ranks 5 and 6 are unreachable for
anyone who ever missed a question.

### A6. Rank names borrow curriculum names, so they always arrive late

Ranks are named after content but keyed to XP — two different axes glued
together:

| Rank | Taught at | Rank actually arrives at |
|---|---|---|
| `Branch و Merge` | levels 7–9 | level 10–14 |
| `Pull Request و کار تیمی` | levels 11–12 | level 16–24 |
| `Design System و AI` | levels 21–24 | level 23–30 |

Because a perfect score adds 50%, two learners on the same level hold
different ranks. The name describes neither where you are nor how well you did.

### A7. Reference pages sit at the same rank as lessons

The rail is one scroll container holding three different kinds of thing:

```
destinations   شروع از اینجا · مسیرهای یادگیری · مأموریت‌های عملی
curriculum     4 phases × 30 levels
reference      واژه‌نامه · دیزاین سیستم · دستاورد
```

Reference is below the whole curriculum: the glossary sits at scroll offset
1096px and the design-system page at 1134px, inside a 533px window. The
glossary is exactly what a reader needs *during* a lesson, and it is two
screens of scrolling away.

At 1440×768 the rail spends 48% of its height on chrome and shows **4 of 30
levels**. Phase 1 alone is 800px of body in a 533px window, so the default
state can never show one phase whole.

---

## Part B — The architecture

### B1. Three layers, and nothing spans two

| Layer | Question it answers | Contains |
|---|---|---|
| **1 · Learning** | What do I do next? | phases, levels, quizzes, missions |
| **2 · Progress** | How far have I got, how well? | completion, rank, XP, badges, achievement |
| **3 · Reference** | What does this word mean? | glossary, design system, about, settings |

The rule that keeps them apart:

> **Layer 1 shows state, never score.** A level is locked, open, or passed.
> That is all the curriculum knows about you. Anything that turns performance
> into a number lives in layer 2.

Layer 3 is never a peer of layer 1 in navigation. Looking something up is not
a step in the course.

### B2. The hierarchy

```
Home  (شروع از اینجا)                      ← the only entry point
│
├── what this is · how it works             read once
├── where you are                           → layer 2, summarised
└── the map: 4 phases                       ← the ONE map, clickable
     └── phase
          └── level  ── quiz                ← locked | open | passed
                        └── mission          practice, attached to the phase

Progress  (پیشرفت)                          ← layer 2, its own surface
├── rank ladder
├── XP and how it is earned
├── badges
└── achievement

More  (اطلاعات بیشتر — inside settings)     ← layer 3, never a peer of learning
├── glossary
├── design system
└── privacy · language · theme · reset
```

Tracks are **not** in this tree as a destination. They become a lens: a way to
filter the same levels by theme, reachable from the map and from a level's own
meta row, which is where a reader actually wonders "what is this level for?".
Track detail pages keep their content — they are the only place the thematic
grouping and the missions are explained — but they stop being a top-level
choice, because they never were one.

### B3. What moves

| Thing | Today | Proposed |
|---|---|---|
| `چهار مرحله` cards | decorative `div`s on the intro | the map — clickable, opens that phase |
| Tracks overview | top-level nav destination | a section of the map; lens, not path |
| Track detail | `#/track-<id>` | unchanged, reached from the map and level meta |
| `prerequisiteTrackIds` | a graph nothing implements | removed |
| Glossary | bottom of the rail, below 30 levels | layer 3, in settings/more |
| Design system | nav item beside lessons | layer 3, in settings/more |
| Achievement | bottom of the rail | layer 2, on the progress surface |
| XP in topbar pill | every page | removed from layer 1 |
| XP in lesson meta | `تا ۱۵۰ امتیاز` | removed; the meta row keeps time, questions, pass mark |
| XP chip in quiz result | `+150 XP` | removed; the score chip already says how you did |
| Rank + XP in rail header | 101px of the header | one compact line, or moved to the progress surface |

### B4. Ranks measure distance, not points

A6 happens because one number is being asked two questions. They are separate
measures and should stay separate:

| Measure | Question | Ceiling | Feeds |
|---|---|---|---|
| levels passed | how far have I got | 30 | **rank** |
| perfect scores | how well did I do | 30 | **badges** |

Rank keyed to levels passed is monotonic, reachable, and cannot be inflated by
retaking an easy quiz:

| Rank | Threshold | Meaning |
|---|---|---|
| 1 | 0 levels | just arrived |
| 2 | 6 levels | |
| 3 | 12 levels | |
| 4 | 18 levels | |
| 5 | 24 levels | |
| 6 | 30 levels | course complete — same bar as the achievement |

Six ranks kept, evenly spaced, top rank aligned with the certificate so the two
rewards stop contradicting each other. Rank names must **not** reuse level or
phase titles: layer 2 borrowing layer 1's vocabulary is what made A6 possible.

XP survives as a quality score on the progress surface and on the achievement
card. It stops being the thing ranks are computed from, and it leaves the
curriculum entirely.

### B5. Invariants

Rules a future change can be checked against, in the spirit of the existing
`validate.mjs` checks:

1. **One map.** Exactly one structure partitions the 30 levels for navigation.
   Any other grouping is a filter and may not appear as a nav destination.
2. **No score in layer 1.** No phase, level, quiz, or mission surface renders
   XP, rank, or a points total.
3. **No borrowed names.** No rank or badge title reuses a phase or level title.
4. **Reachable top.** The highest rank's threshold is met by completing the
   course without any bonus condition.
5. **Declared dependencies are enforced.** A prerequisite that the unlock rule
   cannot satisfy is deleted, not documented.
6. **Reference is one action away.** Glossary reachable from any lesson without
   scrolling a list of levels.

---

## Part C — Order of work

Each step is independently shippable and leaves the product coherent.

| # | Step | Touches | Risk |
|---|---|---|---|
| 1 | Strip XP from layer 1 — topbar pill, lesson meta, quiz result | `index.html`, `navigation.js`, `lesson.js`, `quiz.js`, `i18n.js` | low, display only |
| 2 | Move glossary + design system into settings/more; achievement to progress | `navigation.js`, `index.html`, `styles/` | low |
| 3 | Make phase cards the map: clickable, open that phase | `intro.js`, `navigation.js` | low |
| 4 | Drop the tracks nav destination; fold the overview into the map | `navigation.js`, `intro.js`, `tracks.js` | medium, routes stay for bookmarks |
| 5 | Delete `prerequisiteTrackIds` and its UI | `data/tracks.js`, `tracks.js`, `i18n.js` | low |
| 6 | Re-key ranks to levels passed; rename ranks off curriculum vocabulary | `data/ranks.js`, `state.js`, `achievement.js`, `intro.js` | medium, changes stored-progress interpretation |
| 7 | Rebalance phase 1 (14 levels, 47% of the course, 800px in a 533px window) | `data/phases.js`, docs | high, curriculum restructure |

Steps 1–5 need no content changes and no migration. Step 6 changes what a
returning learner's saved progress evaluates to — their rank may move, though
never their completed levels, since progress is keyed by level ID. Step 7 is
the curriculum decision and is deliberately last.

## Part D — Open

- **Step 7 shape.** Phase 1 has three natural clusters that the badge
  definitions already assume: setup and basics (1–6), branch and merge (7–10),
  pull request and review (11–14). Splitting there gives 6/4/4/6/7/3 — no group
  larger than a screen. Not decided.
- **Where progress lives.** Its own route, or a panel on the home page. The
  rail header currently spends 101px on it; both options free that.
- **XP's future.** Kept as a quality score, or retired in favour of the perfect
  count it is derived from. Retiring it would remove a concept without losing
  information.
