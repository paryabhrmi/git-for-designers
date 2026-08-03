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

const errors = [];
const err = (m) => errors.push(m);
const lvlIds = new Set(LEVELS.map((l) => l.id));
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

/* ---------- report ---------- */
if (errors.length) {
  console.error(`✗ validate: ${errors.length} problem(s)`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log('✓ validate: all invariants pass');
console.log(`  levels=${LEVELS.length} tracks=${TRACKS.length} missions=${MISSIONS.length} badges=${BADGES.length} glossary=${GLOSSARY.length}`);
console.log(`  mission IDs: ${MISSION_IDS.join(', ')}`);
process.exit(0);
