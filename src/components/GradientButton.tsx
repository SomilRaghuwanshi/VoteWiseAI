import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

const sizeClasses = {
  sm: "h-9 px-4 text-xs rounded-xl",
  md: "h-11 px-6 text-sm rounded-2xl",
  lg: "h-12 px-7 text-[15px] rounded-2xl",
};

/**
 * Primary purple/blue gradient CTA button or secondary frosted glass action button.
 */
export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  external = false,
}) => {
  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 active:scale-[0.98]",
    sizeClasses[size],
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.65)] hover:shadow-[0_14px_38px_-6px_rgba(139,92,246,0.75)] hover:brightness-110"
      : "border border-white/15 bg-white/[0.04] text-slate-100 backdrop-blur-xl hover:border-indigo-400/45 hover:bg-white/[0.08]",
    className
  );

  const innerContent = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};

