import { useEffect, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number;
  start?: boolean;
}

/**
 * Smoothly animates a numeric counter from 0 to `target` using an ease-out curve.
 */
export function useCountUp({
  target,
  duration = 1600,
  start = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return value;
}

