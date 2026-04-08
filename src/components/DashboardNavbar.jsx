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
    <nav className="sticky top-0 left-0 right-0 z-50 w-full border-b border-outline-variant/10 bg-background/60 backdrop-blur-2xl">
      <div className="flex items-center justify-between w-full px-6 py-4">
        {/* Left side - Logo and Toggle icon */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center border border-primary/20 group-hover:bg-primary-container/30 transition-colors">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <span className="font-extrabold text-on-surface text-xl tracking-tight">QuickDB</span>
          </div>
          <div className="h-6 w-px bg-outline-variant/20"></div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-on-surface-variant group"
          >
            <Book className="h-5 w-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium hidden sm:inline-block">Menu</span>
          </button>
        </div>

        {/* Right side - Profile icon */}
        <div className="flex items-center relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-3 p-1.5 pl-4 rounded-full bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-highest transition-colors group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">{user?.name || 'User'}</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <ChevronDown className={`h-4 w-4 text-on-surface-variant transition-transform hidden sm:block mr-1 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-3 w-56 glass-card rounded-2xl overflow-hidden z-50 neon-bloom origin-top-right animate-in fade-in zoom-in-95 duration-200"
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low/50">
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant/70 mb-1">Signed in as</p>
                <p className="text-sm font-bold text-on-surface truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-on-surface-variant truncate mt-0.5">{user?.email || ''}</p>
              </div>
              <div className="p-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-error hover:bg-error-container/20 rounded-xl transition-colors font-medium"
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