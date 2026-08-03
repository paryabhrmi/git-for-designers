# Contributing to Git for Designers

Thanks for your interest. This project has a deliberately small, stable
architecture — most contributions are content accuracy fixes, accessibility
improvements, and bug fixes, not new infrastructure.

## Architecture constraints (please keep these)

- **Static only:** HTML + CSS + native JavaScript ES modules. No framework, no
  bundler, no required build step, no backend.
- **No runtime package dependencies.** Fonts and icons are vendored locally in
  `assets/`; do not add CDN scripts, remote fonts, or remote icons.
- **No analytics or tracking.** The app makes no network requests at runtime and
  uploads no learner data.
- **Stable identifiers:** level IDs (1–30), track IDs (`core`, `ai-prototype`,
  `design-system`, `design-technologist`), mission IDs, badge IDs, and the
  localStorage key `git-course-fa-v3` are load-bearing. Do not rename them —
  learners' stored progress depends on them.

## Local setup

```bash
git clone <your-fork-url>
cd git-for-designers
python3 -m http.server 8000   # any static server works
# open http://localhost:8000/
```

ES modules require an HTTP origin, so `file://` won't work.

## Validation

Before opening a pull request, run:

```bash
node scripts/validate.mjs
```

and syntax-check any JavaScript you touched:

```bash
node --check path/to/file.js
```

CI runs the same checks on every PR to `main`.

## Persian, RTL, and content rules

- UI text is Persian and the layout is RTL. Use Persian half-spaces (نیم‌فاصله)
  correctly and keep terminology consistent with the existing glossary.
- **Git commands stay in English and LTR** (`dir="ltr"` / the existing code
  styles handle this). Never translate command names or flags.
- Keep **Git vs GitHub** distinct: Pull Requests, Issues, and branch protection
  are platform features, not Git commands.
- Technical claims must match official documentation
  ([git-scm.com/docs](https://git-scm.com/docs),
  [docs.github.com](https://docs.github.com)). Do not cite blogs as authorities.
- Mission and quiz feedback must explain *why* — never just "درست/غلط" — and
  never present destructive commands (`reset --hard`, force push) as safe
  defaults for shared history.
- Simulated commands must stay clearly labelled as simulations; nothing may
  imply real execution.

## Data-model quick reference

- `data/levels.js` — 30 levels (`{id, title, subtitle, branch, body, quiz}`)
- `data/scenarios.js` — extra scenario quiz items merged into levels at runtime
- `data/tracks.js` — four tracks referencing level IDs
- `data/missions.js` — guided-practice missions referencing level IDs
- `data/glossary.js`, `data/badges.js`, `data/ranks.js`, `data/phases.js`

Content references IDs; nothing is duplicated. If you add or change content,
`node scripts/validate.mjs` must still pass.

## Branch and pull-request workflow

- Branch from the latest `main`; never commit directly to `main`.
- Use a descriptive branch name (`fix/...`, `content/...`, `docs/...`).
- Keep PRs small and focused; describe what changed and why, and list the
  validation you ran.
- PRs are reviewed before merging; CI must pass.
