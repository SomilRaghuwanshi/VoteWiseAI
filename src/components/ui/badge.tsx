import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-indigo-400/25 bg-indigo-500/10 text-indigo-200",
        purple:
          "border-violet-400/25 bg-violet-500/10 text-violet-200",
        cyan:
          "border-cyan-400/25 bg-cyan-500/10 text-cyan-200",
        emerald:
          "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
        amber:
          "border-amber-400/25 bg-amber-500/10 text-amber-200",
        outline:
          "border-white/15 bg-white/[0.03] text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

