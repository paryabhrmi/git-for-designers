# Setting up the Clarity dashboard

Two halves. The first is clicking, done once inside Clarity, and gives you a
working dashboard the same day. The second is the report script in this repo,
for numbers Clarity's own UI will not lay out the way you want.

What the site actually sends is listed in [`analytics.md`](analytics.md).

---

## Part 1 — inside Clarity

### 1. Turn the custom events into Smart Events

Custom events (`quiz_fail`, `quiz_pass`, `level_open`, …) arrive automatically,
but Clarity only lets you filter and build funnels on events it knows by name.

**Settings → Smart events → New smart event → Custom event**, then add one per
event you care about. Start with five; you can add the rest later:

| Smart event | Custom event | Why it earns a slot |
|---|---|---|
| Failed a quiz | `quiz_fail` | The single most useful signal in the product |
| Retried a quiz | `quiz_retry` | Distinguishes "the gate worked" from "the gate stopped them" |
| Passed a quiz | `quiz_pass` | The denominator for everything else |
| Opened a level | `level_open` | The top of the funnel |
| Finished the course | `course_complete` | Rare, and worth an alert |

### 2. Save the segments

**Dashboard → Filters → Custom tags**, pick a key and value, then **Save as
segment**. Five worth having on day one:

| Segment | Filter |
|---|---|
| Stalled early | `progress` = `01 · 1-5 levels` |
| Hit a wall | has `quiz_fail`, does not have `quiz_pass` |
| Finishers | has `course_complete` |
| English readers | `lang` = `en` |
| Mission users | `missions_done` ≠ `0` |

Saved segments sit in the sidebar and re-apply to every view, including
recordings and heatmaps — that is what makes them worth the two minutes.

### 3. Build the one funnel that matters

**Funnels → New funnel**, using the Smart Events from step 1:

```
level_open → quiz_submit → quiz_pass → level_open
```

Each drop is a different problem:

- opened a level but never submitted → they did not finish reading
- submitted and failed → they did not understand
- passed and never opened another level → they lost interest

The last one is the number a course lives or dies by.

### 4. Point the recordings at the failures

**Recordings → Filters → Custom tags → `failed_level`**. Sort by which value
appears most. If one level dominates, the *lesson* is wrong, not the quiz.

Those sessions are always kept: `js/analytics.js` calls `clarity("upgrade")` on
a failed quiz, so Clarity's sampling cannot discard exactly the sessions worth
watching.

### 5. Heatmaps

Clarity keys heatmaps by URL, and this is a hash-routed site — check that
`/#/level-4` and `/#/level-12` appear as separate pages. If they collapse into
one, filter by the `route` tag instead of relying on the URL list.

---

## Part 2 — the report script

Clarity's export API answers a few things its UI does not, and gives you
something you can keep. It is deliberately small: **the last 1–3 days only**, up
to three dimensions per call, and a low daily request budget.

### Get a token

**Clarity → Settings → Data export → generate API token.** It is a project-level
secret. Keep it out of the repo and out of `js/config.js`, which ships to the
browser.

### Run it

```bash
CLARITY_API_TOKEN=… node scripts/clarity-report.mjs --days 3
CLARITY_API_TOKEN=… node scripts/clarity-report.mjs --days 1 --dims OS,Device
node scripts/clarity-report.mjs --mock .clarity/raw.json   # re-render, no API call
```

It writes `.clarity/report.html` (self-contained, light and dark) and
`.clarity/raw.json`. Both are gitignored.

Because the daily budget is small, every live run saves the raw response — use
`--mock` to re-render as often as you like without spending a call. A `429` from
Clarity means you spent them; the script says so rather than failing silently.

The renderer discovers metric names and columns from the response itself, so a
change on Clarity's side shows up as a column you have not seen before rather
than a crash.

---

## Reading any of it honestly

Content blockers stop Clarity, and this site's audience skews technical. Expect
a real undercount. Read every number as a ratio between segments, never as a
visitor count — the report page says so at the top for the same reason.
