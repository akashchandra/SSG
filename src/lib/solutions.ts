import {
  type ArchetypeResult,
  ARCHETYPE_ORDER,
  type ConstraintSelection,
  type CostBudget,
  type EnergyLevel,
  type ModuleDefinition,
  type Suggestion,
  type TimeBudget
} from "@/modules/types";

const timeWeight: Record<TimeBudget, number> = {
  "5m": 0,
  "30m": 1,
  "1-2h": 2,
  "3h+": 3
};

const energyWeight = {
  low: 0,
  medium: 1,
  high: 2
} as const;

const budgetWeight: Record<CostBudget, number> = {
  "$0": 0,
  "$1-20": 1,
  "$20-100": 2,
  "$100+": 3
};

const budgetLabel: Record<CostBudget, string> = {
  "$0": "$0",
  "$1-20": "$1–$20",
  "$20-100": "$20–$100",
  "$100+": "$100+"
};

const energyWeightTyped: Record<ConstraintSelection["energy"], number> = energyWeight;

function frictionScore(selection: ConstraintSelection, suggestion: Suggestion) {
  const timeGap = Math.abs(timeWeight[selection.time] - timeWeight[suggestion.time]);
  const energyGap = Math.abs(energyWeightTyped[selection.energy] - energyWeightTyped[suggestion.energy]);
  const budgetGap = Math.abs(budgetWeight[selection.budget] - budgetWeight[suggestion.budget]);

  return timeGap * 2 + energyGap * 1.5 + budgetGap;
}

function extractProblemKeywords(problem: string) {
  return new Set(
    (problem.toLowerCase().match(/[a-zA-Z]+/g) || [])
      .filter((word) => word.length >= 4)
      .map((word) => word)
  );
}

function keywordBonus(problemKeywords: Set<string>, suggestion: Suggestion) {
  const keywordTokens = (suggestion.keywords || [])
    .flatMap((keyword) => keyword.toLowerCase().split(/\s+/))
    .filter(Boolean);
  const matches = keywordTokens.filter((keyword) => problemKeywords.has(keyword));
  return matches.length * 0.6;
}

function suggestionScore(
  selection: ConstraintSelection,
  suggestion: Suggestion,
  problemKeywords: Set<string>
) {
  return frictionScore(selection, suggestion) - keywordBonus(problemKeywords, suggestion);
}

export function generateSolutionPaths(
  module: ModuleDefinition,
  selection: ConstraintSelection,
  problem = ""
): ArchetypeResult[] {
  const problemKeywords = extractProblemKeywords(problem);

  return ARCHETYPE_ORDER.map((archetypeId) => {
    const archetypeLabel = module.meta.archetypeLabels[archetypeId];
    const bank = module.bank.find((entry) => entry.id === archetypeId);
    const scored = [...(bank?.suggestions ?? [])]
      .map((suggestion) => ({
        suggestion,
        score: suggestionScore(selection, suggestion, problemKeywords)
      }))
      .sort((a, b) => a.score - b.score);
    const ranked = scored.map((entry) => entry.suggestion);
    const bestScore = scored[0]?.score ?? Number.POSITIVE_INFINITY;

    return {
      id: archetypeId,
      name: archetypeLabel.name,
      summary: archetypeLabel.summary,
      suggestions: ranked.slice(0, 3),
      score: bestScore
    };
  });
}

export function formatConstraintLabel(selection: ConstraintSelection) {
  return `${selection.energy} energy • ${selection.time} • ${budgetLabel[selection.budget]}`;
}

export function formatBudgetLabel(budget: CostBudget) {
  return budgetLabel[budget];
}

export function getFavoriteKey(moduleId: string, suggestionId: string) {
  return `${moduleId}:${suggestionId}`;
}

export type {
  ArchetypeResult as Archetype,
  ConstraintSelection,
  CostBudget,
  EnergyLevel,
  Suggestion,
  TimeBudget
} from "@/modules/types";
