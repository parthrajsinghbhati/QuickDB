import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { Database, Plus, X } from 'lucide-react';

const CreateDatabase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Database Name *
                  </label>
                  <input 
                    type="text" 
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
                    placeholder="Describe what this database will be used for..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all resize-none"
                  ></textarea>
                  <p className="mt-2 text-sm text-slate-500">Optional: Add a description to help you remember this database's purpose</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Plus className="w-5 h-5" />
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

            {/* What's Next Card */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-lg text-center">
              <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
              <p className="text-slate-300 mb-8">After creating your database, you'll be able to:</p>
              
              <div className="space-y-6 flex flex-col items-center">
                <div className="flex items-center gap-4 w-full max-w-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-violet-900/20">1</div>
                  <div className="text-center flex-1">
                    <h4 className="text-white font-medium text-lg">Add Tables</h4>
                    <p className="text-slate-400 text-sm">Create tables to structure your data</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full max-w-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-violet-900/20">2</div>
                  <div className="text-center flex-1">
                    <h4 className="text-white font-medium text-lg">Define Columns</h4>
                    <p className="text-slate-400 text-sm">Set up column names, types, and constraints</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full max-w-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-violet-900/20">3</div>
                  <div className="text-center flex-1">
                    <h4 className="text-white font-medium text-lg">Use Auto-Generated APIs</h4>
                    <p className="text-slate-400 text-sm">Access your data via RESTful APIs automatically created for each table</p>
                  </div>
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
