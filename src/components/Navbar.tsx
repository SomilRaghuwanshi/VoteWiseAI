import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Compare", to: "/compare" },
  { label: "Candidates", to: "/candidates" },
  { label: "About", to: "/about" },
];

/**
 * Sticky translucent navigation bar with VoteWise AI branding, route links,
 * GitHub button, and responsive mobile drawer.
 */
export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070B18]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 shadow-glow transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              VoteWise
            </span>
            <span className="rounded-md border border-indigo-400/30 bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action: GitHub button + Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:border-indigo-400/40 hover:bg-white/[0.08] hover:text-white sm:inline-flex"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#070B18]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-xl px-4 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-500/15 text-white"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

