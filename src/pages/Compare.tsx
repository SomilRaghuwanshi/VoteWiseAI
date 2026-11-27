import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { CANDIDATES } from "@/data/candidates";
import { formatAssetCompact } from "@/lib/utils";

/**
 * Interactive side-by-side AI candidate comparison view using static placeholder data.
 */
export const Compare: React.FC = () => {
  const [leftId, setLeftId] = useState(CANDIDATES[0].id);
  const [rightId, setRightId] = useState(CANDIDATES[1].id);

  const left = useMemo(
    () => CANDIDATES.find((c) => c.id === leftId) ?? CANDIDATES[0],
    [leftId]
  );
  const right = useMemo(
    () => CANDIDATES.find((c) => c.id === rightId) ?? CANDIDATES[1],
    [rightId]
  );

  const handleSwap = () => {
    setLeftId(right.id);
    setRightId(left.id);
  };

  const maxAsset = Math.max(left.netAssetsMillions, right.netAssetsMillions, 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Side-by-Side Diff"
        title="Compare Candidates"
        subtitle="Select any two placeholder candidate profiles to inspect affidavit metrics, declared wealth, and judicial records."
        className="mb-12"
      />

      {/* Candidate Selectors */}
      <GlassCard className="mb-8 rounded-[22px] p-5 sm:p-6" hoverGlow={false}>
        <div className="grid items-center gap-4 md:grid-cols-11">
          <div className="md:col-span-5">
            <label
              htmlFor="candidate-left"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
            >
              Candidate A
            </label>
            <select
              id="candidate-left"
              value={left.id}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070B18] px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none"
            >
              {CANDIDATES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.constituency} ({c.partyShort})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:col-span-1 md:pt-5">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap candidates"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-white"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          <div className="md:col-span-5">
            <label
              htmlFor="candidate-right"
              className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
            >
              Candidate B
            </label>
            <select
              id="candidate-right"
              value={right.id}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070B18] px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none"
            >
              {CANDIDATES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.constituency} ({c.partyShort})
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* AI Synthesis Banner */}
      <motion.div
        key={`${left.id}-${right.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <GlassCard className="mb-8 border-indigo-400/20 bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.04] to-transparent">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-200">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Comparison Synthesis</span>
            </div>
            <Badge variant="outline">Static Placeholder Brief</Badge>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            <strong className="text-white">{left.name}</strong> holds an
            affidavit completeness score of{" "}
            <span className="text-indigo-300">{left.affidavitScore}/100</span>{" "}
            with{" "}
            <span className="text-emerald-300">
              {left.criminalCases} pending cases
            </span>{" "}
            and {formatAssetCompact(left.netAssetsMillions)} in declared net
            assets, compared to{" "}
            <strong className="text-white">{right.name}</strong> at{" "}
            <span className="text-indigo-300">{right.affidavitScore}/100</span>{" "}
            with{" "}
            <span
              className={
                right.criminalCases === 0
                  ? "text-emerald-300"
                  : "text-amber-300"
              }
            >
              {right.criminalCases} pending cases
            </span>{" "}
            and {formatAssetCompact(right.netAssetsMillions)} in net assets.
          </p>
        </GlassCard>
      </motion.div>

      {/* Two-Column Candidate Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[left, right].map((candidate) => {
          const barWidth = `${Math.round(
            (candidate.netAssetsMillions / maxAsset) * 100
          )}%`;

          return (
            <GlassCard key={candidate.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${candidate.accentGradient} font-display text-sm font-bold text-white shadow-lg`}
                    >
                      {candidate.initials}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {candidate.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {candidate.party} · {candidate.constituency}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/candidates/${candidate.id}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:border-indigo-400/40 hover:text-white"
                  >
                    Full Dossier <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Metrics Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500">
                      Net Assets
                    </span>
                    <div className="mt-1 font-display text-lg font-semibold text-white">
                      {formatAssetCompact(candidate.netAssetsMillions)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500">
                      Liabilities
                    </span>
                    <div className="mt-1 font-display text-lg font-semibold text-slate-200">
                      {formatAssetCompact(candidate.liabilitiesMillions)}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 sm:col-span-1">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500">
                      Pending Cases
                    </span>
                    <div className="mt-1 flex items-center gap-1.5 font-display text-lg font-semibold">
                      {candidate.criminalCases === 0 ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-300">0</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-300">
                            {candidate.criminalCases}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Relative Asset Bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Relative Declared Assets</span>
                    <span className="text-slate-200">
                      +{candidate.assetGrowthPct}% 5y growth
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: barWidth }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full bg-gradient-to-r ${candidate.accentGradient}`}
                    />
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mt-6 space-y-2 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Scale className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Affidavit Takeaways</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {candidate.keyHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

