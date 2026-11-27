import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { CANDIDATES } from "@/data/candidates";
import { formatAssetCompact } from "@/lib/utils";

/**
 * Floating glass dashboard mockup for the right side of the Hero section.
 * Displays candidate cards, an AI summary panel, asset chart bars, and analytics metrics.
 */
export const HeroMockup: React.FC = () => {
  const [primary, secondary] = CANDIDATES;

  return (
    <div className="relative mx-auto w-full max-w-[580px]">
      {/* Soft radial gradient halo behind mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-indigo-500/25 via-violet-500/20 to-cyan-400/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard
            padding="sm"
            hoverGlow={false}
            className="rounded-[24px] border-white/15 bg-[#0B1226]/80 p-4 shadow-[0_30px_90px_-20px_rgba(30,41,99,0.85)] sm:p-5"
          >
            {/* Mockup Top Window Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/70" />
                <span className="ml-2 text-xs font-medium text-slate-400">
                  Mumbai North Central · Affidavit Diff
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                <ShieldCheck className="h-3 w-3" />
                Verified Filing
              </span>
            </div>

            {/* Candidate Cards Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[primary, secondary].map((candidate, idx) => (
                <div
                  key={candidate.id}
                  className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3.5 transition hover:border-indigo-400/35"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${candidate.accentGradient} text-xs font-bold text-white shadow-md`}
                      >
                        {candidate.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {candidate.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {candidate.partyShort} · {candidate.education.split(",")[0]}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                      {candidate.affidavitScore}/100
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-2.5 text-xs">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                        Net Assets
                      </span>
                      <span className="font-semibold text-slate-100">
                        {formatAssetCompact(candidate.netAssetsMillions)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                        Cases
                      </span>
                      <span
                        className={
                          idx === 0
                            ? "font-semibold text-emerald-300"
                            : "font-semibold text-amber-300"
                        }
                      >
                        {candidate.criminalCases} Pending
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summary Panel */}
            <div className="mt-3 rounded-[18px] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/[0.09] via-violet-500/[0.06] to-transparent p-3.5">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-200">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span>AI Affidavit Synthesis</span>
                </div>
                <span className="text-[10px] text-slate-400">Form-26 · 2024</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                <span className="font-medium text-white">{primary.name}</span>{" "}
                maintains a clean judicial record and modest{" "}
                <span className="text-emerald-300">+18%</span> 5-year asset growth,
                whereas{" "}
                <span className="font-medium text-white">{secondary.name}</span>{" "}
                declares <span className="text-indigo-300">3.3×</span> higher net
                assets with 2 pending municipal cases.
              </p>
            </div>

            {/* Charts + Analytics Row */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
              {/* Asset Growth Mini Chart */}
              <div className="rounded-[18px] border border-white/10 bg-white/[0.025] p-3.5 sm:col-span-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-300">
                    Declared Asset Trajectory
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-cyan-300">
                    <TrendingUp className="h-3 w-3" /> 2014–2024
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      label: primary.initials,
                      pct: "34%",
                      amount: "$2.8M",
                      barClass: "from-indigo-500 to-cyan-400",
                    },
                    {
                      label: secondary.initials,
                      pct: "88%",
                      amount: "$9.4M",
                      barClass: "from-violet-500 to-fuchsia-400",
                    },
                  ].map((row) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-300">
                          {row.label} Net Worth
                        </span>
                        <span className="text-slate-400">{row.amount}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: row.pct }}
                          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${row.barClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Analytics Card */}
              <div className="flex flex-col justify-between rounded-[18px] border border-white/10 bg-white/[0.025] p-3.5 sm:col-span-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-300">
                    Transparency
                  </span>
                  <Scale className="h-3.5 w-3.5 text-violet-400" />
                </div>
                <div className="my-2">
                  <div className="font-display text-2xl font-bold text-white">
                    98.2%
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Clause match confidence
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>14 fields cross-checked</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

