import React from "react";
import { motion } from "framer-motion";
import { FILTER_OPTIONS, SearchFilterType } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface FilterChipsProps {
  activeFilter: SearchFilterType;
  onFilterChange: (filter: SearchFilterType) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilter,
  onFilterChange,
  className,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter search results by category"
      className={cn(
        "no-scrollbar flex items-center gap-1.5 overflow-x-auto py-1",
        className
      )}
    >
      {FILTER_OPTIONS.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {/* Smooth background highlight animation */}
            {isActive && (
              <motion.div
                layoutId="activeFilterChip"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full border border-indigo-400/40 bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-indigo-500/25 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              />
            )}

            {!isActive && (
              <span className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.03] transition-colors hover:bg-white/[0.06]" />
            )}

            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
};
