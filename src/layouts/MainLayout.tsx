import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Root page layout providing the deep navy canvas, ambient radial gradients,
 * sticky navigation bar, and footer.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#070B18] text-slate-100">
      {/* Subtle ambient background gradients & grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-hero-mesh"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-grid-subtle opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

