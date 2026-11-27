import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  History,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type { FeatureItem } from "@/data/candidates";
import { cn } from "@/lib/utils";

const iconMap = {
  Sparkles,
  Search,
  FileText,
  ShieldAlert,
  BarChart3,
  History,
};

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

/**
 * Glassmorphic feature card showcasing one core VoteWise AI capability.
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const Icon = iconMap[feature.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <GlassCard className="group flex h-full flex-col justify-between">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br transition-transform duration-300 group-hover:scale-105",
                feature.accent
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
              {feature.tag}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-indigo-200">
            {feature.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
            {feature.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-indigo-300/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span>Public affidavit verified</span>
        </div>
      </GlassCard>
    </motion.div>
  );
};

