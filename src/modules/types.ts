export type EnergyLevel = "low" | "medium" | "high";
export type TimeBudget = "5m" | "30m" | "1-2h" | "3h+";
export type CostBudget = "$0" | "$1-20" | "$20-100" | "$100+";

export interface ConstraintSelection {
  energy: EnergyLevel;
  time: TimeBudget;
  budget: CostBudget;
}

export interface Suggestion {
  id: string;
  title: string;
  effort: "light" | "moderate" | "intensive";
  timeEstimate: string;
  rationale: string;
  energy: EnergyLevel;
  time: TimeBudget;
  budget: CostBudget;
  keywords?: string[];
}

export type ArchetypeId =
  | "quick-wins"
  | "lean-experiments"
  | "workflow-upgrades"
  | "collaboration"
  | "research"
  | "outsourcing";

export const ARCHETYPE_ORDER: ArchetypeId[] = [
  "quick-wins",
  "lean-experiments",
  "workflow-upgrades",
  "collaboration",
  "research",
  "outsourcing"
];

export interface ArchetypeLabel {
  name: string;
  summary: string;
}

export type ArchetypeLabelMap = Record<ArchetypeId, ArchetypeLabel>;

export interface ModuleMeta {
  id: string;
  label: string;
  shortDescription: string;
  archetypeLabels: ArchetypeLabelMap;
}

export interface ArchetypeBankEntry {
  id: ArchetypeId;
  suggestions: Suggestion[];
}

export interface ModuleDefinition {
  meta: ModuleMeta;
  bank: ArchetypeBankEntry[];
}

export interface ArchetypeResult {
  id: ArchetypeId;
  name: string;
  summary: string;
  suggestions: Suggestion[];
  score?: number;
}
