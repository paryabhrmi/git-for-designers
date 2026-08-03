# Curriculum Audit — Git for Designers

**Project:** Git for Designers (Persian interactive Git course)  
**Audit branch:** `audit/curriculum-review`  
**Scope:** Read-only curriculum review of existing content. No lesson rewrites in this change.  
**Date context:** Audit performed against `main` after merge of stabilization PR #4.

---

## Executive summary

The course already has a strong designer-facing spine: 30 sequenced levels, 4 phases, scenario drills on high-risk topics, a 72-entry glossary, badges/ranks, and a certificate gate. Most core Git teaching (Working Directory → Staging → Commit, branch/switch, restore vs revert vs reset, PR review, secrets hygiene) is pedagogically sound and largely aligned with official Git/GitHub docs.

The highest-priority corrections are:

1. **Confirmed technical oversimplification:** Level 8 (and glossary) teach `git pull` as always `fetch + merge`. Official Git docs show pull integrates via **merge or rebase** depending on flags/`pull.rebase`.
2. **Product conflict:** Phase 4 labels levels 28–30 as “only if needed,” and level 29 is titled optional, but certificate, badge `all`, and unlock logic require **all 30** passes.
3. **Security wording:** Level 2 says a Private repo is “safer”; GitHub docs treat private visibility as access restriction, not inherent security.
4. **Editorial risk:** Level 2 presents VS Code as the universal “standard” editor for designers.

Recommended first rewrite after this audit: **Level 8 — اتصال Local و Remote**.

---

## Current curriculum inventory

Counts measured from `data/*.js` and the runtime merge in `js/course.js` (scenarios appended to matching level quizzes).

| Asset | Count | Source |
| --- | ---: | --- |
| Levels | **30** | `data/levels.js` (`id` 1–30, contiguous) |
| Quiz questions in level data | **166** | `LEVELS[].quiz` |
| Scenario practice questions | **9** | `data/scenarios.js` (8 level keys; level 4 has 2) |
| Questions shown after merge | **175** | `buildLevelsWithScenarios()` in `js/course.js` |
| Scenario-backed levels | **8** | 4, 7, 8, 10, 11, 13, 14, 21 |
| Glossary entries | **72** | `data/glossary.js` |
| Badges | **10** | `data/badges.js` |
| Ranks | **6** | `data/ranks.js` |
| Phases | **4** | `data/phases.js` |

### Current phases (as shipped)

| Phase | Label | Levels |
| --- | --- | --- |
| 1 | مرحله اول · حتماً یاد بگیر | 1–14 |
| 2 | مرحله دوم · برای کار حرفه‌ای | 15–20 |
| 3 | مرحله سوم · برای Design Technologist | 21–27 |
| 4 | مرحله چهارم · فقط در صورت نیاز | 28–30 |

### XP / certificate mechanics (relevant to curriculum claims)

- Pass threshold: 70% (`PASS_RATIO = 0.7`)
- XP: +100 pass, +50 first-try perfect (`XP_PASS`, `XP_PERFECT`)
- Max XP: `30 × 150 = 4500` (matches top rank threshold)
- Certificate and badge “پایان مسیر” require `passedCount() === LEVELS.length` (all 30)

---

## Methodology

1. Inventory exports from `data/levels.js`, `phases.js`, `scenarios.js`, `glossary.js`, `badges.js`, `ranks.js`.
2. Cross-check runtime merge and certificate/unlock rules in `js/course.js`, `js/state.js`, `js/render/certificate.js`, `js/render/intro.js`.
3. Full pass over all 30 lesson bodies, quizzes, and scenario items for designer relevance, sequencing, duplication, and risk topics listed in the maintainer brief.
4. Technical verification against **primary sources only**:
   - git-scm.com documentation
   - docs.github.com documentation
5. Distinguish:
   - **Confirmed technical inaccuracy** (contradicts official docs)
   - **Editorial / product recommendation** (tone, sequencing, scope — not a docs falsehood)

No browser or offline UX tests were run for this audit. Application stabilization was verified statically earlier and is already on `main`.

---

## Complete 30-level audit table

Severity key: **critical** · **important** · **minor** · **no issue**  
Action key: keep · revise · move · merge · split · remove

