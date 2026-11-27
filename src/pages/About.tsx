import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Lock, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";

const principles = [
  {
    icon: Database,
    title: "Public Record First",
    description:
      "Built around mandatory pre-election financial, educational, and judicial affidavits filed with electoral commissions.",
  },
  {
    icon: Cpu,
    title: "Verifiable AI Synthesis",
    description:
      "Summaries are designed to remain neutral, structured, and strictly grounded in filed clauses rather than opinion pieces.",
  },
  {
    icon: ShieldCheck,
    title: "Non-Partisan Design",
    description:
      "Every candidate is evaluated on identical dimensions—asset trajectory, liabilities, attendance, and case disclosures.",
  },
  {
    icon: Lock,
    title: "Open Civic Infrastructure",
    description:
      "A clean, accessible interface that turns dense multi-page PDF filings into clear voter-ready insights.",
  },
];

/**
 * About page explaining VoteWise AI's civic intelligence mission and methodology.
 */
export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="About VoteWise AI"
        title="Civic transparency designed for the AI era"
        subtitle="Voters deserve crisp, factual comparisons instead of buried PDFs and campaign noise."
        className="mb-14"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <GlassCard id="methodology" className="mt-10 rounded-[24px] p-7 sm:p-9" hoverGlow={false}>
        <h2 className="font-display text-2xl font-semibold text-white">
          Frontend Prototype Scope
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          This repository represents the frontend foundation for VoteWise AI.
          All candidate profiles, stats, and comparisons displayed here use
          static placeholder records to showcase the visual architecture,
          design system, and interactive user experience without backend APIs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GradientButton to="/compare" variant="primary">
            Explore Compare UI
          </GradientButton>
          <GradientButton to="/candidates" variant="secondary">
            View Candidate Dossiers
          </GradientButton>
        </div>
      </GlassCard>
    </div>
  );
};

