import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  MapPin,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CANDIDATES } from "@/data/candidates";
import { formatAssetCompact } from "@/lib/utils";

/**
 * Candidate directory (/candidates) and single candidate affidavit profile (/candidates/:id).
 */
export const Candidate: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const selected = useMemo(
    () => (id ? CANDIDATES.find((c) => c.id === id) : undefined),
    [id]
  );

  // If no candidate ID is selected, display the clean Candidate Directory
  if (!selected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Public Profiles"
          title="Explore Candidates"
          subtitle="Browse structured affidavit dossiers across constituencies. Select any profile to inspect financial history and judicial filings."
          className="mb-10"
        />

        <SearchBar
          className="mb-14"
          showSuggestions={false}
          onSelectCandidate={(candidateId) =>
            navigate(`/candidates/${candidateId}`)
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {CANDIDATES.map((candidate, idx) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <GlassCard className="group flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${candidate.accentGradient} font-display text-sm font-bold text-white`}
                      >
                        {candidate.initials}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white group-hover:text-indigo-200">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {candidate.party}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">
                      Score {candidate.affidavitScore}/100
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                      {candidate.constituency}, {candidate.state}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
                      {candidate.education}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {candidate.aiSummary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="flex gap-5 text-xs">
                    <div>
                      <span className="text-slate-500">Net Assets: </span>
                      <span className="font-semibold text-white">
                        {formatAssetCompact(candidate.netAssetsMillions)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Cases: </span>
                      <span
                        className={
                          candidate.criminalCases === 0
                            ? "font-semibold text-emerald-300"
                            : "font-semibold text-amber-300"
                        }
                      >
                        {candidate.criminalCases}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/candidates/${candidate.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 transition hover:text-white"
                  >
                    Open Profile <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Detailed Candidate Dossier View
  const maxYearAsset = Math.max(
    ...selected.assetHistory.map((h) => h.value),
    1
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link
        to="/candidates"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>All Candidates</span>
      </Link>

      <GlassCard className="mb-8 rounded-[24px] p-6 sm:p-8" hoverGlow={false}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selected.accentGradient} font-display text-xl font-bold text-white shadow-glow`}
            >
              {selected.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {selected.name}
                </h1>
                <Badge variant="default">{selected.partyShort}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {selected.party} · {selected.constituency}, {selected.state}
              </p>
            </div>
          </div>

          <GradientButton to="/compare" size="md" variant="primary">
            Compare with Peer
          </GradientButton>
        </div>

        {/* Key Snapshot Tiles */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <span className="text-xs text-slate-400">Net Assets</span>
            <div className="mt-1 font-display text-xl font-bold text-white">
              {formatAssetCompact(selected.netAssetsMillions)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <span className="text-xs text-slate-400">Pending Cases</span>
            <div className="mt-1 flex items-center gap-1.5 font-display text-xl font-bold">
              {selected.criminalCases === 0 ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">0</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-300">
                    {selected.criminalCases}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <span className="text-xs text-slate-400">Attendance</span>
            <div className="mt-1 font-display text-xl font-bold text-indigo-300">
              {selected.attendanceRate}%
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <span className="text-xs text-slate-400">Affidavit Score</span>
            <div className="mt-1 font-display text-xl font-bold text-cyan-300">
              {selected.affidavitScore}/100
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Interactive shadcn Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start sm:w-auto">
          <TabsTrigger value="overview">AI Overview</TabsTrigger>
          <TabsTrigger value="assets">Asset Timeline</TabsTrigger>
          <TabsTrigger value="history">Election History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <GlassCard hoverGlow={false}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-200">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Affidavit Brief</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              {selected.aiSummary}
            </p>
            <div className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
              {selected.keyHighlights.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="assets">
          <GlassCard hoverGlow={false}>
            <h3 className="mb-5 font-display text-lg font-semibold text-white">
              Declared Net Asset Progression (Placeholder USD Equivalent)
            </h3>
            <div className="space-y-4">
              {selected.assetHistory.map((item) => (
                <div key={item.year} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-300">
                      {item.year} Filing
                    </span>
                    <span className="font-semibold text-white">
                      {formatAssetCompact(item.value)}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      style={{
                        width: `${Math.round((item.value / maxYearAsset) * 100)}%`,
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${selected.accentGradient}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="history">
          <GlassCard hoverGlow={false}>
            <h3 className="mb-5 font-display text-lg font-semibold text-white">
              Past Electoral Contests
            </h3>
            <div className="space-y-3">
              {selected.electionHistory.map((entry) => (
                <div
                  key={`${entry.year}-${entry.constituency}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
                >
                  <div>
                    <div className="font-display text-base font-semibold text-white">
                      {entry.year} · {entry.constituency}
                    </div>
                    <div className="text-xs text-slate-400">
                      Vote Share: {entry.voteShare}
                    </div>
                  </div>
                  <Badge
                    variant={entry.result === "Won" ? "emerald" : "outline"}
                  >
                    {entry.result}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

