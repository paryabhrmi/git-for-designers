#!/usr/bin/env node
/**
 * Repository invariant validator for Git for Designers.
 *
 * Dependency-free. Run from the repository root:
 *   node scripts/validate.mjs
 *
 * Imports the pure data modules and checks the invariants that keep the
 * curriculum, tracks, missions, storage identifiers, and content routes
 * consistent. Modifies no files. Exits 0 on success, non-zero on failure.
 */
import { LEVELS } from '../data/levels.js';
import { SCENARIO } from '../data/scenarios.js';
import { GLOSSARY } from '../data/glossary.js';
import { PHASES } from '../data/phases.js';
import { RANKS } from '../data/ranks.js';
import { TRACKS, TRACK_BY_ID } from '../data/tracks.js';
import { MISSIONS, MISSION_BY_ID, MISSION_IDS } from '../data/missions.js';
import { BADGES } from '../data/badges.js';
import { STRINGS, LANGS } from '../js/i18n.js';
import { EN_LEVELS } from '../data/en/levels.js';
import { EN_SCENARIO, EN_GLOSSARY, EN_TRACKS, EN_MISSIONS, EN_BADGES, EN_RANKS, EN_PHASES } from '../data/en/content.js';
import { PHASES as FA_PHASES } from '../data/phases.js';

const errors = [];
const err = (m) => errors.push(m);
const lvlIds = new Set(LEVELS.map((l) => l.id));
const RAW_QUIZ_BY_ID = LEVELS.reduce((m, l) => { m[l.id] = l.quiz; return m; }, {});
const trackIds = new Set(TRACKS.map((t) => t.id));
const REQUIRED_TRACKS = ['core', 'ai-prototype', 'design-system', 'design-technologist'];
const EXPECTED_MISSIONS = ['core-ship-change', 'ai-safe-checkpoint', 'ds-token-conflict', 'dt-clean-branch'];
const STATIC_ROUTES = new Set(['#/intro', '#/glossary', '#/certificate', '#/tracks', '#/missions']);

