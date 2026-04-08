import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Edit2, Hash, Type, Calendar, Check, Loader, ArrowLeft, Database, Layers } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import useTables from '../hooks/useTables'

const CreateTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-background text-on-background font-body transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-4xl mx-auto px-8 py-10">
          
          <div className="mb-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm mb-4 font-medium px-4 py-2 bg-surface-container-low border border-outline-variant/10 w-fit rounded-full">
                <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate('/dashboard')}><Database size={14}/> Dashboard</span>
                <span className="text-outline/40">/</span>
                <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate(`/dashboard/database/${id}`)}>Database</span>
                <span className="text-outline/40">/</span>
                <span className="text-on-surface font-bold">New Table</span>
              </div>
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Create New Table</h1>
              <p className="text-on-surface-variant text-lg">Define your schema and data types.</p>
            </div>
            
            <button 
              onClick={() => navigate(`/dashboard/database/${id}`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low hover:bg-surface-container-highest text-on-surface font-bold rounded-xl transition-colors border border-outline-variant/20 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden border border-outline-variant/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

              {error && (
                <div className="mb-8 p-4 bg-error-container/20 border border-error/30 rounded-xl text-error font-medium flex items-center gap-3">
                   {error}
                </div>
              )}

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-outline-variant/10 relative z-10">
                <div className="flex flex-1 items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center border border-primary/20 shadow-inner">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 max-w-sm relative group">
                    <input
                      type="text"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      className="text-3xl font-extrabold text-on-surface bg-transparent border-b-2 border-transparent hover:border-outline-variant/30 focus:border-primary focus:outline-none transition-colors w-full pb-1"
                    />
                    <Edit2 size={16} className="text-on-surface-variant absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>
                
                <button 
                  onClick={addColumn}
                  className="flex items-center gap-2 px-5 py-2.5 bg-surface-container border border-outline-variant/20 hover:border-primary/50 text-on-surface font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <Plus size={18} strokeWidth={3} />
                  Add Column
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="grid grid-cols-12 gap-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 opacity-80">
                   <div className="col-span-1">Icon</div>
                   <div className="col-span-5">Column Name</div>
                   <div className="col-span-5">Data Type</div>
                   <div className="col-span-1 text-right">Action</div>
                </div>

                {columns.map((col) => (
                  <div key={col.id} className="bg-surface-container-low/50 hover:bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/10 hover:border-outline-variant/30 transition-all group">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 flex justify-center">
                        <div className="w-10 h-10 bg-surface-container rounded-lg border border-outline-variant/10 flex items-center justify-center text-on-surface-variant shadow-inner group-hover:text-primary transition-colors">
                          <col.icon size={18} />
                        </div>
                      </div>
                      
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={col.name}
                          onChange={(e) => updateColumn(col.id, 'name', e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface font-mono text-sm placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                        />
                      </div>

                      <div className="col-span-5">
                        <select
                          value={col.type}
                          onChange={(e) => updateColumn(col.id, 'type', e.target.value)}
                          className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner appearance-none dropdown-arrow"
                        >
                          <option value="String">String</option>
                          <option value="Integer">Integer</option>
                          <option value="Boolean">Boolean</option>
                          <option value="DateTime">DateTime</option>
                          <option value="Json">Json</option>
                        </select>
                      </div>
                      
                      <div className="col-span-1 flex justify-end">
                        <button 
                          onClick={() => removeColumn(col.id)}
                          className="p-3 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-error/20"
                          title="Remove Column"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-outline-variant/10 flex justify-end relative z-10">
                 <button 
                   onClick={handleSave}
                   disabled={loading || !tableName.trim()}
                   className="px-8 py-4 cta-gradient neon-bloom disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center gap-3 cursor-pointer"
                 >
                   {loading ? <Loader className="animate-spin" size={20} /> : <Check size={20} strokeWidth={3} />}
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
