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
}

export interface Archetype {
  id: string;
  name: string;
  summary: string;
  suggestions: Suggestion[];
}

const timeWeight: Record<TimeBudget, number> = {
  "5m": 0,
  "30m": 1,
  "1-2h": 2,
  "3h+": 3
};

const energyWeight: Record<EnergyLevel, number> = {
  low: 0,
  medium: 1,
  high: 2
};

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

const archetypes: Archetype[] = [
  {
    id: "quick-wins",
    name: "Quick Wins",
    summary: "Fastest paths with minimal overhead to unlock immediate progress.",
    suggestions: [
      {
        id: "quick-wins-journal",
        title: "Write a 5-line action journal",
        effort: "light",
        timeEstimate: "5 minutes",
        rationale: "Break the problem into the next two moves and a simple checklist.",
        energy: "low",
        time: "5m",
        budget: "$0"
      },
      {
        id: "quick-wins-template",
        title: "Reuse a proven template",
        effort: "light",
        timeEstimate: "15 minutes",
        rationale: "Start from a ready-made outline or SOP instead of drafting from scratch.",
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "quick-wins-decision",
        title: "Make a 30-minute decision sprint",
        effort: "moderate",
        timeEstimate: "30 minutes",
        rationale: "List options, pick one good-enough path, and schedule the first block.",
        energy: "medium",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "lean-experiments",
    name: "Lean Experiments",
    summary: "Test assumptions with tiny, low-risk pilots before investing more.",
    suggestions: [
      {
        id: "lean-experiments-prototype",
        title: "Sketch a disposable prototype",
        effort: "moderate",
        timeEstimate: "30-60 minutes",
        rationale: "Mock the core flow on paper or in a whiteboard tool to expose gaps early.",
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      },
      {
        id: "lean-experiments-signal",
        title: "Post a signal test",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Share a concise value prop to a small audience and track reactions or replies.",
        energy: "low",
        time: "30m",
        budget: "$1-20"
      },
      {
        id: "lean-experiments-diary",
        title: "Run a one-day diary study",
        effort: "moderate",
        timeEstimate: "1-2 hours",
        rationale: "Ask 3 people to note friction points while attempting the task and summarize themes.",
        energy: "medium",
        time: "1-2h",
        budget: "$20-100"
      }
    ]
  },
  {
    id: "workflow-upgrades",
    name: "Workflow Upgrades",
    summary: "Tighten execution with automation, templates, and small process fixes.",
    suggestions: [
      {
        id: "workflow-upgrades-automation",
        title: "Automate a repetitive step",
        effort: "moderate",
        timeEstimate: "1-2 hours",
        rationale: "Use existing tools or scripts to remove a manual handoff that slows delivery.",
        energy: "medium",
        time: "1-2h",
        budget: "$1-20"
      },
      {
        id: "workflow-upgrades-checklist",
        title: "Ship with a checklist",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Codify the must-do steps into a runbook so you avoid stalls and rework.",
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "workflow-upgrades-blocks",
        title: "Block calendar focus windows",
        effort: "light",
        timeEstimate: "10 minutes",
        rationale: "Reserve two focused blocks and protect them with meeting guards and notifications off.",
        energy: "low",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "collaboration",
    name: "Collaboration",
    summary: "Leverage partners, mentors, and lightweight delegation to move faster.",
    suggestions: [
      {
        id: "collaboration-mentor",
        title: "Book a 30-minute mentor review",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Share a concise brief and get pointed feedback on blind spots before you execute.",
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "collaboration-buddy",
        title: "Pair with a buddy",
        effort: "moderate",
        timeEstimate: "1 hour",
        rationale: "Co-work to reduce procrastination and make decisions together in real time.",
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      },
      {
        id: "collaboration-freelancer",
        title: "Hire a micro-freelancer",
        effort: "light",
        timeEstimate: "1-2 hours of your time",
        rationale: "Outsource a well-defined subtask with a clear brief and acceptance criteria.",
        energy: "low",
        time: "1-2h",
        budget: "$20-100"
      }
    ]
  },
  {
    id: "research",
    name: "Research & Clarity",
    summary: "Build confidence with targeted research, benchmarks, and de-risking steps.",
    suggestions: [
      {
        id: "research-scan",
        title: "Complete a 3-source scan",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Review the top 3 credible sources and capture 5 insights to guide scope.",
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "research-constraints",
        title: "Define success and constraints",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "List desired outcomes, hard constraints, and non-goals to prevent scope creep.",
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "research-expert",
        title: "Ask an expert three questions",
        effort: "moderate",
        timeEstimate: "45 minutes",
        rationale: "Draft pointed questions and reach out to one practitioner for fast answers.",
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      }
    ]
  },
  {
    id: "outsourcing",
    name: "Outsourcing",
    summary: "Shift execution to partners when speed matters more than hands-on control.",
    suggestions: [
      {
        id: "outsourcing-brief",
        title: "Write a crisp outsource brief",
        effort: "moderate",
        timeEstimate: "45 minutes",
        rationale: "Package context, deliverables, timeline, and definition of done before delegating.",
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      },
      {
        id: "outsourcing-marketplace",
        title: "Post a micro-task to a marketplace",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Publish the brief with a small budget cap to get rapid candidates.",
        energy: "low",
        time: "30m",
        budget: "$20-100"
      },
      {
        id: "outsourcing-agency",
        title: "Book a discovery call",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Schedule a short call with a specialist agency to understand scope, cost, and fit.",
        energy: "low",
        time: "30m",
        budget: "$100+"
      }
    ]
  }
];

function frictionScore(selection: ConstraintSelection, suggestion: Suggestion) {
  const timeGap = Math.abs(timeWeight[selection.time] - timeWeight[suggestion.time]);
  const energyGap = Math.abs(
    energyWeight[selection.energy] - energyWeight[suggestion.energy]
  );
  const budgetGap = Math.abs(
    budgetWeight[selection.budget] - budgetWeight[suggestion.budget]
  );

  return timeGap * 2 + energyGap * 1.5 + budgetGap;
}

export function generateSolutionPaths(selection: ConstraintSelection): Archetype[] {
  return archetypes.map((archetype) => {
    const ranked = [...archetype.suggestions].sort(
      (a, b) => frictionScore(selection, a) - frictionScore(selection, b)
    );
    return {
      ...archetype,
      suggestions: ranked.slice(0, 3)
    };
  });
}

export function formatConstraintLabel(selection: ConstraintSelection) {
  return `${selection.energy} energy • ${selection.time} • ${budgetLabel[selection.budget]}`;
}

export function formatBudgetLabel(budget: CostBudget) {
  return budgetLabel[budget];
}
