import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Candidate } from "@/data/mockCandidates";
import { cn } from "@/lib/utils";

interface SearchResultCardProps {
  candidate: Candidate;
  onClick?: () => void;
  className?: string;
  query?: string;
}

/**
 * Highlights matches of the user's query within target text.
 */
function highlightMatch(text: string, query?: string) {
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
      <span className="rounded bg-indigo-500/25 px-0.5 text-indigo-200">
        {match}
      </span>
      {after}
    </>
  );
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  candidate,
  onClick,
  className,
  query,
}) => {
  return (
    <Link
      to={`/candidate/${candidate.id}`}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B1124]/80 p-4 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/35 hover:bg-[#0E1630]/90 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] sm:p-5",
        className
      )}
    >
      {/* Ambient hover glow line at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/0 to-transparent transition-opacity duration-300 group-hover:via-indigo-400/40"
      />

      <div>
        {/* Header: Photo placeholder + Name + Party + Navigation Arrow */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Photo placeholder */}
            <div
              aria-label={`Photo of ${candidate.name}`}
              className={cn(
                "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-sm font-bold text-white shadow-md ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105",
                candidate.accentGradient
              )}
            >
              <span>{candidate.initials}</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B1124] bg-emerald-400" />
            </div>

            {/* Candidate Name & Party */}
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-semibold text-white transition-colors group-hover:text-indigo-200 sm:text-lg">
                {highlightMatch(candidate.name, query)}
              </h3>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-medium text-slate-300">
                  {candidate.partyShort}
                </span>
                <span className="truncate text-slate-400">
                  {candidate.party}
                </span>
              </div>
            </div>
          </div>

          {/* Small navigation indicator arrow */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all duration-300 group-hover:border-indigo-400/40 group-hover:bg-indigo-500/15 group-hover:text-indigo-200">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Metadata Details: Constituency & State, Education, Profession */}
        <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3 text-xs text-slate-300">
          {/* Constituency & State */}
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
            <span className="truncate font-medium">
              {highlightMatch(candidate.constituency, query)},{" "}
              <span className="text-slate-400">{highlightMatch(candidate.state, query)}</span>
            </span>
          </div>

          {/* Education */}
          <div className="flex items-center gap-2 text-slate-300">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-violet-400" />
            <span className="truncate text-slate-300" title={candidate.education}>
              {highlightMatch(candidate.education, query)}
            </span>
          </div>

          {/* Profession */}
          <div className="flex items-center gap-2 text-slate-300">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <span className="truncate text-slate-300" title={candidate.profession}>
              {highlightMatch(candidate.profession, query)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer tags / micro stats */}
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              candidate.criminalCases === 0 ? "bg-emerald-400" : "bg-amber-400"
            )}
          />
          {candidate.criminalCases === 0
            ? "Clean Affidavit Record"
            : `${candidate.criminalCases} Pending Case${candidate.criminalCases > 1 ? "s" : ""}`}
        </span>
        <span className="text-indigo-300/80 transition-colors group-hover:text-indigo-200">
          View Dossier →
        </span>
      </div>
    </Link>
  );
};
