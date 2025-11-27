import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Activity, Plus, FileText, BarChart2, ArrowRight, Rocket, Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import useDatabases from '../hooks/useDatabases'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { databases, loading, error, pagination, fetchDatabases } = useDatabases();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchDatabases(1, 9, searchQuery);
  }, [fetchDatabases, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchDatabases(newPage, 9, searchQuery);
    }
  };

  // Stats
  const stats = [
    { label: 'Total Databases', value: pagination.total, icon: Database, color: 'text-blue-400' },
    { label: 'Active Tables', value: databases.reduce((acc, db) => acc + (db._count?.tables || 0), 0), icon: BarChart2, color: 'text-indigo-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100">Welcome back!</h1>
            <p className="text-slate-400 mt-1">Here's what's happening with your databases today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 h-32 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between z-10">
                  <span className="text-slate-400 font-medium text-sm">{stat.label}</span>
                  <stat.icon className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`} size={20} />
                </div>
                <div className="text-4xl font-bold text-slate-100 text-center z-10">{stat.value}</div>
                {/* Decorative background element */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${stat.color.replace('text-', 'bg-')}/5 rounded-full blur-2xl group-hover:bg-opacity-10 transition-all`}></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Databases */}
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Database className="text-slate-100" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">Recent Databases</h2>
                  <p className="text-slate-400 text-sm mt-1">Your most recently accessed databases</p>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader className="animate-spin text-violet-500" size={32} />
                </div>
              ) : error ? (
                <div className="text-red-400 text-center py-4">{error}</div>
              ) : (
                <div className="space-y-4">
                  {databases.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">No databases found.</p>
                  ) : (
                    databases.map((db) => (
                      <div key={db.id} className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                        <div>
                          <h3 className="font-semibold text-slate-200">{db.name}</h3>
                          <p className="text-xs text-slate-500 mt-1">{db._count?.tables || 0} tables • {new Date(db.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/dashboard/database/${db.id}`)}
                          className="text-sm text-slate-400 hover:text-violet-400 font-medium transition-colors cursor-pointer"
                        >
                          Open
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-slate-400 text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Plus className="text-slate-100" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">Quick Actions</h2>
                  <p className="text-slate-400 text-sm mt-1">Get started with these common tasks</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/dashboard/create')}
                  className="w-full flex items-center gap-3 p-4 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all shadow-lg shadow-violet-900/20 cursor-pointer group"
                >
                  <Plus size={20} />
                  <span className="font-medium">Create New Database</span>
                </button>
                
                <button 
                  onClick={() => navigate('/dashboard/docs')}
                  className="w-full flex items-center gap-3 p-4 bg-slate-800/40 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors cursor-pointer group"
                >
                  <Activity size={20} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                  <span className="font-medium">View API Documentation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700/50 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <Rocket className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Getting Started with QuickDB</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg shadow-violet-900/50">1</div>
                  <h3 className="text-white font-semibold mb-2">Create Database</h3>
                  <p className="text-sm text-slate-400">Start by creating your first database project</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg shadow-violet-900/50">2</div>
                  <h3 className="text-white font-semibold mb-2">Add Tables</h3>
                  <p className="text-sm text-slate-400">Design your data structure with tables</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg shadow-violet-900/50">3</div>
                  <h3 className="text-white font-semibold mb-2">Use APIs</h3>
                  <p className="text-sm text-slate-400">Access your auto-generated APIs instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard