import React from "react";
import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 full-width py-12 border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 font-['Geist_Mono'] text-xs tracking-widest uppercase">
        <div className="text-zinc-500">© 2026 QuickDB. Built for the frontend developers.</div>
        <div className="flex gap-8">
          <a className="text-zinc-500 hover:text-violet-400 transition-colors" href="#">Documentation</a>
          <a className="text-zinc-500 hover:text-violet-400 transition-colors" href="#">Changelog</a>
          <a className="text-zinc-500 hover:text-violet-400 transition-colors" href="#">Status</a>
          <a className="text-zinc-500 hover:text-violet-400 transition-colors" href="#">Privacy</a>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-zinc-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;