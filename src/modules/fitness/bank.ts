import { type ArchetypeBankEntry } from "../types";

export const fitnessBank: ArchetypeBankEntry[] = [
  {
    id: "quick-wins",
    suggestions: [
      {
        id: "fitness-activation-mobility",
        title: "5-minute mobility reset",
        effort: "light",
        timeEstimate: "5 minutes",
        rationale: "Loosen hips, shoulders, and ankles to reduce stiffness before longer efforts.",
        keywords: ["mobility", "warmup", "joints"],
        energy: "low",
        time: "5m",
        budget: "$0"
      },
      {
        id: "fitness-activation-walk",
        title: "Brisk micro-walk outdoors",
        effort: "light",
        timeEstimate: "5-10 minutes",
        rationale: "Step outside, breathe deeply, and elevate heart rate just enough to feel alert.",
        keywords: ["walk", "outdoors", "energy"],
        energy: "low",
        time: "5m",
        budget: "$0"
      },
      {
        id: "fitness-activation-highknees",
        title: "High-knee burst with a timer",
        effort: "moderate",
        timeEstimate: "5 minutes",
        rationale: "Do 4 x 30-second high knees with 30-second rests to flip your energy state quickly.",
        keywords: ["interval", "cardio", "burst"],
        energy: "medium",
        time: "5m",
        budget: "$0"
      }
    ]
  },
  {
    id: "lean-experiments",
    suggestions: [
      {
        id: "fitness-experiment-amrap",
        title: "10-minute AMRAP sampler",
        effort: "moderate",
        timeEstimate: "10 minutes",
        rationale: "Pick two moves (squats and pushups) and cycle them to find your sustainable pace.",
        keywords: ["amrap", "strength", "baseline"],
        energy: "medium",
        time: "30m",
        budget: "$0"
      },
      {
        id: "fitness-experiment-class",
        title: "Test a drop-in class",
        effort: "intensive",
        timeEstimate: "60 minutes",
        rationale: "Try a new modality (pilates, boxing, mobility) to see what you enjoy enough to repeat.",
        keywords: ["class", "experiment", "novelty"],
        energy: "high",
        time: "1-2h",
        budget: "$20-100"
      },
      {
        id: "fitness-experiment-heart",
        title: "Heart-rate guided session",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Walk or cycle while staying in Zone 2 to learn what easy effort actually feels like.",
        keywords: ["heart rate", "zone 2", "aerobic"],
        energy: "low",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "workflow-upgrades",
    suggestions: [
      {
        id: "fitness-workflow-stack",
        title: "Anchor a workout to an existing habit",
        effort: "light",
        timeEstimate: "10 minutes",
        rationale: "Pair your session with a daily cue (after coffee or meetings) so it starts automatically.",
        keywords: ["habit", "stack", "cue"],
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "fitness-workflow-kit",
        title: "Prep a 3-day grab-and-go kit",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Lay out shoes, bottle, and bands so nothing blocks you from starting tomorrow.",
        keywords: ["prep", "gear", "kit"],
        energy: "low",
        time: "30m",
        budget: "$1-20"
      },
      {
        id: "fitness-workflow-calendar",
        title: "Schedule recurring movement blocks",
        effort: "light",
        timeEstimate: "15 minutes",
        rationale: "Block two weekly slots with reminders and buffer time to reduce excuses.",
        keywords: ["schedule", "calendar", "consistency"],
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
        id: "fitness-collab-checkin",
        title: "Start a 2x/week check-in thread",
        effort: "light",
        timeEstimate: "10 minutes",
        rationale: "Share proof-of-work photos or reps with a friend to keep both of you honest.",
        keywords: ["accountability", "thread", "buddy"],
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "fitness-collab-form",
        title: "Book a form check with a trainer",
        effort: "moderate",
        timeEstimate: "30 minutes",
        rationale: "Get feedback on one lift to avoid injury and feel confident progressing weight.",
        keywords: ["form", "coach", "injury"],
        energy: "medium",
        time: "30m",
        budget: "$20-100"
      },
      {
        id: "fitness-collab-buddy",
        title: "Invite a coworker movement break",
        effort: "light",
        timeEstimate: "15 minutes",
        rationale: "Pair a short walk or stretch with someone else so it's social and scheduled.",
        keywords: ["partner", "walk", "social"],
        energy: "low",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "research",
    suggestions: [
      {
        id: "fitness-research-baseline",
        title: "Record baseline mobility",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Film a squat, hinge, and overhead reach to spot tight spots you can improve.",
        keywords: ["baseline", "mobility", "video"],
        energy: "low",
        time: "30m",
        budget: "$0"
      },
      {
        id: "fitness-research-plan",
        title: "Map a 4-week progression",
        effort: "moderate",
        timeEstimate: "45 minutes",
        rationale: "Choose two core lifts and plan incremental increases so you see clear milestones.",
        keywords: ["progression", "plan", "strength"],
        energy: "medium",
        time: "1-2h",
        budget: "$0"
      },
      {
        id: "fitness-research-injury",
        title: "Study injury-prevention cues",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Review form checkpoints for your main movements to stay safe as intensity rises.",
        keywords: ["injury", "form", "safety"],
        energy: "low",
        time: "30m",
        budget: "$0"
      }
    ]
  },
  {
    id: "outsourcing",
    suggestions: [
      {
        id: "fitness-outsource-program",
        title: "Buy a proven 4-week plan",
        effort: "light",
        timeEstimate: "20 minutes",
        rationale: "Skip decision fatigue by downloading a plan that matches your equipment and schedule.",
        keywords: ["program", "download", "plan"],
        energy: "low",
        time: "30m",
        budget: "$20-100"
      },
      {
        id: "fitness-outsource-intro",
        title: "Book an intro PT session",
        effort: "light",
        timeEstimate: "30 minutes",
        rationale: "Use a single paid session to set form cues and a starter routine you can repeat solo.",
        keywords: ["personal training", "form", "routine"],
        energy: "low",
        time: "30m",
        budget: "$100+"
      },
      {
        id: "fitness-outsource-timeback",
        title: "Schedule a time-saver service",
        effort: "light",
        timeEstimate: "10 minutes",
        rationale: "Book laundry or meal delivery for a week so you reclaim an hour for training.",
        keywords: ["time", "delivery", "support"],
        energy: "low",
        time: "5m",
        budget: "$20-100"
      }
    ]
  }
];
