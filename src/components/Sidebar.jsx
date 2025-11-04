import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Database, Plus, FileText } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Database, text: "My Databases", path: "/dashboard/databases" },
    { icon: Plus, text: "Create Database", path: "/dashboard/create" },
    { icon: FileText, text: "API Docs", path: "/dashboard/docs" },
  ];

  return (
    <div 
      className={`fixed top-[64px] left-0 h-full bg-slate-900 border-r border-slate-800 shadow-xl transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-48 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      <div className="py-4 overflow-y-auto h-full">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className="flex items-center w-full p-2 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800 group transition-colors"
              >
                <item.icon className="w-4 h-4 text-violet-400 transition-colors" />
                <span className="ml-2">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;