import { Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Archetype, type Suggestion } from "@/lib/solutions";

interface SolutionCardProps {
  archetype: Archetype;
  selectionLabel: string;
  favorites: Set<string>;
  onFavoriteToggle: (suggestion: Suggestion) => void;
}

export function SolutionCard({
  archetype,
  selectionLabel,
  favorites,
  onFavoriteToggle
}: SolutionCardProps) {
  return (
    <Card className="h-full border-border/70 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{archetype.name}</CardTitle>
            <CardDescription>{archetype.summary}</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1 text-[11px]">
            <Sparkles className="h-3.5 w-3.5" /> {selectionLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {archetype.suggestions.map((suggestion) => {
          const isFavorite = favorites.has(suggestion.id);
          return (
            <div
              key={suggestion.id}
              className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold leading-tight">{suggestion.title}</h4>
                    <Badge variant="outline" className="text-[11px]">
                      {suggestion.timeEstimate}
                    </Badge>
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {suggestion.effort} effort
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.rationale}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    <span>Energy: {suggestion.energy}</span>
                    <span>Time: {suggestion.time}</span>
                    <span>Budget: {suggestion.budget}</span>
                  </div>
                </div>
                <Button
                  variant={isFavorite ? "secondary" : "ghost"}
                  size="icon"
                  aria-label={isFavorite ? "Remove favorite" : "Favorite suggestion"}
                  onClick={() => onFavoriteToggle(suggestion)}
                >
                  {isFavorite ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="border-t border-dashed border-border/70 bg-muted/30 text-xs text-muted-foreground">
        The lowest-friction options appear first based on your constraints.
      </CardFooter>
    </Card>
  );
}
