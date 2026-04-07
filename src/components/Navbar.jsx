import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center bg-zinc-950/60 backdrop-blur-xl rounded-full mt-6 max-w-4xl mx-auto border border-violet-500/15 shadow-[0px_0px_20px_rgba(124,58,237,0.1)] font-['Inter'] antialiased">
      <div className="text-xl font-bold tracking-tighter text-zinc-100">QuickDB</div>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/auth")} className="bg-primary text-on-primary-fixed px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all scale-95 active:opacity-80">Start Building</button>
      </div>
    </nav>
  );
}
