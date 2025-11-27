import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, Hash, Type, Calendar, Check, Loader, ArrowLeft } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import useTables from '../hooks/useTables'

const CreateTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { createTable, loading, error } = useTables();
  
  const [tableName, setTableName] = useState('New Table');
  const [columns, setColumns] = useState([
    { id: 1, name: 'id', type: 'Integer', constraints: ['Primary Key', 'Auto Increment'], icon: Hash },
    { id: 2, name: 'created_at', type: 'DateTime', constraints: ['Default Now'], icon: Calendar },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addColumn = () => {
    const newId = Math.max(...columns.map(c => c.id), 0) + 1;
    setColumns([...columns, { 
      id: newId, 
      name: `column_${newId}`, 
      type: 'String', 
      constraints: [], 
      icon: Type 
    }]);
  };

  const removeColumn = (columnId) => {
    setColumns(columns.filter(c => c.id !== columnId));
  };

  const updateColumn = (columnId, field, value) => {
    setColumns(columns.map(c => {
      if (c.id === columnId) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleSave = async () => {
    if (!tableName.trim()) return;
    try {
      // Format columns for backend
      const formattedColumns = columns.reduce((acc, col) => {
        acc[col.name] = {
          type: col.type,
          constraints: col.constraints
        };
        return acc;
      }, {});

      await createTable(id, tableName, formattedColumns);
      navigate(`/dashboard/database/${id}`);
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-start gap-8">
            {/* Left Sidebar - Tables List (Optional/Placeholder) */}
            <div className="w-64 bg-slate-900/40 rounded-xl border border-slate-800 p-4 hidden md:block h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-200">Tables</h3>
              </div>
              <div className="text-slate-500 text-sm text-center py-4">
                Creating new table...
              </div>
            </div>

            {/* Main Content - Schema Editor */}
            <div className="flex-1">
              <div className="mb-6">
                <button 
                  onClick={() => navigate(`/dashboard/database/${id}`)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Database
                </button>
                
                {error && (
                  <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      className="text-2xl font-bold text-slate-100 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-violet-500 focus:outline-none transition-colors"
                    />
                    <Edit2 size={18} className="text-slate-500" />
                  </div>
                  <button 
                    onClick={addColumn}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
                  >
                    <Plus size={16} />
                    Add Column
                  </button>
                </div>

                <div className="space-y-4">
                  {columns.map((col) => (
                    <div key={col.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                            <col.icon size={20} />
                          </div>
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-500 block mb-1">Name</label>
                              <input
                                type="text"
                                value={col.name}
                                onChange={(e) => updateColumn(col.id, 'name', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-sm focus:outline-none focus:border-violet-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 block mb-1">Type</label>
                              <select
                                value={col.type}
                                onChange={(e) => updateColumn(col.id, 'type', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-sm focus:outline-none focus:border-violet-500"
                              >
                                <option value="String">String</option>
                                <option value="Integer">Integer</option>
                                <option value="Boolean">Boolean</option>
                                <option value="DateTime">DateTime</option>
                                <option value="Json">Json</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => removeColumn(col.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                   <button 
                     onClick={handleSave}
                     disabled={loading || !tableName.trim()}
                     className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg shadow-violet-900/20 transition-all flex items-center gap-2"
                   >
                     {loading ? <Loader className="animate-spin" size={20} /> : <Check size={20} />}
                     Save Table
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTable
