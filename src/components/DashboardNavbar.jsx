import React from "react";
import { Database, Book, User } from "lucide-react";

const DashboardNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full border-b border-slate-800 bg-[#0b1220]/70 backdrop-blur-md">
      <div className="flex items-center justify-between w-full px-6 py-4">
        {/* Left side - Logo and Book icon */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-violet-400" />
            <span className="font-semibold text-white text-lg">QuickDB</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Book className="h-5 w-5 text-violet-300" />
          </button>
        </div>

        {/* Right side - Profile icon */}
        <div className="flex items-center">
          <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <User className="h-5 w-5 text-violet-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;