| # | Title | Learning objective (subtitle) | Concepts / commands | Prereqs | Track (proposed) | Tech accuracy | Clarity | Designer relevance | Quiz align | Scenario align | Duplication / gaps | Severity | Action |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | مفاهیم پایه و ضروری | Understand what problem Git solves | VCS, Git vs GitHub, repo, WD/stage/commit, snapshot | None | Core | High | High | High | Strong | — | Mentions `push` before taught | minor | keep |
| 2 | راه‌اندازی اولیه | Install, identity, GitHub auth | `config`, PAT, SSH, tools | 1 | Core | Med | High | High | Strong | — | VS Code “standard”; Private “safer” | important | revise |
| 3 | ساخت و دریافت Repository | `init` vs `clone`, remotes | `init`, `clone`, `remote` | 2 | Core | High | High | High | Strong | — | — | no issue | keep |
| 4 | مدیریت تغییرات | Daily status/diff/add/commit | `status`, `diff`, `add`, `-p`, `commit`, `log` | 3 | Core | High | High | High | Strong | Strong (2) | — | no issue | keep |
| 5 | نوشتن Commit حرفه‌ای | Atomic commits + messages | Conventional Commits, `--amend` | 4 | Core | High | High | High | Strong | — | Overlaps 4 slightly | minor | keep |
| 6 | فایل‌های قابل ردگیری و .gitignore | What not to track | `.gitignore`, secrets, `rm --cached` | 4–5 | Core | High | Med | High | Strong | — | Heading typo / odd title chars | minor | revise |
| 7 | Branch | Parallel work without touching main | `branch`, `switch`, upstream, naming | 4–5 | Core | High | High | High | Strong | Strong | checkout history noted well | no issue | keep |
| 8 | اتصال Local و Remote | Push / fetch / pull directions | `push`, `fetch`, `pull`, ahead/behind | 7 | Core | **Low on pull** | High | High | Quiz repeats merge-only pull | Strong | Glossary same claim | **critical** | revise |
| 9 | Merge | Bring feature home | FF, merge commit, squash | 7–8 | Core | High | High | High | Strong | — | Mentions rebase before L27 | minor | keep |
| 10 | Merge Conflict | Resolve conflicting lines | markers, add/commit, `--abort` | 9 | Core | High | High | High (tokens) | Strong | Strong | — | no issue | keep |
| 11 | Pull Request | Team review process vs `git pull` | PR UI, draft, review states | 8–10 | Core | High | High | High | Strong | Strong | Name collision taught well | no issue | keep |
| 12 | Pull Request برای طراحان | Design handoff via PR | PR template for design | 11 | Core | N/A (process) | High | Very high | Strong | — | — | no issue | keep |
| 13 | خواندن Diff | Read changes > memorize commands | split/unified, AI review, `add -p` | 4, 11 | Core (AI-adjacent) | High | High | Very high | Strong | Strong | Bridges to L21 | minor | keep |
| 14 | بازگرداندن و اصلاح تغییرات | Safety net map | `restore`, `revert`, amend, reflog | 4–5, 8 | Core | High | High | High | Strong | Strong | Sets up L15 well | no issue | keep |
| 15 | Reset | Local history rewrite carefully | `--soft/--mixed/--hard` | 14 | Core | High | High | Med-high | Strong | — | Could intimidate earlier | minor | keep |
| 16 | Stash | Temporary shelf for WIP | `stash` family | 7, 14 | Core | High | High | High | Strong | — | — | no issue | keep |
| 17 | Tag و Release | Mark versions | tags, SemVer, GitHub Release | 5, 11 | Design System | High | High | High for DS | Strong | — | Needed before L23–24 | important | move |
| 18 | GitHub Issues و مدیریت کار | Work tracking | Issues, Projects, closing keywords | 11 | Advanced DT | High | High | Med-high | Strong | — | GitHub-not-Git (clear enough) | minor | keep |
| 19 | Collaboration | Multi-person rules | fork, permissions, protection | 11–12 | Advanced DT | High | High | High | Strong | — | — | no issue | keep |
| 20 | امنیت | Secrets & access hygiene | env, scanning, PAT scope, private vs public | 6, 19 | Advanced DT | Med-high | High | Very high | Strong | — | Soften “private = safe” echo from L2 | important | revise |
| 21 | Git برای پروژه‌های AI | Git as QA for agents | branch, diff, selective stage | 13–14 | AI & Prototype | High | High | Very high | Strong | Strong | — | no issue | keep |
| 22 | Git برای Prototypeها | Variant branches + previews | branch per idea, preview URLs | 7, 11, 22 deps CI later | AI & Prototype | High | High | Very high | Strong | — | Preview assumes hosting knowledge | minor | keep |
| 23 | Git برای Design System | DS as versioned code | tokens repo, breaking changes | 17, 11–13 | Design System | High | High | Very high | Strong | — | Needs SemVer earlier — L17 | minor | keep |
| 24 | Git برای Figma و Design Tokens | Sync & source of truth | variables/tokens, PR for tokens | 23, 17 | Design System | High | High | Very high | Strong | — | Tooling evolves fast | minor | keep |
| 25 | GitHub Actions و CI/CD | Why PR checks go red | CI/CD vocab, required checks | 11, 19 | Advanced DT | High | High | High | Strong | — | — | no issue | keep |
| 26 | مرجع دستورهای خط فرمان | Command cheat sheet | broad CLI list | 1–16 | Core | High | Med | Med | Weak as “lesson” | — | Heavy duplicate of prior levels | important | merge |
| 27 | Rebase | Linearize personal history | rebase, `-i`, force-with-lease | 9, 15 | Advanced DT | High | High | Med-high | Strong | — | Should be referenced from L8 pull | important | keep |
| 28 | Cherry-pick | Lift one commit across branches | `cherry-pick` | 9, 14 | Advanced DT | High | High | Med | Strong | — | Optional label vs cert gate | important | revise |
| 29 | Git Internals (اختیاری) | Under the hood | objects, HEAD, DAG | 1–15 | Advanced DT | Med (“immutable”) | High | Low-med | Strong | — | Optional vs cert; immutability overstated | important | revise |
| 30 | جمع‌بندی و نقشهٔ راه | Capstone workflow map | end-to-end workflow | All prior | Core (capstone) | Med (roadmap drift) | High | High | Strong | — | Mentions submodules/monorepo not taught; requires optional levels | important | revise |

