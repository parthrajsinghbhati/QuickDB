import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background w-full py-12 border-t border-outline-variant/10 relative z-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs tracking-widest uppercase">
        <div className="text-on-surface-variant/60 font-bold">© 2026 QuickDB. Built for the frontend developers.</div>
        <div className="flex gap-8">
          <a className="text-on-surface-variant/80 hover:text-primary transition-colors font-bold" href="#">Documentation</a>
          <a className="text-on-surface-variant/80 hover:text-primary transition-colors font-bold" href="#">Changelog</a>
          <a className="text-on-surface-variant/80 hover:text-primary transition-colors font-bold" href="#">Status</a>
          <a className="text-on-surface-variant/80 hover:text-primary transition-colors font-bold" href="#">Privacy</a>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-on-surface flex items-center gap-2 font-bold bg-surface-container border border-outline-variant/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;