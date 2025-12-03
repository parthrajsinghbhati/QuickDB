import React, { useState, useEffect, useRef } from "react";
import { Database, Book, User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

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
        <div className="flex items-center relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User className="h-5 w-5 text-violet-300" />
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50"
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-sm text-slate-400">Signed in as</p>
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              </div>
              <div className="p-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;