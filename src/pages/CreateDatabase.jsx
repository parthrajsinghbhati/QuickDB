import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { Database, Plus, X, Loader } from 'lucide-react';
import useDatabases from '../hooks/useDatabases';

const CreateDatabase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by context and displayed below
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Database</h1>
            <p className="text-slate-400">Set up a new database to start managing your data and APIs</p>
          </div>

          <div className="space-y-6">
            {/* Database Details Card */}
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-slate-400" />
                <h2 className="text-xl font-semibold text-white">Database Details</h2>
              </div>
              <p className="text-slate-400 mb-6">Choose a name and description for your new database</p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Database Name *
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., E-commerce Store, Blog Platform"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
                  />
                  <p className="mt-2 text-sm text-slate-500">Use a descriptive name that reflects your project's purpose</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea 
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this database will be used for..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all resize-none"
                  ></textarea>
                  <p className="mt-2 text-sm text-slate-500">Optional: Add a description to help you remember this database's purpose</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={handleSubmit}
                    disabled={loading || !name.trim()}
                    className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? <Loader className="animate-spin" size={20} /> : <Plus className="w-5 h-5" />}
                    Create Database
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors border border-slate-700 cursor-pointer"
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
