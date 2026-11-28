import React from "react";
import { ArrowUpRight, Briefcase, Building2, GraduationCap, MapPin, User } from "lucide-react";
import { SearchSuggestionItem } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface SearchSuggestionProps {
  suggestions: SearchSuggestionItem[];
  selectedIndex: number;
  query: string;
  onSelectSuggestion: (item: SearchSuggestionItem) => void;
  className?: string;
}

const typeIcons = {
  Candidate: User,
  Party: Building2,
  Constituency: MapPin,
  State: MapPin,
  Education: GraduationCap,
  Profession: Briefcase,
};

function highlightMatch(text: string, query: string) {
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + trimmed.length);
  const after = text.slice(index + trimmed.length);

  return (
    <>
      {before}
      <span className="font-semibold text-white underline decoration-indigo-400/60 decoration-2 underline-offset-2">
        {match}
      </span>
      {after}
    </>
  );
}

export const SearchSuggestion: React.FC<SearchSuggestionProps> = ({
  suggestions,
  selectedIndex,
  query,
  onSelectSuggestion,
  className,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div
      role="listbox"
      aria-label="Search suggestions"
      className={cn("divide-y divide-white/[0.04]", className)}
    >
      <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Suggestions
      </div>
      <div className="space-y-0.5 pt-1">
        {suggestions.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          const Icon = typeIcons[item.type] || User;

          return (
            <button
              key={item.id}
              role="option"
              aria-selected={isSelected}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur before click registers
                onSelectSuggestion(item);
              }}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150",
                isSelected
                  ? "bg-indigo-500/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors",
                    isSelected
                      ? "border-indigo-400/40 bg-indigo-500/30 text-indigo-200"
                      : "border-white/[0.08] bg-white/[0.03] text-slate-400 group-hover:text-slate-200"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-200 group-hover:text-white">
                    {highlightMatch(item.text, query)}
                  </div>
                  {item.subtext && (
                    <div className="truncate text-xs text-slate-400">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 pl-2">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
                  {item.type}
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isSelected
                      ? "translate-x-0.5 -translate-y-0.5 text-indigo-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
