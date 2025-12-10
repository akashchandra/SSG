import { type ArchetypeBankEntry } from "../types";

export const productivityBank: ArchetypeBankEntry[] = [
  {
    id: "quick-wins",
    suggestions: [
      {
        id: "quick-wins-journal",
        title: "Write a 5-line action journal",
        effort: "light",
        timeEstimate: "5 minutes",
        rationale: "Break the problem into the next two moves and a simple checklist.",
        keywords: ["journal", "planning", "clarity"],
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
        keywords: ["template", "reuse", "outline"],
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
        keywords: ["decision", "prioritize", "schedule"],
        energy: "medium",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "lean-experiments",
    suggestions: [
      {
        id: "lean-experiments-prototype",
        title: "Sketch a disposable prototype",
        effort: "moderate",
        timeEstimate: "30-60 minutes",
        rationale: "Mock the core flow on paper or in a whiteboard tool to expose gaps early.",
        keywords: ["prototype", "mock", "design"],
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
        keywords: ["signal", "test", "audience"],
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
        keywords: ["research", "diary", "feedback"],
        energy: "medium",
        time: "1-2h",
        budget: "$20-100"
      }
    ]
  },
  {
    id: "workflow-upgrades",
    suggestions: [
      {
        id: "workflow-upgrades-automation",
        title: "Automate a repetitive step",
        effort: "moderate",
        timeEstimate: "1-2 hours",
        rationale: "Use existing tools or scripts to remove a manual handoff that slows delivery.",
        keywords: ["automation", "manual", "handoff"],
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
        keywords: ["checklist", "runbook", "process"],
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
        keywords: ["calendar", "focus", "blocks"],
        energy: "low",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "collaboration",
    suggestions: [
      {
        id: "collaboration-mentor",
        title: "Book a 30-minute mentor review",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Share a concise brief and get pointed feedback on blind spots before you execute.",
        keywords: ["mentor", "feedback", "review"],
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
        keywords: ["cowork", "accountability", "buddy"],
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
        keywords: ["freelancer", "delegate", "brief"],
        energy: "low",
        time: "1-2h",
        budget: "$20-100"
      }
    ]
  },
  {
    id: "research",
    suggestions: [
      {
        id: "research-scan",
        title: "Complete a 3-source scan",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Review the top 3 credible sources and capture 5 insights to guide scope.",
        keywords: ["research", "scan", "insights"],
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
        keywords: ["constraints", "goals", "scope"],
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
        keywords: ["expert", "questions", "outreach"],
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      }
    ]
  },
  {
    id: "outsourcing",
    suggestions: [
      {
        id: "outsourcing-brief",
        title: "Write a crisp outsource brief",
        effort: "moderate",
        timeEstimate: "45 minutes",
        rationale: "Package context, deliverables, timeline, and definition of done before delegating.",
        keywords: ["brief", "handoff", "delegate"],
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
        keywords: ["marketplace", "post", "candidates"],
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
        keywords: ["agency", "discovery", "scope"],
        energy: "low",
        time: "30m",
        budget: "$100+"
      }
    ]
  }
];
