import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, Hash, Type, Calendar, Check } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'

const CreateTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tableName, setTableName] = useState('Users Table');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dummy columns data matching the image
  const [columns, setColumns] = useState([
    { id: 1, name: 'id', type: 'Number', constraints: ['Required', 'Unique'], icon: Hash },
    { id: 2, name: 'email', type: 'Email', constraints: ['Required', 'Unique'], icon: Type },
    { id: 3, name: 'name', type: 'Text', constraints: ['Required'], icon: Type },
    { id: 4, name: 'created_at', type: 'Date', constraints: ['Required'], icon: Calendar },
  ]);

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-start gap-8">
            {/* Left Sidebar - Tables List */}
            <div className="w-64 bg-slate-900/40 rounded-xl border border-slate-800 p-4 hidden md:block h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-200">Tables</h3>
                <button className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-slate-200">
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-violet-500/10 text-violet-400 rounded-lg border border-violet-500/20">
                  <div className="flex items-center gap-3">
                    <div className="opacity-70"><Hash size={16} /></div>
                    <span className="font-medium">Users</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="text-xs">4</span>
                    <Trash2 size={14} className="hover:text-red-400 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Schema Editor */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-slate-100">{tableName}</h1>
                  <button className="text-slate-500 hover:text-violet-400 transition-colors">
                    <Edit2 size={18} />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors text-sm font-medium">
                  <Plus size={16} />
                  Add Column
                </button>
              </div>

              <div className="space-y-4">
                {columns.map((col) => (
                  <div key={col.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                          <col.icon size={20} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-slate-200">{col.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {col.type}, {col.constraints.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                 <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium shadow-lg shadow-violet-900/20 transition-all flex items-center gap-2">
                   <Check size={20} />
                   Save Table
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTable
