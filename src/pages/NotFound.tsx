import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";

/**
 * Clean futuristic 404 fallback page.
 */
export const NotFound: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        <GlassCard className="rounded-[24px] p-8 text-center sm:p-12" hoverGlow={false}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
            <Compass className="h-7 w-7" />
          </div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-indigo-300">
            Error 404
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Constituency not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
            The page you requested doesn&apos;t exist or has moved. Return to
            the VoteWise AI landing page or compare candidates directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <GradientButton to="/" variant="primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </GradientButton>
            <GradientButton to="/compare" variant="secondary">
              <span>Compare Candidates</span>
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

