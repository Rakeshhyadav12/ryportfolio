import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-12 bg-[#030014] border-t border-white/5 overflow-hidden">
      {/* Subtle bottom lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-neonPurple/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 rounded-lg border border-neonCyan/30 flex items-center justify-center bg-neonCyan/5">
            <span className="font-orbitron font-extrabold text-sm text-white">RY</span>
          </div>
          <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase font-semibold">
            System_v1.0.4 &bull; online
          </span>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-[11px] text-white/40 font-sans font-light leading-relaxed">
          &copy; {new Date().getFullYear()} Rakesh Yadav. Fusing deep AI engineering and high-performance Web architecture.
        </div>

        {/* Back-to-top trigger */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl border border-white/5 hover:border-neonCyan/30 bg-white/5 text-white/50 hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 group"
          aria-label="Back to Top"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline">Reset Scroll</span>
          <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
