import { type ModuleMeta } from "../types";

export const productivityMeta: ModuleMeta = {
  id: "productivity",
  label: "Productivity Momentum",
  shortDescription: "Pragmatic moves to ship faster with limited time, energy, and budget.",
  archetypeLabels: {
    "quick-wins": {
      name: "Quick Wins",
      summary: "Fastest paths with minimal overhead to unlock immediate progress."
    },
    "lean-experiments": {
      name: "Lean Experiments",
      summary: "Test assumptions with tiny, low-risk pilots before investing more."
    },
    "workflow-upgrades": {
      name: "Workflow Upgrades",
      summary: "Tighten execution with automation, templates, and small process fixes."
    },
    collaboration: {
      name: "Collaboration",
      summary: "Leverage partners, mentors, and lightweight delegation to move faster."
    },
    research: {
      name: "Research & Clarity",
      summary: "Build confidence with targeted research, benchmarks, and de-risking steps."
    },
    outsourcing: {
      name: "Outsourcing",
      summary: "Shift execution to partners when speed matters more than hands-on control."
    }
  }
};
