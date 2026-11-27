import React from "react";
import { Link } from "react-router-dom";
import { Github, Sparkles } from "lucide-react";

/**
 * Clean, minimal modern footer with brand mark and navigation links.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.07] bg-[#060914]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-bold tracking-tight text-white">
                VoteWise AI
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              AI-powered candidate comparison using public election affidavit
              data. Clarity before every ballot.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Platform
              </p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/" className="transition hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="transition hover:text-white">
                    Compare
                  </Link>
                </li>
                <li>
                  <Link to="/candidates" className="transition hover:text-white">
                    Candidates
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project
              </p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/about" className="transition hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/about#methodology" className="transition hover:text-white">
                    Methodology
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VoteWise AI. Static frontend showcase with placeholder affidavit data.</p>
          <p className="text-slate-500">Non-partisan · Public Disclosure Intelligence</p>
        </div>
      </div>
    </footer>
  );
};