/** A content route href must resolve to a real destination. */
function routeResolves(href) {
  if (typeof href !== 'string' || !href.startsWith('#/')) return false;
  if (STATIC_ROUTES.has(href)) return true;
  let m;
  if ((m = href.match(/^#\/level-(\d+)$/))) return lvlIds.has(Number(m[1]));
  if ((m = href.match(/^#\/track-([a-z0-9-]+)$/))) return trackIds.has(m[1]);
  if ((m = href.match(/^#\/mission-([a-z0-9-]+)$/))) return !!MISSION_BY_ID[m[1]];
  return false;
}

/* ---------- levels + quizzes ---------- */
if (LEVELS.length !== 30) err(`expected 30 levels, got ${LEVELS.length}`);
if (lvlIds.size !== LEVELS.length) err('duplicate level IDs');
for (let i = 1; i <= 30; i++) if (!lvlIds.has(i)) err(`missing level id ${i}`);
LEVELS.forEach((l, i) => {
  if (l.id !== i + 1) err(`level at index ${i} has id ${l.id} (order changed)`);
  if (!l.title || !l.title.trim()) err(`level ${l.id} empty title`);
  if (!l.body || l.body.trim().length < 20) err(`level ${l.id} empty/short body`);
  if (!Array.isArray(l.quiz) || l.quiz.length === 0) err(`level ${l.id} has no quiz`);
  (l.quiz || []).forEach((q, qi) => {
    if (typeof q.q !== 'string' || !q.q.trim()) err(`level ${l.id} q${qi} empty question`);
    if (!Array.isArray(q.o) || q.o.length < 2) err(`level ${l.id} q${qi} bad options`);
    if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length) err(`level ${l.id} q${qi} answer index out of range`);
    if (typeof q.why !== 'string' || !q.why.trim()) err(`level ${l.id} q${qi} empty explanation`);
  });
});

/* ---------- scenarios ---------- */
Object.keys(SCENARIO).forEach((k) => {
  if (!lvlIds.has(Number(k))) err(`scenario references non-existent level ${k}`);
  (SCENARIO[k] || []).forEach((s, si) => {
    if (!s.q || !s.q.trim()) err(`scenario ${k}[${si}] empty question`);
    if (!Array.isArray(s.o) || typeof s.a !== 'number' || s.a < 0 || s.a >= s.o.length) err(`scenario ${k}[${si}] bad answer index`);
    if (!s.why || !s.why.trim()) err(`scenario ${k}[${si}] empty explanation`);
  });
});

/* ---------- glossary ---------- */
const gKeys = GLOSSARY.map((g) => g.t);
if (new Set(gKeys).size !== gKeys.length) err('duplicate glossary keys');
GLOSSARY.forEach((g) => { if (!g.t || !g.d) err(`glossary entry missing term/definition: ${g.t}`); });

/* ---------- phases + ranks ---------- */
if (!Array.isArray(PHASES) || !PHASES.length) err('no phases');
if (PHASES[0].from !== 1) err('phases do not start at 1');
if (PHASES[PHASES.length - 1].to !== 30) err('phases do not end at 30');
for (let i = 1; i < PHASES.length; i++) if (PHASES[i].from !== PHASES[i - 1].to + 1) err(`phase gap at ${PHASES[i].from}`);
if (!Array.isArray(RANKS) || !RANKS.length) err('no ranks');

/* ---------- tracks ---------- */
if (TRACKS.length !== 4) err(`expected 4 tracks, got ${TRACKS.length}`);
if (trackIds.size !== TRACKS.length) err('duplicate track IDs');
REQUIRED_TRACKS.forEach((id) => { if (!trackIds.has(id)) err(`required track id missing: ${id}`); });
const coverage = {};
TRACKS.forEach((t) => {
  if (!Array.isArray(t.levelIds) || !t.levelIds.length) err(`track ${t.id} has no levels`);
  const seen = new Set();
  t.levelIds.forEach((id) => {
    if (!lvlIds.has(id)) err(`track ${t.id} references non-existent level ${id}`);
    if (seen.has(id)) err(`track ${t.id} lists level ${id} twice`);
    seen.add(id);
    coverage[id] = (coverage[id] || 0) + 1;
  });
  (t.prerequisiteTrackIds || []).forEach((p) => {
    if (!trackIds.has(p)) err(`track ${t.id} prereq ${p} does not exist`);
    if (p === t.id) err(`track ${t.id} is its own prereq`);
  });
  (t.recommendedNextTrackIds || []).forEach((n) => { if (!trackIds.has(n)) err(`track ${t.id} recommendedNext ${n} missing`); });
});
for (let i = 1; i <= 30; i++) {
  if (!coverage[i]) err(`level ${i} belongs to no track`);
  if (coverage[i] > 1) err(`level ${i} belongs to ${coverage[i]} tracks (single-ownership expected)`);
}
const required = TRACKS.filter((t) => t.kind === 'required');
if (required.length !== 1 || required[0].id !== 'core') err(`expected exactly one required track (core)`);
// no prerequisite cycle
function cycle(id, seen = new Set()) {
  if (seen.has(id)) return true;
  seen.add(id);
  return (TRACK_BY_ID[id].prerequisiteTrackIds || []).some((p) => cycle(p, new Set(seen)));
}
TRACKS.forEach((t) => { if (cycle(t.id)) err(`circular prerequisite involving ${t.id}`); });

/* ---------- missions ---------- */
if (MISSIONS.length !== EXPECTED_MISSIONS.length) err(`expected ${EXPECTED_MISSIONS.length} missions, got ${MISSIONS.length}`);
EXPECTED_MISSIONS.forEach((id) => { if (!MISSION_BY_ID[id]) err(`expected mission missing: ${id}`); });
const mSeen = new Set();
MISSIONS.forEach((m) => {
  if (mSeen.has(m.id)) err(`duplicate mission id ${m.id}`);
  mSeen.add(m.id);
  if (!trackIds.has(m.trackId)) err(`mission ${m.id} bad trackId ${m.trackId}`);
  (m.levelIds || []).forEach((id) => { if (!lvlIds.has(id)) err(`mission ${m.id} references non-existent level ${id}`); });
  if (!Array.isArray(m.objectives) || !m.objectives.length) err(`mission ${m.id} has no objectives`);
  if (!m.completionMessage || !m.completionMessage.trim()) err(`mission ${m.id} has no completion message`);
  if (!m.nextAction || !m.nextAction.label || !m.nextAction.href) err(`mission ${m.id} has no next action`);
  else if (!routeResolves(m.nextAction.href)) err(`mission ${m.id} nextAction href does not resolve: ${m.nextAction.href}`);
  if (!Array.isArray(m.steps) || !m.steps.length) err(`mission ${m.id} has no steps`);
  const stepIds = new Set();
  (m.steps || []).forEach((s) => {
    if (stepIds.has(s.id)) err(`mission ${m.id} duplicate step id ${s.id}`);
    stepIds.add(s.id);
    if (!s.situation || !s.situation.trim()) err(`mission ${m.id}/${s.id} empty situation`);
    if (!s.hint || !s.hint.trim()) err(`mission ${m.id}/${s.id} no hint`);
    if (!s.explanation || !s.explanation.trim()) err(`mission ${m.id}/${s.id} no explanation`);
    if (!Array.isArray(s.choices) || s.choices.length < 2) err(`mission ${m.id}/${s.id} needs >= 2 choices`);
    const cIds = new Set();
    let correctFound = false;
    (s.choices || []).forEach((c) => {
      if (cIds.has(c.id)) err(`mission ${m.id}/${s.id} duplicate choice id ${c.id}`);
      cIds.add(c.id);
      if (!c.feedback || !c.feedback.trim()) err(`mission ${m.id}/${s.id}/${c.id} no feedback`);
      if (!['correct', 'unsafe', 'risky', 'incorrect'].includes(c.tone)) err(`mission ${m.id}/${s.id}/${c.id} bad tone ${c.tone}`);
      if (c.id === s.correct) correctFound = true;
    });
    if (!s.correct || !correctFound) err(`mission ${m.id}/${s.id} correct choice missing`);
    else {
      const cc = s.choices.find((c) => c.id === s.correct);
      if (cc && cc.tone !== 'correct') err(`mission ${m.id}/${s.id} correct choice tone must be 'correct'`);
    }
  });
});
// every track has at least one mission
REQUIRED_TRACKS.forEach((t) => { if (!MISSIONS.some((m) => m.trackId === t)) err(`no mission covers track ${t}`); });

/* ---------- badges (reward integrity) ---------- */
const bIds = BADGES.map((b) => b.id);
if (new Set(bIds).size !== bIds.length) err('duplicate badge IDs');
if (!BADGES.some((b) => b.id === 'missions')) err('missions badge missing');
if (BADGES[BADGES.length - 1].id !== 'all') err(`last badge should be 'all' (completion hero), got '${BADGES[BADGES.length - 1].id}'`);

/* ---------- i18n shell catalog ---------- */
if (!Array.isArray(LANGS) || LANGS[0] !== 'fa' || !LANGS.includes('en')) err('LANGS must default to fa and include en');
Object.entries(STRINGS).forEach(([key, entry]) => {
  if (!entry || typeof entry !== 'object') { err(`i18n key ${key} is not an object`); return; }
  LANGS.forEach((l) => {
    if (typeof entry[l] !== 'string' || !entry[l].trim()) err(`i18n key ${key} missing/empty '${l}' string`);
  });
});


/* ---------- locale parity (Phase 5B) ---------- */
// Case-sensitive on the ALL-CAPS markers so legitimate prose ("Todo" as a kanban
// column name in level 18) is not flagged as an untranslated placeholder.
const PLACEHOLDER = /\b(TODO|TBD|FIXME|TRANSLATE|ENGLISH HERE)\b|\b(lorem ipsum|untranslated)\b/;
const PERSIAN = /[؀-ۿ]/;
const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;

function checkEn(path, value) {
  if (!nonEmpty(value)) { err(`en ${path}: empty/missing`); return; }
  if (PLACEHOLDER.test(value)) err(`en ${path}: contains a translation placeholder`);
  if (PERSIAN.test(value)) err(`en ${path}: contains Persian characters`);
}

// levels: same count, same IDs, same order, complete text, quiz shape parity
if (EN_LEVELS.length !== LEVELS.length) err(`en levels ${EN_LEVELS.length} != fa ${LEVELS.length}`);
LEVELS.forEach((fa, i) => {
  const en = EN_LEVELS[i];
  if (!en) { err(`en level missing at index ${i} (fa id ${fa.id})`); return; }
  if (en.id !== fa.id) err(`en level order mismatch at index ${i}: ${en.id} != ${fa.id}`);
  checkEn(`level ${fa.id}.title`, en.title);
  checkEn(`level ${fa.id}.subtitle`, en.subtitle);
  checkEn(`level ${fa.id}.body`, en.body);
  const faQuiz = RAW_QUIZ_BY_ID[fa.id] || [];
  if (!Array.isArray(en.quiz) || en.quiz.length !== faQuiz.length) {
    err(`en level ${fa.id}: quiz length ${en.quiz ? en.quiz.length : 'missing'} != fa ${faQuiz.length}`);
  } else {
    faQuiz.forEach((fq, qi) => {
      const eq = en.quiz[qi];
      checkEn(`level ${fa.id} q${qi}.q`, eq.q);
      checkEn(`level ${fa.id} q${qi}.why`, eq.why);
      if (!Array.isArray(eq.o) || eq.o.length !== fq.o.length) err(`en level ${fa.id} q${qi}: option count ${eq.o ? eq.o.length : '?'} != fa ${fq.o.length}`);
      else eq.o.forEach((o, oi) => checkEn(`level ${fa.id} q${qi}.o[${oi}]`, o));
    });
  }
});

// scenarios: same level keys, same lengths, same option counts
Object.keys(SCENARIO).forEach((k) => {
  const faArr = SCENARIO[k], enArr = EN_SCENARIO[k];
  if (!Array.isArray(enArr) || enArr.length !== faArr.length) { err(`en scenario ${k}: length mismatch`); return; }
  faArr.forEach((fs, i) => {
    checkEn(`scenario ${k}[${i}].q`, enArr[i].q);
    checkEn(`scenario ${k}[${i}].why`, enArr[i].why);
    if (!Array.isArray(enArr[i].o) || enArr[i].o.length !== fs.o.length) err(`en scenario ${k}[${i}]: option count mismatch`);
  });
});
Object.keys(EN_SCENARIO).forEach((k) => { if (!SCENARIO[k]) err(`en scenario ${k} has no fa counterpart`); });

// glossary: index-aligned, complete
if (EN_GLOSSARY.length !== GLOSSARY.length) err(`en glossary ${EN_GLOSSARY.length} != fa ${GLOSSARY.length}`);
EN_GLOSSARY.forEach((g, i) => { checkEn(`glossary[${i}].t`, g.t); checkEn(`glossary[${i}].d`, g.d); });

// tracks: same IDs, complete text
TRACKS.forEach((t) => {
  const e = EN_TRACKS.find((x) => x.id === t.id);
  if (!e) { err(`en track ${t.id} missing`); return; }
  ['shortTitle', 'title', 'audience', 'description', 'completionMessage', 'difficulty'].forEach((f) => checkEn(`track ${t.id}.${f}`, e[f]));
});
if (EN_TRACKS.length !== TRACKS.length) err(`en tracks ${EN_TRACKS.length} != fa ${TRACKS.length}`);

// missions: same IDs, step IDs, choice IDs, complete feedback
MISSIONS.forEach((m) => {
  const e = EN_MISSIONS.find((x) => x.id === m.id);
  if (!e) { err(`en mission ${m.id} missing`); return; }
  ['title', 'shortDescription', 'context', 'completionMessage', 'nextActionLabel', 'difficulty'].forEach((f) => checkEn(`mission ${m.id}.${f}`, e[f]));
  if (!Array.isArray(e.objectives) || e.objectives.length !== m.objectives.length) err(`en mission ${m.id}: objective count mismatch`);
  else e.objectives.forEach((o, i) => checkEn(`mission ${m.id}.objectives[${i}]`, o));
  if (!Array.isArray(e.steps) || e.steps.length !== m.steps.length) { err(`en mission ${m.id}: step count mismatch`); return; }
  m.steps.forEach((s, i) => {
    const es = e.steps[i];
    if (es.id !== s.id) err(`en mission ${m.id} step ${i}: id ${es.id} != fa ${s.id}`);
    checkEn(`mission ${m.id}/${s.id}.situation`, es.situation);
    checkEn(`mission ${m.id}/${s.id}.explanation`, es.explanation);
    checkEn(`mission ${m.id}/${s.id}.hint`, es.hint);
    if (s.stateNote) checkEn(`mission ${m.id}/${s.id}.stateNote`, es.stateNote);
    if (!Array.isArray(es.choices) || es.choices.length !== s.choices.length) { err(`en mission ${m.id}/${s.id}: choice count mismatch`); return; }
    s.choices.forEach((c, j) => {
      if (es.choices[j].id !== c.id) err(`en mission ${m.id}/${s.id}: choice id ${es.choices[j].id} != fa ${c.id}`);
      checkEn(`mission ${m.id}/${s.id}/${c.id}.label`, es.choices[j].label);
      checkEn(`mission ${m.id}/${s.id}/${c.id}.feedback`, es.choices[j].feedback);
    });
  });
});
if (EN_MISSIONS.length !== MISSIONS.length) err(`en missions ${EN_MISSIONS.length} != fa ${MISSIONS.length}`);

// badges / ranks / phases
BADGES.forEach((b) => {
  const e = EN_BADGES.find((x) => x.id === b.id);
  if (!e) { err(`en badge ${b.id} missing`); return; }
  checkEn(`badge ${b.id}.t`, e.t); checkEn(`badge ${b.id}.d`, e.d);
});
if (EN_RANKS.length !== RANKS.length) err(`en ranks ${EN_RANKS.length} != fa ${RANKS.length}`);
EN_RANKS.forEach((r, i) => checkEn(`rank[${i}]`, r));
if (EN_PHASES.length !== FA_PHASES.length) err(`en phases ${EN_PHASES.length} != fa ${FA_PHASES.length}`);
EN_PHASES.forEach((p, i) => checkEn(`phase[${i}]`, p));

// UI catalog: no placeholder, no Persian leaking into en values.
// Exception: the language switcher intentionally names the *other* language in
// its own script (endonym), so «فارسی» inside an English label is correct.
const ENDONYM_KEYS = new Set(['top.lang']);
Object.entries(STRINGS).forEach(([key, entry]) => {
  if (entry && typeof entry.en === 'string') {
    if (PLACEHOLDER.test(entry.en)) err(`i18n ${key}.en: placeholder`);
    if (PERSIAN.test(entry.en) && !ENDONYM_KEYS.has(key)) err(`i18n ${key}.en: contains Persian characters`);
  }
});

/* ---------- report ---------- */
if (errors.length) {
  console.error(`✗ validate: ${errors.length} problem(s)`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log('✓ validate: all invariants pass');
console.log(`  levels=${LEVELS.length} tracks=${TRACKS.length} missions=${MISSIONS.length} badges=${BADGES.length} glossary=${GLOSSARY.length}`);
console.log(`  mission IDs: ${MISSION_IDS.join(', ')}`);
console.log(`  locale parity: fa + en (levels ${EN_LEVELS.length}, glossary ${EN_GLOSSARY.length}, tracks ${EN_TRACKS.length}, missions ${EN_MISSIONS.length})`);
process.exit(0);
