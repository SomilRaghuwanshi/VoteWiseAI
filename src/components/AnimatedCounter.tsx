import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

/**
 * Triggers a smooth numeric count-up animation when scrolled into the viewport.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = "",
  duration = 1700,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const currentValue = useCountUp({
    target,
    duration,
    start: isInView,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {currentValue.toLocaleString()}
      {suffix}
    </span>
  );
};

