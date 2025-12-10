"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, Heart, Layers, Library } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type MicroPlan, loadFavorites, loadHistory, loadMicroPlans, persistMicroPlans } from "@/lib/storage";
import { moduleRegistry } from "@/modules/moduleRegistry";
import { ARCHETYPE_ORDER } from "@/modules/types";

const DEFAULT_MODULE_ID = moduleRegistry[0].meta.id;

function findSuggestion(moduleId: string, suggestionId: string) {
  const module = moduleRegistry.find((entry) => entry.meta.id === moduleId) ?? moduleRegistry[0];
  for (const archetypeId of ARCHETYPE_ORDER) {
    const bankEntry = module.bank.find((entry) => entry.id === archetypeId);
    const suggestion = bankEntry?.suggestions.find((item) => item.id === suggestionId);
    if (suggestion) {
      return {
        suggestion,
        moduleLabel: module.meta.label,
        archetypeName: module.meta.archetypeLabels[archetypeId].name
      };
    }
  }
  return { suggestion: null, moduleLabel: module.meta.label, archetypeName: "" };
}

export default function LibraryPage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>([]);
  const [microPlans, setMicroPlans] = useState<MicroPlan[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
    setHistory(loadHistory());
    setMicroPlans(loadMicroPlans());
  }, []);

  const favoriteEntries = useMemo(
    () =>
      Array.from(favorites).map((id) => {
        const [moduleId, suggestionId] = id.includes(":") ? id.split(":") : [DEFAULT_MODULE_ID, id];
        const { suggestion, moduleLabel, archetypeName } = findSuggestion(moduleId, suggestionId);

        return {
          id,
          moduleLabel,
          title: suggestion?.title ?? suggestionId,
          archetype: archetypeName || "",
          moduleId
        };
      }),
    [favorites]
  );

  const handleRemoveMicroPlan = (planId: string) => {
    setMicroPlans((prev) => {
      const next = prev.filter((plan) => plan.id !== planId);
      persistMicroPlans(next);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container max-w-6xl py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
              <Library className="h-4 w-4" /> Library
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your saved context</h1>
            <p className="text-muted-foreground">Review recent problems, favorites, and micro-plans in one place.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to generator
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-indigo-100/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock3 className="h-4 w-4" /> Recent Problems
              </CardTitle>
              <CardDescription>Last 10 entries captured from your generator inputs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.length ? (
                history.slice(0, 10).map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-dashed border-indigo-100/80 bg-white/70 px-3 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No problems logged yet. Use the generator to add some.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-pink-100/70">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-4 w-4" /> Favorites
              </CardTitle>
              <CardDescription>Saved suggestions across all modules.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {favoriteEntries.length ? (
                favoriteEntries.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-dashed border-pink-100/70 bg-white/80 px-3 py-2 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold leading-tight">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.moduleLabel}</p>
                      </div>
                      <Badge variant="outline" className="text-[11px]">
                        {item.archetype || "Favorite"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Favorite suggestions will appear here.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
            <Layers className="h-4 w-4" /> Saved Micro-Plans
          </div>
          <h2 className="text-2xl font-semibold">Reusable actions to re-run</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {microPlans.length ? (
              microPlans.map((plan) => (
                <Card key={plan.id} className="border-dashed border-indigo-100/80 bg-white/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{plan.title}</span>
                      <Badge variant="outline" className="text-[11px]">
                        {moduleRegistry.find((mod) => mod.meta.id === plan.moduleId)?.meta.label || plan.moduleLabel}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {plan.archetype}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold text-foreground">Problem:</span> {plan.problemSnapshot || "(none captured)"}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-foreground">
                      {plan.constraintsSnapshot.energy} • {plan.constraintsSnapshot.time} • {plan.constraintsSnapshot.budget}
                    </p>
                    <p className="text-xs">Saved {new Date(plan.timestamp).toLocaleString()}</p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveMicroPlan(plan.id)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed border-indigo-100 bg-white/70">
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Save suggestions as micro-plans from the generator to see them here.
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
