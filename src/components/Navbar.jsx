import { Database } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full border-b border-slate-800 bg-[#0b1220]/70 backdrop-blur-md">
      <div className="flex items-center justify-between w-full px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-violet-400" />
          <span className="font-semibold text-white text-lg">QuickDB</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:text-violet-300">
            Sign in
          </button>
          <button className="rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:from-violet-500 hover:to-violet-400">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
