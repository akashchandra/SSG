"use client";

import { useEffect, useState } from "react";
import { Clock3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoryPanelProps {
  onSelect: (value: string) => void;
  activeProblem: string;
}

const STORAGE_KEY = "solution-atlas-history";
const MAX_HISTORY = 10;

export function HistoryPanel({ onSelect, activeProblem }: HistoryPanelProps) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error("Unable to load history", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!activeProblem.trim()) return;
    setItems((prev) => {
      const next = [activeProblem, ...prev.filter((entry) => entry !== activeProblem)].slice(
        0,
        MAX_HISTORY
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, [activeProblem]);

  if (!items.length) return null;

  return (
    <Card className="border-dashed bg-muted/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock3 className="h-4 w-4" /> Recent problems
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => {
              setItems([]);
              localStorage.removeItem(STORAGE_KEY);
            }}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-lg border border-transparent bg-white/70 px-3 py-2 text-left text-sm shadow-sm transition hover:border-primary/30 hover:shadow"
          >
            {item}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
