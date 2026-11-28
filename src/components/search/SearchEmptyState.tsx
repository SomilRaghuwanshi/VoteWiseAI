import React from "react";
import { RotateCcw, SearchX } from "lucide-react";
import { SearchFilterType } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface SearchEmptyStateProps {
  query: string;
  activeFilter: SearchFilterType;
  onResetFilter?: () => void;
  onClearQuery?: () => void;
  className?: string;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  query,
  activeFilter,
  onResetFilter,
  onClearQuery,
  className,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-10 text-center backdrop-blur-xl sm:py-14",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent text-slate-400">
        <SearchX className="h-6 w-6 text-indigo-300" />
      </div>

      <h4 className="mt-4 font-display text-base font-semibold text-white sm:text-lg">
        No matching candidate found.
      </h4>

      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
        {query ? (
          <>
            No records matched <span className="font-medium text-slate-200">"{query}"</span>
            {activeFilter !== "All" && (
              <> in the <span className="font-medium text-indigo-300">{activeFilter}</span> filter</>
            )}. Try checking spelling or searching across another party, constituency, or state.
          </>
        ) : (
          "Try adjusting your search criteria or resetting filters to explore all candidate affidavits."
        )}
      </p>

      {/* Helpful action buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {activeFilter !== "All" && onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/30 bg-indigo-500/15 px-3 py-1.5 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/25"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to "All" filter
          </button>
        )}

        {query && onClearQuery && (
          <button
            type="button"
            onClick={onClearQuery}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            Clear search query
          </button>
        )}
      </div>
    </div>
  );
};
