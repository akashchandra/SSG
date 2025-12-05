"use client";

import { type ComponentType, useEffect, useMemo, useState } from "react";
import { Flame, Timer, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SolutionCard } from "@/components/solution-card";
import { HistoryPanel } from "@/components/history-panel";
import {
  type ConstraintSelection,
  type Suggestion,
  generateSolutionPaths,
  formatConstraintLabel,
  formatBudgetLabel
} from "@/lib/solutions";

const FAVORITES_KEY = "solution-atlas-favorites";

const energyOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" }
];

const timeOptions = [
  { label: "5 min", value: "5m" },
  { label: "30 min", value: "30m" },
  { label: "1–2 hr", value: "1-2h" },
  { label: "3+ hr", value: "3h+" }
];

const budgetOptions = [
  { label: formatBudgetLabel("$0"), value: "$0" },
  { label: formatBudgetLabel("$1-20"), value: "$1-20" },
  { label: formatBudgetLabel("$20-100"), value: "$20-100" },
  { label: formatBudgetLabel("$100+"), value: "$100+" }
];

type ConstraintOption<T extends string> = {
  label: string;
  value: T;
};

interface ConstraintToggleGroupProps<T extends string> {
  label: string;
  helperText?: string;
  options: ConstraintOption<T>[];
  value: T;
  onChange: (value: T) => void;
  icon?: ComponentType<{ className?: string }>;
}

function ConstraintToggleGroup<T extends string>({
  label,
  helperText,
  options,
  value,
  onChange,
  icon: Icon
}: ConstraintToggleGroupProps<T>) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
        <span>{label}</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <Button
              key={option.value}
              type="button"
              variant={isActive ? "default" : "outline"}
              className="rounded-full px-4 py-2 text-sm shadow-sm"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
      {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const [problem, setProblem] = useState("");
  const [selection, setSelection] = useState<ConstraintSelection>({
    energy: "low",
    time: "30m",
    budget: "$0"
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const selectionLabel = useMemo(() => formatConstraintLabel(selection), [selection]);
  const rankedPaths = useMemo(() => generateSolutionPaths(selection), [selection]);

  const handleGenerate = () => {
    setHasGenerated(true);
  };

  const toggleFavorite = (suggestion: Suggestion) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(suggestion.id)) {
        next.delete(suggestion.id);
      } else {
        next.add(suggestion.id);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container max-w-6xl py-12">
        <header className="mb-10 flex flex-col gap-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
                V0 Domain: Productivity + Focus
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Solution Atlas</h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Generate pragmatic, low-friction paths tailored to your time, energy, and budget.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="shadow-lg shadow-indigo-100/60">
              <CardHeader>
                <CardTitle>Describe the problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={problem}
                  onChange={(event) => setProblem(event.target.value)}
                  placeholder="Where are you stuck? What outcome do you want?"
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <ConstraintToggleGroup
                    label="Energy"
                    icon={Flame}
                    options={energyOptions}
                    value={selection.energy}
                    onChange={(value) => setSelection((prev) => ({ ...prev, energy: value }))}
                    helperText="How much effort you can realistically spend."
                  />
                  <ConstraintToggleGroup
                    label="Time"
                    icon={Timer}
                    options={timeOptions}
                    value={selection.time}
                    onChange={(value) => setSelection((prev) => ({ ...prev, time: value }))}
                    helperText="Available window for the next push."
                  />
                  <ConstraintToggleGroup
                    label="Budget"
                    icon={Wallet}
                    options={budgetOptions}
                    value={selection.budget}
                    onChange={(value) => setSelection((prev) => ({ ...prev, budget: value }))}
                    helperText="What you can spend to move faster."
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    The generator prioritizes options that require less effort given your constraints.
                  </p>
                  <Button size="lg" onClick={handleGenerate} className="shadow-md shadow-indigo-200">
                    Generate Paths
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <HistoryPanel onSelect={setProblem} activeProblem={problem} />
              {favorites.size ? (
                <Card className="border-indigo-100 bg-indigo-50/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Favorites</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {Array.from(favorites).map((id) => (
                      <span
                        key={id}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
                      >
                        {id}
                      </span>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-600">Solution Archetypes</p>
              <h2 className="text-2xl font-semibold">Paths tuned to your constraints</h2>
            </div>
            <Badge variant="outline" className="text-[13px]">
              {selectionLabel}
            </Badge>
          </div>
          {hasGenerated ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rankedPaths.map((archetype) => (
                <SolutionCard
                  key={archetype.id}
                  archetype={archetype}
                  selectionLabel={selectionLabel}
                  favorites={favorites}
                  onFavoriteToggle={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-indigo-100 bg-white/60 text-center shadow-none">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">Ready when you are</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Set your energy, time, and budget, then generate focused archetypes for your next move.
                </p>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="shadow-md shadow-indigo-200" onClick={handleGenerate}>
                  Generate first paths
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
