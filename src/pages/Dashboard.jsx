import React, { useState } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">Your Databases</h2>
              <p className="text-slate-400">Create and manage your databases here.</p>
              <button className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
                Create Database
              </button>
            </div>
            
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">API Endpoints</h2>
              <p className="text-slate-400">View and test your auto-generated APIs.</p>
              <button className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
                View APIs
              </button>
            </div>
            
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">Account Settings</h2>
              <p className="text-slate-400">Manage your account preferences.</p>
              <button className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard