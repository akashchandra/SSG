"use client";

import { type ComponentType, useEffect, useMemo, useState } from "react";
import { Flame, Library, Timer, Wallet } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SolutionCard } from "@/components/solution-card";
import { HistoryPanel } from "@/components/history-panel";
import {
  type ConstraintSelection,
  type Suggestion,
  generateSolutionPaths,
  formatConstraintLabel,
  formatBudgetLabel,
  getFavoriteKey
} from "@/lib/solutions";
import { moduleRegistry } from "@/modules/moduleRegistry";
import {
  FAVORITES_KEY,
  MODULE_KEY,
  type MicroPlan,
  loadFavorites,
  loadMicroPlans,
  persistFavorites,
  persistMicroPlans
} from "@/lib/storage";
const DEFAULT_MODULE_ID = moduleRegistry[0].meta.id;

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

const moduleOptions = moduleRegistry.map((module) => ({
  label: module.meta.label,
  value: module.meta.id
}));

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
  optionsClassName?: string;
  optionClassName?: string;
}

function ConstraintToggleGroup<T extends string>({
  label,
  helperText,
  options,
  value,
  onChange,
  icon: Icon,
  optionsClassName,
  optionClassName
}: ConstraintToggleGroupProps<T>) {
  const optionButtonClass = `rounded-full px-4 py-2 text-sm shadow-sm ${optionClassName ?? ""}`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
        <span>{label}</span>
      </label>
      <div className={`flex flex-wrap gap-2 ${optionsClassName ?? ""}`}>
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <Button
              key={option.value}
              type="button"
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={optionButtonClass}
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
  const [selectedModuleId, setSelectedModuleId] = useState(DEFAULT_MODULE_ID);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [microPlans, setMicroPlans] = useState<MicroPlan[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    const savedModule = localStorage.getItem(MODULE_KEY);
    if (savedModule && moduleRegistry.some((module) => module.meta.id === savedModule)) {
      setSelectedModuleId(savedModule);
    }
  }, []);

  useEffect(() => {
    setMicroPlans(loadMicroPlans());
  }, []);

  useEffect(() => {
    localStorage.setItem(MODULE_KEY, selectedModuleId);
  }, [selectedModuleId]);

  const selectedModule = useMemo(
    () => moduleRegistry.find((module) => module.meta.id === selectedModuleId) ?? moduleRegistry[0],
    [selectedModuleId]
  );

  const selectionLabel = useMemo(() => formatConstraintLabel(selection), [selection]);
  const rankedPaths = useMemo(
    () => generateSolutionPaths(selectedModule, selection),
    [selectedModule, selection.energy, selection.time, selection.budget, problem]
  );

  const handleGenerate = () => {
    setHasGenerated(true);
  };

  const toggleFavorite = (suggestion: Suggestion, moduleId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      const favoriteKey = getFavoriteKey(moduleId, suggestion.id);
      const legacyKey = suggestion.id;
      const isFavorite = next.has(favoriteKey) || next.has(legacyKey);

      if (isFavorite) {
        next.delete(favoriteKey);
        next.delete(legacyKey);
      } else {
        next.add(favoriteKey);
      }
      persistFavorites(next);
      return next;
    });
  };

  const saveMicroPlan = (suggestion: Suggestion, archetypeName: string) => {
    const newPlan: MicroPlan = {
      id: `${selectedModule.meta.id}-${suggestion.id}-${Date.now()}`,
      title: suggestion.title,
      archetype: archetypeName,
      moduleId: selectedModule.meta.id,
      moduleLabel: selectedModule.meta.label,
      suggestionId: suggestion.id,
      timestamp: Date.now(),
      problemSnapshot: problem,
      constraintsSnapshot: { ...selection }
    };

    setMicroPlans((prev) => {
      const next = [newPlan, ...prev];
      persistMicroPlans(next);
      return next;
    });
  };

  const favoriteChips = useMemo(
    () =>
      Array.from(favorites).map((id) => {
        const [moduleId, suggestionId] = id.includes(":") ? id.split(":") : [DEFAULT_MODULE_ID, id];
        const moduleLabel =
          moduleRegistry.find((module) => module.meta.id === moduleId)?.meta.label ??
          moduleRegistry[0].meta.label;

        return { id, label: `${moduleLabel}: ${suggestionId}` };
      }),
    [favorites]
  );

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
                Module: {selectedModule.meta.label}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Solution Atlas</h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {selectedModule.meta.shortDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="shadow-lg shadow-indigo-100/60">
              <CardHeader>
                <CardTitle>Describe the problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Select
                    label="Module"
                    value={selectedModuleId}
                    onChange={(event) => setSelectedModuleId(event.target.value)}
                    options={moduleOptions}
                    helperText="Switch modules to update archetypes and suggestion banks."
                  />
                  <Button
                    variant="ghost"
                    asChild
                    className="hidden text-indigo-700 hover:text-indigo-800 sm:inline-flex"
                  >
                    <Link href="/library" className="flex items-center gap-2 text-sm font-medium">
                      <Library className="h-4 w-4" /> Library
                      <span className="text-xs text-muted-foreground">{microPlans.length} saved</span>
                    </Link>
                  </Button>
                </div>
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
                    onChange={(value) => setSelection((prev) => ({ ...prev, energy: value as ConstraintSelection["energy"] }))}
                    helperText="How much effort you can realistically spend."
                  />
                  <ConstraintToggleGroup
                    label="Time"
                    icon={Timer}
                    options={timeOptions}
                    value={selection.time}
                    onChange={(value) => setSelection((prev) => ({ ...prev, time: value as ConstraintSelection["time"] }))}
                    helperText="Available window for the next push."
                  />
                  <ConstraintToggleGroup
                    label="Budget"
                    icon={Wallet}
                    options={budgetOptions}
                    value={selection.budget}
                    onChange={(value) =>
                      setSelection((prev) => ({ ...prev, budget: value as ConstraintSelection["budget"] }))
                    }
                    optionsClassName="flex flex-wrap gap-2"
                    optionClassName="min-w-[96px]"
                    helperText="What you can spend to move faster."
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    The generator prioritizes options that require less effort given your constraints.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" asChild size="lg" className="shadow-none sm:hidden">
                      <Link href="/library" className="flex items-center gap-2">
                        <Library className="h-4 w-4" /> Library
                        <span className="text-xs text-muted-foreground">{microPlans.length} saved</span>
                      </Link>
                    </Button>
                    <Button size="lg" onClick={handleGenerate} className="shadow-md shadow-indigo-200">
                      Generate Paths
                    </Button>
                  </div>
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
                    {favoriteChips.map((favorite) => (
                      <span
                        key={favorite.id}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
                      >
                        {favorite.label}
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
                  key={`${selectedModule.meta.id}-${archetype.id}`}
                  moduleId={selectedModule.meta.id}
                  archetype={archetype}
                  selectionLabel={selectionLabel}
                  favorites={favorites}
                  onFavoriteToggle={(suggestion) => toggleFavorite(suggestion, selectedModule.meta.id)}
                  onSaveMicroPlan={(suggestion) => saveMicroPlan(suggestion, archetype.name)}
                  constraintsSnapshot={selection}
                  problemSnapshot={problem}
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
