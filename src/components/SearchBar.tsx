import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import { CANDIDATES, SEARCH_SUGGESTIONS } from "@/data/candidates";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSelectCandidate?: (candidateId: string) => void;
  showSuggestions?: boolean;
}

/**
 * Large centered AI-style search bar with live placeholder candidate matching
 * and quick prompt chips.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  onSelectCandidate,
  showSuggestions = true,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return CANDIDATES.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.constituency.toLowerCase().includes(trimmed) ||
        c.party.toLowerCase().includes(trimmed) ||
        c.state.toLowerCase().includes(trimmed) ||
        (trimmed.includes("zero") && c.criminalCases === 0)
    );
  }, [query]);

  const handleOpenCandidate = (candidateId: string) => {
    setIsFocused(false);
    if (onSelectCandidate) {
      onSelectCandidate(candidateId);
    } else {
      navigate(`/candidates/${candidateId}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matches.length > 0) {
      handleOpenCandidate(matches[0].id);
      return;
    }
    navigate("/candidates");
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-3xl", className)}>
      {/* Ambient glow behind search box */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-[26px] bg-gradient-to-r from-indigo-500/30 via-violet-500/25 to-cyan-500/30 blur-xl transition-opacity duration-500",
          isFocused ? "opacity-90" : "opacity-35"
        )}
      />

      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-[22px] border bg-[#0B1124]/90 px-4 py-3 backdrop-blur-2xl transition-all duration-300 sm:px-6 sm:py-4",
            isFocused
              ? "border-indigo-400/50 shadow-[0_0_0_1px_rgba(129,140,248,0.25)]"
              : "border-white/10"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300">
            <Search className="h-4.5 w-4.5" />
          </div>

          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 180)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidate, constituency or political party..."
            aria-label="Search candidate, constituency or political party"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none sm:text-base"
          />

          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-xs font-medium text-white shadow-glow transition hover:brightness-110 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>

        {/* Live autocomplete dropdown from static placeholder records */}
        <AnimatePresence>
          {isFocused && query.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full z-30 mt-2.5 overflow-hidden rounded-[20px] border border-white/10 bg-[#0B1124]/95 p-2 shadow-2xl backdrop-blur-2xl"
            >
              {matches.length > 0 ? (
                <div className="space-y-1">
                  {matches.map((candidate) => (
                    <button
                      key={candidate.id}
                      type="button"
                      onMouseDown={() => handleOpenCandidate(candidate.id)}
                      className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-semibold text-white",
                            candidate.accentGradient
                          )}
                        >
                          {candidate.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {candidate.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {candidate.constituency} · {candidate.party}
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-300">
                        View brief <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-center text-xs text-slate-400">
                  No placeholder matches for "{query}". Try{" "}
                  <span className="text-indigo-300">Mumbai North Central</span>{" "}
                  or <span className="text-indigo-300">Ananya Deshmukh</span>.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Suggestion prompt pills */}
      {showSuggestions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500">Try:</span>
          {SEARCH_SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setQuery(item);
                setIsFocused(true);
              }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

