import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Flame } from "lucide-react";
import { Candidate, TRENDING_CANDIDATES } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface TrendingCandidatesProps {
  candidates?: Candidate[];
  onSelectCandidate?: (candidate: Candidate) => void;
  className?: string;
}

export const TrendingCandidates: React.FC<TrendingCandidatesProps> = ({
  candidates = TRENDING_CANDIDATES,
  onSelectCandidate,
  className,
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        <Flame className="h-3.5 w-3.5 text-amber-400" />
        <span>Trending Candidates</span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {candidates.slice(0, 6).map((candidate, idx) => (
          <Link
            key={candidate.id}
            to={`/candidate/${candidate.id}`}
            onClick={() => onSelectCandidate?.(candidate)}
            className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 transition-all duration-200 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              {/* Rank indicator */}
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-[10px] font-bold text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                0{idx + 1}
              </span>

              {/* Initials avatar */}
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white shadow-sm",
                  candidate.accentGradient
                )}
              >
                {candidate.initials}
              </div>

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white group-hover:text-indigo-200">
                  {candidate.name}
                </div>
                <div className="truncate text-[10px] text-slate-400">
                  {candidate.partyShort} · {candidate.constituency}
                </div>
              </div>
            </div>

            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};