### Severity totals (by level)

| Severity | Levels | Count |
| --- | --- | ---: |
| critical | 8 | **1** |
| important | 2, 17, 20, 26, 27, 28, 29, 30 | **8** |
| minor | 1, 5, 6, 9, 13, 15, 18, 22, 23, 24 | **10** |
| no issue | 3, 4, 7, 10, 11, 12, 14, 16, 19, 21, 25 | **11** |

---

## Confirmed technical inaccuracies

These conflict with official documentation. Each includes a primary source.

### 1) `git pull` is not always `fetch + merge` — Level 8 + glossary + quiz why-text

**Course claim:** tables and quiz explanations state `pull = fetch + merge` / “Fetch + Merge”.

**Official Git:** `git pull` fetches, then integrates the remote branch into the current branch. Integration may be merge or rebase:

- `git pull --rebase` runs rebase
- `git pull --no-rebase` runs merge
- config options include `pull.rebase`, `pull.squash`, `pull.ff`

Source: [git-pull documentation](https://git-scm.com/docs/git-pull)

**Classification:** confirmed technical inaccuracy (oversimplified to the point of being false when rebase is configured).  
**Fix direction:** teach default mental model as “fetch + integrate,” then note merge vs rebase; cross-link Level 27.

### 2) History is not absolutely “دستکاری‌ناپذیر” — Level 29

**Course claim:** content-addressed hashing makes Git history tamper-proof / immutable.

**Official reality:** object IDs are content-derived (integrity), but history can still be rewritten locally and republished (reset/rebase + force push). Integrity ≠ immutability of branch tips.

Sources:

- [git-reset](https://git-scm.com/docs/git-reset)
- [git-rebase](https://git-scm.com/docs/git-rebase) (force-push implications covered in rebase recovery sections)
- Object model overview via internals teaching remains useful if wording is softened

**Classification:** confirmed overstatement (integrity vs immutability). Severity: important, not critical for beginners if softened.

---

## Editorial recommendations (not docs falsehoods)

### Private repository ≠ inherently secure — Level 2 (echo risk in Level 20)

Level 2: “برای پروژه‌های شخصی و تمرینی Private امن‌تر است.”

GitHub docs: private repos restrict who can access them, but still require strong access controls, MFA, and audits. Visibility is not a complete security posture.

Source: [About repositories — security considerations for repository visibility](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)

**Classification:** editorial/security pedagogy issue. Prefer “کمتر در معرض عموم” over “امن‌تر”. Level 20’s hygiene list is closer to correct and should lead.

### VS Code as universal standard — Level 2

“برای طراح، VS Code انتخاب استاندارد است” is subjective. Recommend “پیشنهاد رایج / نقطهٔ شروع خوب” and mention GitHub Desktop already presented.

**Classification:** editorial. No official “standard editor” citation exists; product-design decision.

### Optional phase vs mandatory certificate — Levels 28–30 + certificate copy

- Phase 4 name: «فقط در صورت نیاز»
- Level 29 title includes «اختیاری»
- Certificate / intro / badge require all 30

**Classification:** product/curriculum coherence issue (important). Official Git docs do not resolve this; it is a course-design decision.

Options (do not implement in this PR):

- Make 28–29 truly optional for certificate, or
- Remove optional labeling, or
- Split “certificate track” vs “deepening track”

### Level 30 roadmap drift

Capstone text mentions Submodules / Monorepo / org repo management as phase-4 topics, but shipped levels 28–30 are Cherry-pick, Internals, and the capstone itself.

**Classification:** instructional sequencing / inventory mismatch (important).

### Restore / reset / revert distinctions — Levels 14–15

Teaching matches official separation:

- restore → working tree / index paths ([git-restore](https://git-scm.com/docs/git-restore))
- reset → move HEAD / rewrite local history ([git-reset](https://git-scm.com/docs/git-reset))
- revert → new commit undoing earlier commit ([git-revert](https://git-scm.com/docs/git-revert))

Keep; use as model for other command families.

### Push / fetch directions — Level 8

Directional table (`push` Local→Remote, `fetch`/`pull` Remote→Local) is correct. Keep; only fix the pull integration method.

---

## Instructional sequencing issues

1. **Pull semantics before rebase:** Level 8 asserts merge-only pull; rebase arrives at 27.
2. **SemVer / Release after DS need:** Level 17 sits in “professional” phase but is a prerequisite for Design System levels 23–24 — propose moving earlier in the Design System track.
3. **Cheat-sheet level 26** repeats prior command teaching; better as appendix/reference unlock than a scored gate.
4. **Early `git push` mention in Level 1** is fine as foreshadowing if labeled “later.”
5. **Optional deep levels gated for certificate** creates motivational contradiction with Phase 4 labeling.

---

## Quiz and exercise alignment issues

| Area | Finding |
| --- | --- |
| Scenario coverage | Strong on 4, 7, 8, 10, 11, 13, 14, 21 — exactly the high-risk skills |
| Missing scenarios | No scenario for stash, rebase force-with-lease, secrets revoke-first, token PR, CI red PR |
| Level 8 quiz | Reinforces incorrect “pull = fetch + merge” in why-text |
| Level 26 quiz | Tests memory of a reference list more than decision skill |
| Certificate claim | “قبولی در آزمون تمام سطح‌ها” is accurate to code, but overclaims external verification (local-only completion) — editorial honesty issue |

Accessibility notes for quizzes/exercises:

- Keyboard arrow navigation is guarded for unfinished quizzes (stabilization).
- Ensure conflict-marker examples remain copyable as text (not only screenshots).
- Scenario HTML uses `<code>` and escaped markers — good for screen readers if headings stay semantic.
- Pass threshold 70% with reveal-after-check is fair; consider announcing pass count (`need = ceil(n*0.7)`) more visibly (product UX, not audited as broken).

---

## Accessibility observations (curriculum / content layer)

- Persian RTL body with LTR `code`/`pre` isolation is appropriate.
- Icon-only UI controls rely on `aria-label` in shell (app layer); lesson bodies should keep meaningful headings (generally do).
- Diff/conflict lessons should continue to provide textual markers, not color alone.
- Certificate `contenteditable` name is escaped on render (stabilization) — good XSS hygiene; still remind learners certificate is course-issued, not third-party accredited.

---

## Priority recommendations

1. **Revise Level 8 + glossary pull definition + Level 8 quiz why-text** (critical).
2. **Resolve optional-vs-certificate conflict** for levels 28–29 (and Phase 4 naming) (important).
3. **Revise Level 2** Private/VS Code wording; align with Level 20 + GitHub visibility docs (important).
4. **Move Level 17** conceptually into Design System progression before 23–24 (important sequencing).
5. **Demote or merge Level 26** into a non-blocking reference (important).
6. **Soften Level 29 immutability** language (important).
7. **Fix Level 30 roadmap** to match actual levels 28–29 content (important).
8. Add scenarios for secrets + rebase lease + CI failure (enhancement).

**Recommended first level to revise after audit:** Level 8.

---

## Official sources

Used as technical authorities in this audit:

| Topic | URL |
| --- | --- |
| `git pull` integration (merge/rebase/config) | https://git-scm.com/docs/git-pull |
| `git fetch` | https://git-scm.com/docs/git-fetch |
| `git reset` | https://git-scm.com/docs/git-reset |
| `git restore` | https://git-scm.com/docs/git-restore |
| `git revert` | https://git-scm.com/docs/git-revert |
| Repository visibility & security considerations | https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories |

Product-design decisions (certificate scope, editor recommendation, track packaging) are **not** resolved by these sources and are marked as editorial above.

---

## Out of scope for this PR

- No edits to `data/levels.js`, quizzes, XP, badges, ranks, or application code
- No lesson rewrites
- Stabilization already merged to `main` via PR #4

---

## Resolution log (added after audit — original findings above are preserved)

The audit above is the original read-only review. The findings themselves are
unchanged; this section only records how each **critical** and **important**
curriculum-accuracy item was subsequently handled across the content revisions.
Revisions map to merged/opened branches:

- **Revision 1** — `feat/curriculum-revision-1` (PR #6, `content: correct push fetch and pull lessons`)
- **Revision 2** — `feat/curriculum-revision-2` (PR #7, `content: align optional track and certificate rules`)
- **Revision 3** — `content/curriculum-accuracy-final` (this branch, `content: resolve remaining curriculum accuracy issues`)

### Critical

| Audit issue | Level(s) | Status | Where |
| --- | --- | --- | --- |
| `git pull` taught as always `fetch + merge` (should be fetch + integrate: merge **or** rebase) | 8 + glossary + L8 quiz why + L8 scenario | **Resolved** | Revision 1 |

### Important

| Audit issue | Level(s) | Status | Where |
| --- | --- | --- | --- |
| Private repo presented as inherently “امن‌تر” (safer) rather than access-restricted | 2 | **Resolved** | Revision 3 |
| VS Code presented as the universal “استاندارد” (standard) editor | 2 | **Resolved** | Revision 3 |
| History overstated as “دستکاری‌ناپذیر” (immutable) — integrity ≠ immutability; local history is still rewritable via reset/rebase + force push | 29 (body + quiz why) | **Resolved** | Revision 3 |
| Level 29 labeled optional («اختیاری») while certificate requires all 30 | 29 | **Resolved** | Revision 2 |
| Phase 4 «فقط در صورت نیاز» vs mandatory-all-30 certificate gate | 28–30 + `phases.js` | **Resolved** | Revision 2 |
| Level 30 roadmap drift (Submodules / Monorepo / org-repo mentioned but not taught) | 30 phase-4 summary table | **Resolved** | Revision 2 |
| Rebase nuance for pull should cross-link Level 27 | 8 → 27 | **Resolved** | Revision 1 (L8 now points to Level 27) |
| “Private = safe” echo risk in security level | 20 | **No longer applicable** | Verified in Revision 3: Level 20 already frames Private/Public as *visibility* (“Public یعنی هر کسی روی اینترنت می‌بیند”), leads with secrets-never-committed, and does not claim private = secure |
| Move Level 17 (Tag/Release) earlier for Design System track | 17 | **Deferred** | Structural reordering; out of scope for an accuracy-only revision (level order and IDs preserved). Tracked in `curriculum-map.md` Part B |
| Demote / merge Level 26 (CLI cheat-sheet) into a non-blocking reference | 26 | **Deferred** | Changes completion gating and level structure; out of scope for an accuracy-only revision. Tracked in `curriculum-map.md` Part B |

### Accuracy areas re-verified in Revision 3 as already correct (no change made)

To avoid rewriting correct lessons only for style, these were inspected and left
as-is:

- **Git vs GitHub** distinction — Level 1 table + quiz clearly separate the tool from the hosting platform.
- **restore / reset / revert** — Level 14 keeps them distinct (working tree / history rewrite / new reversing commit), not collapsed into “undo”.
- **switch vs checkout** — Level 7 callout describes `checkout` as the older multi-purpose command, `switch`/`restore` as clearer modern intent; no deprecation/removal claim.
- **Merge conflict** — Level 10 states “Conflict خطا نیست؛ درخواست تصمیم انسانی است”, keeps markers as inspectable text, and pairs abort with its operation (`merge --abort`).
- **Pull Request terminology** — Level 11 explicitly separates `git pull` (local command) from Pull Request (GitHub process); not described as a Git command.
- **Branch protection / required checks** — Levels 19–20, 25 frame these as GitHub/repository configuration, not universal Git behavior.
- **Push / fetch / pull states & RTL diagrams** — Revision 1 content (remote-tracking distinction, source→destination labels) left intact.

### Technical sources for Revision 3

Same primary sources the original audit verified against (live re-fetch during
this revision was blocked by the session network policy, `403`; the corrections
match the audit’s prior primary-source verification):

- Repository visibility & security considerations — https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories
- `git reset` (local history rewrite) — https://git-scm.com/docs/git-reset
- `git rebase` (history rewrite + force-push implications) — https://git-scm.com/docs/git-rebase
