import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { Database, Plus, X, Loader } from 'lucide-react';
import useDatabases from '../hooks/useDatabases';

const CreateDatabase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { createDatabase, loading, error } = useDatabases();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await createDatabase(name, description);
      navigate('/dashboard/databases');
    } catch (err) {
      // Error is handled by context and displayed below
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-4xl mx-auto px-8 py-10">
          
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Create New Database</h1>
            <p className="text-on-surface-variant text-lg">Define a new isolated container for your tables and APIs.</p>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden border border-outline-variant/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center border border-primary/20 shadow-inner">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-on-surface">Database Details</h2>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-error-container/20 border border-error/30 rounded-xl text-error font-medium flex items-center gap-3">
                  <X className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                    Database Name <span className="text-error">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., E-commerce Store, Blog Platform"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-5 py-4 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all font-medium"
                  />
                  <p className="mt-3 text-sm text-on-surface-variant/70">A unique name to identify your project.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                    Description
                  </label>
                  <textarea 
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this database will be used for..."
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-5 py-4 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/10">
                  <button 
                    onClick={handleSubmit}
                    disabled={loading || !name.trim()}
                    className="flex-1 cta-gradient neon-bloom disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 cursor-pointer shadow-lg"
                  >
                    {loading ? <Loader className="animate-spin" size={20} /> : <Plus className="w-5 h-5" strokeWidth={3} />}
                    Create Database
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/databases')}
                    className="px-8 py-4 bg-surface-container-low hover:bg-surface-container-highest text-on-surface font-bold rounded-xl transition-colors border border-outline-variant/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDatabase;
