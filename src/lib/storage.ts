import { type ConstraintSelection } from "@/modules/types";

export const HISTORY_KEY = "solution-atlas-history";
export const FAVORITES_KEY = "solution-atlas-favorites";
export const MODULE_KEY = "solution-atlas-module";
export const MICRO_PLANS_KEY = "solution-atlas-microplans";

export interface MicroPlan {
  id: string;
  title: string;
  archetype: string;
  moduleId: string;
  moduleLabel: string;
  suggestionId: string;
  timestamp: number;
  problemSnapshot: string;
  constraintsSnapshot: ConstraintSelection;
}

export function loadFavorites(): Set<string> {
  const saved = typeof window !== "undefined" ? localStorage.getItem(FAVORITES_KEY) : null;
  if (!saved) return new Set();

  try {
    return new Set(JSON.parse(saved));
  } catch (error) {
    console.error("Unable to load favorites", error);
    return new Set();
  }
}

export function persistFavorites(favorites: Set<string>) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

export function loadHistory(): string[] {
  const saved = typeof window !== "undefined" ? localStorage.getItem(HISTORY_KEY) : null;
  if (!saved) return [];

  try {
    return JSON.parse(saved) as string[];
  } catch (error) {
    console.error("Unable to load history", error);
    return [];
  }
}

export function persistHistory(entries: string[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function loadMicroPlans(): MicroPlan[] {
  const saved = typeof window !== "undefined" ? localStorage.getItem(MICRO_PLANS_KEY) : null;
  if (!saved) return [];

  try {
    return JSON.parse(saved) as MicroPlan[];
  } catch (error) {
    console.error("Unable to load micro-plans", error);
    return [];
  }
}

export function persistMicroPlans(plans: MicroPlan[]) {
  localStorage.setItem(MICRO_PLANS_KEY, JSON.stringify(plans));
}
