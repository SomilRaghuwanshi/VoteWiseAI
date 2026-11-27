import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FeatureCard } from "@/components/FeatureCard";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { HeroMockup } from "@/components/HeroMockup";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { FEATURES, PLATFORM_STATS } from "@/data/candidates";

/**
 * VoteWise AI flagship landing page featuring Hero + Floating Mockup,
 * AI Search Bar, 6-Card Feature Grid, and Animated Stats.
 */
export const Home: React.FC = () => {
  return (
    <div className="pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Copy & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <Badge variant="default" className="mb-6 gap-2 px-3.5 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>AI Civic Intelligence · Public Affidavits</span>
              </Badge>

              <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[58px]">
                Understand Candidates{" "}
                <span className="text-gradient-accent">Beyond Manifestos.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                AI-powered candidate comparison using public election affidavit
                data.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <GradientButton to="/compare" size="lg" variant="primary">
                  <span>Compare Candidates</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </GradientButton>

                <GradientButton href="#search" size="lg" variant="secondary">
                  <Compass className="h-4 w-4 text-indigo-300" />
                  <span>Explore Data</span>
                </GradientButton>
              </div>

              {/* Minimal trust micro-row */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.07] pt-6 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Form-26 Public Filings
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Zero Partisan Bias
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Source-Linked Metrics
                </span>
              </div>
            </motion.div>

            {/* Right Floating Glass Dashboard Mockup */}
            <div className="lg:col-span-6">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH SECTION */}
      <section id="search" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Instant Civic Lookup"
            title="Ask anything across public filings"
            subtitle="Explore candidate backgrounds, financial disclosures, and judicial declarations in seconds."
            className="mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURE SECTION (6 Glass Cards) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="Structured clarity from raw disclosures"
            subtitle="Every metric is distilled directly from official election affidavits into verifiable visual intelligence."
            className="mb-14"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION (Animated Counters) */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55 }}
          >
            <GlassCard
              padding="lg"
              hoverGlow={false}
              className="relative overflow-hidden rounded-[24px] border-white/10"
            >
              {/* Soft background glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-40 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 via-violet-500/20 to-blue-500/15 blur-3xl"
              />

              <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
                {PLATFORM_STATS.map((stat, idx) => (
                  <div
                    key={stat.id}
                    className={`flex flex-col items-center text-center ${
                      idx !== 0 ? "md:border-l md:border-white/[0.07]" : ""
                    }`}
                  >
                    <div className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
                      <span className="text-gradient">
                        <AnimatedCounter
                          target={stat.value}
                          suffix={stat.suffix}
                        />
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-indigo-200">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* 5. MINIMAL BOTTOM CTA */}
      <section className="pt-8 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="relative overflow-hidden rounded-[24px] p-8 text-center sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl"
            />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Ready to evaluate candidates side by side?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
              Launch an instant AI comparison or browse verified candidate
              affidavit profiles across constituencies.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <GradientButton to="/compare" size="lg" variant="primary">
                <span>Start Comparing</span>
                <ArrowRight className="h-4 w-4" />
              </GradientButton>
              <GradientButton to="/candidates" size="lg" variant="secondary">
                <span>Browse Candidates</span>
              </GradientButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

