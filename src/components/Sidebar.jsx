import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Database, Plus, FileText, Key } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Database, text: "My Databases", path: "/dashboard/databases" },
    { icon: Plus, text: "Create Database", path: "/dashboard/create" },
    { icon: FileText, text: "API Docs", path: "/dashboard/docs" },
    { icon: Key, text: "API Keys", path: "/dashboard/keys" },
  ];

  return (
    <div 
      className={`fixed top-[73px] left-0 h-[calc(100vh-73px)] bg-surface-container-low/60 backdrop-blur-xl border-r border-outline-variant/10 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      <div className="py-6 overflow-y-auto h-full px-4 flex flex-col gap-2">
        <div className="text-xs font-mono font-bold text-on-surface-variant/50 uppercase tracking-widest px-4 mb-2">Main Menu</div>
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all group ${
                    isActive 
                      ? "bg-primary-container/20 text-primary border border-primary/20 shadow-[0_4px_12px_rgba(186,158,255,0.05)]" 
                      : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border border-transparent"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-on-surface-variant group-hover:text-primary"}`} />
                  <span className="ml-3 font-bold tracking-tight">{item.text}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></div>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;