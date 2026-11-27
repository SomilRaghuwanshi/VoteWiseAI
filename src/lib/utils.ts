import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes conditionally without style conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an integer or decimal amount into compact currency notation (e.g. $4.2M or ₹4.2 Cr).
 * Used purely for displaying placeholder affidavit figures.
 */
export function formatAssetCompact(amountInMillions: number): string {
  if (amountInMillions >= 1) {
    return `$${amountInMillions.toFixed(1)}M`;
  }
  return `$${Math.round(amountInMillions * 1000)}K`;
}

