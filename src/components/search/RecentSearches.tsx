import React from "react";
import { Clock, Trash2, X } from "lucide-react";
import { RecentSearchItem } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface RecentSearchesProps {
  recentSearches: RecentSearchItem[];
  onSelectRecent: (item: RecentSearchItem) => void;
  onRemoveRecent: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  onSelectRecent,
  onRemoveRecent,
  onClearAll,
  className,
}) => {
  if (recentSearches.length === 0) return null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-slate-400" />
          Recent Searches
        </span>
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1 text-[11px] font-medium text-slate-400 transition-colors hover:text-rose-300"
          title="Clear recent search history"
        >
          <Trash2 className="h-3 w-3" />
          Clear all
        </button>
      </div>

      <div className="space-y-0.5">
        {recentSearches.map((item) => (
          <div
            key={item.id}
            className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelectRecent(item);
              }}
              className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-400 group-hover:text-indigo-300">
                <Clock className="h-3 w-3" />
              </div>
              <div className="min-w-0">
                <span className="truncate font-medium text-slate-200 group-hover:text-white">
                  {item.candidateName || item.query}
                </span>
                {item.party && (
                  <span className="ml-2 text-xs text-slate-500">
                    {item.party} {item.constituency ? `· ${item.constituency}` : ""}
                  </span>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveRecent(item.id);
              }}
              aria-label={`Remove ${item.query} from history`}
              className="ml-2 rounded-lg p-1 text-slate-500 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
