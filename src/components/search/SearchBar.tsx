import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { Candidate, SearchSuggestionItem } from "@/data/mockCandidates";
import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";
import { FilterChips } from "./FilterChips";
import { RecentSearches } from "./RecentSearches";
import { SearchEmptyState } from "./SearchEmptyState";
import { SearchResultCard } from "./SearchResultCard";
import { SearchSuggestion } from "./SearchSuggestion";
import { TrendingCandidates } from "./TrendingCandidates";

export interface SearchBarProps {
  className?: string;
  showFilters?: boolean;
  showResultsInline?: boolean;
  onSelectCandidate?: (candidateId: string) => void;
  placeholder?: string;
}

/**
 * Reusable, premium AI-powered Candidate Search Bar with glassmorphic aesthetics,
 * live autocomplete suggestions, filter chips, recent search persistence,
 * trending candidates, and full keyboard accessibility (Arrows, Enter, Escape).
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  showFilters = true,
  showResultsInline = false,
  onSelectCandidate,
  placeholder = "Search candidates, parties, constituencies...",
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCandidateSelection = (candidate: Candidate) => {
    addRecentSearch({
      query: candidate.name,
      candidateId: candidate.id,
      candidateName: candidate.name,
      party: candidate.partyShort,
      constituency: candidate.constituency,
    });
    setIsFocused(false);

    if (onSelectCandidate) {
      onSelectCandidate(candidate.id);
    } else {
      navigate(`/candidate/${candidate.id}`);
    }
  };

  const handleSuggestionSelection = (item: SearchSuggestionItem) => {
    if (item.candidateId) {
      handleCandidateSelection({
        id: item.candidateId,
        name: item.text,
        partyShort: item.subtext?.split(" · ")[0] || "",
        constituency: item.subtext?.split(" · ")[1] || "",
      } as Candidate);
    } else {
      setQuery(item.text);
      addRecentSearch({ query: item.text });
      setIsFocused(true);
      inputRef.current?.focus();
    }
  };

  const {
    query,
    setQuery,
    clearQuery,
    activeFilter,
    setActiveFilter,
    isFocused,
    setIsFocused,
    selectedIndex,
    suggestions,
    filteredCandidates,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleKeyDown,
  } = useSearch({
    onSelectCandidate: handleCandidateSelection,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredCandidates.length > 0) {
      handleCandidateSelection(filteredCandidates[0]);
    }
  };

  const showDropdown = isFocused;
  const isTyping = query.trim().length > 0;
  const hasNoMatches = isTyping && filteredCandidates.length === 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto w-full max-w-3xl", className)}
      onBlur={(e) => {
        // If clicking outside container, close dropdown
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      {/* 1. Animated Ambient Glow behind search bar */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500/30 via-violet-500/25 to-cyan-500/30 blur-xl transition-all duration-500",
          isFocused ? "opacity-90 scale-[1.01]" : "opacity-30 scale-100"
        )}
      />

      {/* 2. Main Search Bar Input Container */}
      <div className="relative">
        <form onSubmit={handleSubmit} role="search">
          <div
            className={cn(
              "relative flex items-center gap-3 rounded-[24px] border bg-[#0B1124]/90 px-4 py-3.5 backdrop-blur-2xl transition-all duration-300 sm:px-6 sm:py-4",
              isFocused
                ? "border-indigo-400/60 shadow-[0_0_0_1px_rgba(129,140,248,0.35),0_12px_40px_rgba(2,6,23,0.85)]"
                : "border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(2,6,23,0.65)]"
            )}
          >
            {/* Search Icon / Indicator */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-colors duration-300",
                isFocused
                  ? "from-indigo-500/30 to-violet-500/30 text-indigo-300 shadow-glow"
                  : "from-white/[0.04] to-white/[0.02] text-slate-400"
              )}
            >
              <Search className="h-5 w-5" />
            </div>

            {/* Accessible Search Input */}
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              aria-label="Search candidates by name, party, constituency, state, education, or profession"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none sm:text-base"
            />

            {/* Clear button (shown when query is non-empty) */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearQuery();
                  inputRef.current?.focus();
                }}
                aria-label="Clear search input"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Submit / Ask AI CTA */}
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:brightness-110 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        {/* 3. Filter Chips */}
        {showFilters && (
          <div className="mt-3 px-1">
            <FilterChips
              activeFilter={activeFilter}
              onFilterChange={(filter) => {
                setActiveFilter(filter);
                setIsFocused(true);
                inputRef.current?.focus();
              }}
            />
          </div>
        )}

        {/* 4. Live Autocomplete, Suggestions, Recent Searches & Empty State Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-40 mt-3 max-h-[460px] overflow-y-auto rounded-2xl border border-white/12 bg-[#0B1124]/95 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
            >
              {/* When typing: live suggestions */}
              {isTyping && suggestions.length > 0 && (
                <div className="space-y-3">
                  <SearchSuggestion
                    suggestions={suggestions}
                    selectedIndex={selectedIndex}
                    query={query}
                    onSelectSuggestion={handleSuggestionSelection}
                  />

                  {/* Matching Candidate Cards Preview */}
                  {filteredCandidates.length > 0 && (
                    <div className="border-t border-white/[0.06] pt-3">
                      <div className="mb-2.5 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <span>Top Matching Profiles ({filteredCandidates.length})</span>
                        <span className="text-[10px] lowercase text-slate-500">
                          press Enter to open top result
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {filteredCandidates.slice(0, 4).map((candidate) => (
                          <SearchResultCard
                            key={candidate.id}
                            candidate={candidate}
                            query={query}
                            onClick={() => handleCandidateSelection(candidate)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* When typing and no matches: Empty State */}
              {hasNoMatches && (
                <SearchEmptyState
                  query={query}
                  activeFilter={activeFilter}
                  onResetFilter={() => setActiveFilter("All")}
                  onClearQuery={() => {
                    clearQuery();
                    inputRef.current?.focus();
                  }}
                />
              )}

              {/* When input is focused but not typing: Recent Searches & Trending Candidates */}
              {!isTyping && (
                <div className="space-y-4 p-1">
                  {recentSearches.length > 0 && (
                    <RecentSearches
                      recentSearches={recentSearches}
                      onSelectRecent={(item) => {
                        if (item.candidateId) {
                          handleCandidateSelection({
                            id: item.candidateId,
                            name: item.candidateName || item.query,
                            partyShort: item.party || "",
                            constituency: item.constituency || "",
                          } as Candidate);
                        } else {
                          setQuery(item.query);
                          inputRef.current?.focus();
                        }
                      }}
                      onRemoveRecent={removeRecentSearch}
                      onClearAll={clearRecentSearches}
                    />
                  )}

                  <div className={cn(recentSearches.length > 0 && "border-t border-white/[0.06] pt-3")}>
                    <TrendingCandidates
                      onSelectCandidate={handleCandidateSelection}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Optional Inline Search Results (if showResultsInline is true) */}
      {showResultsInline && filteredCandidates.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {filteredCandidates.length} candidate
              {filteredCandidates.length > 1 ? "s" : ""}
            </span>
            {activeFilter !== "All" && (
              <span className="rounded-md border border-indigo-400/20 bg-indigo-500/10 px-2 py-0.5 text-indigo-300">
                Filter: {activeFilter}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((cand) => (
              <SearchResultCard
                key={cand.id}
                candidate={cand}
                query={query}
                onClick={() => handleCandidateSelection(cand)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
