# Analytics — what is measured, and how to read it

Microsoft Clarity, switched on by `CLARITY_ID` in `js/config.js`. With that
value empty nothing loads and every function in `js/analytics.js` is a no-op.

Nothing identifying is sent. There is no `clarity("identify", …)` call, the
learner's name never leaves the browser, and progress stays in `localStorage`.
What follows is the complete list of what *is* sent.

## Tags — the dimensions you filter by

Set on every render, so a session's tags always describe the furthest point it
reached rather than where it started.

| Tag | Values | Answers |
|---|---|---|
| `view` | `intro`, `lesson`, `tracks`, `track`, `missions`, `mission`, `glossary`, `cert`, `system` | Which screens get used at all |
| `level` | `01`–`30` | How deep into the course a session got |
| `phase` | `1 · …` – `4 · …` | Which of the four stages holds attention |
| `progress` | `00 · not started`, `01 · 1-5`, `02 · 6-14`, `03 · 15-29`, `04 · finished` | The funnel, in five buckets |
| `rank` | the six rank titles | Same idea, in the product's own language |
| `lang` | `fa`, `en` | Whether the English side is used |
| `theme` | `light`, `dark` | Whether dark mode is worth the maintenance |
| `perfect_quizzes` | a count | How many people are perfectionists |
| `missions_done` | a count | Whether the optional path gets taken |
| `last_quiz_level` | `01`–`30` | The last quiz attempted |
| `failed_level` | `01`–`30` | **The most useful tag in the list** |
| `last_mission` | mission id | Which mission was completed last |
| `route` | the URL hash | Clarity's own page grouping |

Buckets, not exact numbers, on purpose: a tag with hundreds of values makes the
filter menu useless. `level` is the one exception, because "where do people
stop?" is the whole question.

## Events — the things that happened

`level_open`, `quiz_submit`, `quiz_pass`, `quiz_fail`, `quiz_perfect`,
`quiz_retry`, `badge_earned`, `course_complete`, `mission_complete`,
`lang_switch`, `theme_switch`, `progress_reset`.

## Pinned recordings

Clarity samples: an ordinary session may never be stored. Two cases are pinned
with `clarity("upgrade", …)` so the recording is always kept:

- **`quiz_fail`** — the session that explains where the material is unclear.
- **`progress_reset`** — someone wiped everything, and the minutes before that
  are worth watching.

## Five things to look at first

1. **Where people stop.** Filter by `progress`. The drop between
   `01 · 1-5 levels` and `02 · 6-14 levels` is the real onboarding cliff; the
   drop after `03` is the endurance one. They need different fixes.
2. **Which level is too hard.** Filter recordings by `failed_level`, then sort
   by how often each value appears. One level dominating means the *lesson* is
   wrong, not the quiz.
3. **Whether the quiz gate helps or hurts.** Compare sessions with `quiz_retry`
   against sessions that end right after `quiz_fail`. Retry means the gate is
   working; leaving means it is a wall.
4. **Whether anyone uses the tracks and missions.** `view = tracks` and
   `missions_done > 0`. If these stay near zero, the four tracks are decoration
   and should either be surfaced harder or cut.
5. **Whether the English side is real.** `lang = en`. It doubles the content
   maintenance cost; the tag tells you whether that cost is buying anything.

## How to build a segment in Clarity

1. Dashboard → **Filters** → **Custom tags** → pick a key and value.
2. Refine with more filters (device, country, `lang`, and so on).
3. **Save as segment**, name it, and it stays in the sidebar for later.

Segments worth saving on day one:

- **Stalled early** — `progress = 01 · 1-5 levels`
- **Hit a wall** — has event `quiz_fail`, no event `quiz_pass`
- **Finishers** — has event `course_complete`
- **English readers** — `lang = en`
- **Mission users** — `missions_done` is not `0`

## Funnels

Clarity builds funnels from events. The one that matters:

`level_open → quiz_submit → quiz_pass → level_open`

Each step's drop-off is a different problem: people who open a level and never
submit did not finish reading; people who submit and fail did not understand;
people who pass and never open another level lost interest, and that is the
number a course actually lives or dies by.

## A caution about the numbers

Content blockers stop Clarity, and the audience for this site skews technical —
expect a meaningful undercount, and read the tags as ratios rather than totals.
Do not report these as visitor counts.
