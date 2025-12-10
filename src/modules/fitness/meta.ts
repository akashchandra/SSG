import { type ModuleMeta } from "../types";

export const fitnessMeta: ModuleMeta = {
  id: "fitness",
  label: "Fitness Momentum",
  shortDescription: "Small, sustainable moves to regain energy and strength without burnout.",
  archetypeLabels: {
    "quick-wins": {
      name: "Instant Activation",
      summary: "Tiny moves that wake up your body without prep or equipment."
    },
    "lean-experiments": {
      name: "Micro Experiments",
      summary: "Short trials to find workouts you actually enjoy and can repeat."
    },
    "workflow-upgrades": {
      name: "Routine Upgrades",
      summary: "Systems, cues, and prep that make workouts easier to start."
    },
    collaboration: {
      name: "Accountability",
      summary: "Use partners, coaches, and light commitments to stay consistent."
    },
    research: {
      name: "Body Insights",
      summary: "Quick diagnostics to track progress and prevent injuries."
    },
    outsourcing: {
      name: "Smart Support",
      summary: "Buy back time or guidance so you can focus on showing up."
    }
  }
};
