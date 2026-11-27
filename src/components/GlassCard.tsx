import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

/**
 * Reusable frosted glass container with subtle specular top edge and optional hover glow.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverGlow = true,
  padding = "md",
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-[22px] glass-surface",
        hoverGlow && "glass-surface-hover",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {/* Subtle top-edge specular gradient line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      {children}
    </motion.div>
  );
};

