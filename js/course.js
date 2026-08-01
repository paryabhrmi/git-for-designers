import { LEVELS as RAW_LEVELS } from '../data/levels.js';
import { SCENARIO } from '../data/scenarios.js';
import { PHASES } from '../data/phases.js';

/** Pure: returns new level objects; never mutates RAW_LEVELS or their quiz arrays. */
export function buildLevelsWithScenarios(levels = RAW_LEVELS, scenarios = SCENARIO) {
  return levels.map(l => ({
    ...l,
    quiz: scenarios[l.id] ? l.quiz.concat(scenarios[l.id]) : l.quiz.slice(),
  }));
}

export function getLevelWithScenarios(levelId, levels = RAW_LEVELS, scenarios = SCENARIO) {
  const l = levels.find(x => x.id === levelId);
  if (!l) return null;
  return {
    ...l,
    quiz: scenarios[l.id] ? l.quiz.concat(scenarios[l.id]) : l.quiz.slice(),
  };
}

export const LEVELS = buildLevelsWithScenarios();
export { PHASES };
