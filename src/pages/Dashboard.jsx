import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Activity, Plus, FileText, BarChart2, Rocket, Loader, ChevronRight } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import useDatabases from '../hooks/useDatabases'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { databases, loading, error, pagination, fetchDatabases } = useDatabases();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchDatabases(1, 4, searchQuery); // fetch up to 4 for grid
  }, [fetchDatabases, searchQuery]);

  // Stats
  const stats = [
    { label: 'Total Databases', value: pagination.total, icon: Database, colorClass: 'text-primary' },
    { label: 'Active Tables', value: databases.reduce((acc, db) => acc + (db._count?.tables || 0), 0), icon: BarChart2, colorClass: 'text-secondary' },
  ];

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary-container selection:text-on-primary-container transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-8 py-10">
          
          {/* Welcome Header */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/10 mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">Workspace Active</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                Welcome back<span className="text-primary-dim">.</span>
              </h1>
              <p className="text-on-surface-variant mt-3 text-lg max-w-xl">Here's a quick overview of your databases and recent activity.</p>
            </div>
            
            <button 
              onClick={() => navigate('/dashboard/create')}
              className="cta-gradient px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_4px_20px_rgba(110,59,215,0.4)] text-white"
            >
              <Plus size={20} strokeWidth={3} />
              New Database
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[50px] -mr-20 -mt-20 rounded-full group-hover:bg-primary/10 transition-colors"></div>
                <div className="flex items-start justify-between z-10 relative">
                  <div>
                    <span className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">{stat.label}</span>
                    <div className="text-5xl font-extrabold text-on-surface mt-2">{stat.value}</div>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-outline-variant/10 bg-surface-container-highest ${stat.colorClass} shadow-inner`}>
                    <stat.icon size={28} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Recent Databases (Takes 2/3 width) */}
            <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center border border-primary/20">
                    <Database className="text-primary" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface tracking-tight">Recent Databases</h2>
                </div>
                <button 
                  onClick={() => navigate('/dashboard/databases')}
                  className="text-sm font-bold text-primary hover:text-primary-dim transition-colors flex items-center gap-1 group"
                >
                  View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {loading ? (
                <div className="flex-1 flex justify-center items-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="border-4 border-primary border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex-1 flex flex-col justify-center text-center p-8 bg-error-container/10 rounded-2xl border border-error/20">
                  <span className="text-error font-bold mb-1">Failed to load</span>
                  <span className="text-on-error-container text-sm">{error}</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {databases.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-outline-variant/10 rounded-2xl">
                       <Database className="text-on-surface-variant/30 mb-3" size={40} />
                       <p className="text-on-surface-variant font-medium">No databases found.</p>
                       <p className="text-sm text-on-surface-variant/60 mt-1">Create your first database to get started.</p>
                    </div>
                  ) : (
                    databases.map((db) => (
                      <div 
                        key={db.id} 
                        onClick={() => navigate(`/dashboard/database/${db.id}`)}
                        className="p-5 bg-surface-container-low hover:bg-surface-container-highest rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer group flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-on-surface truncate pr-2 group-hover:text-primary transition-colors">{db.name}</h3>
                          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors group-hover:scale-110">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                        <div className="mt-auto flex items-center gap-3 text-xs font-medium text-on-surface-variant mt-4">
                          <span className="bg-surface-container-highest px-2 py-1 rounded-md border border-outline-variant/5">
                            {db._count?.tables || 0} Tables
                          </span>
                          <span>{new Date(db.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Quick Links & Actions (Takes 1/3 width) */}
            <div className="glass-card rounded-[2rem] p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/10 flex items-center justify-center border border-secondary/20">
                  <Activity className="text-secondary" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-on-surface tracking-tight">Quick Actions</h2>
              </div>
              
              <div className="space-y-4 flex-1">
                <button 
                  onClick={() => navigate('/dashboard/create')}
                  className="w-full text-left p-5 bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface-container-highest rounded-2xl transition-all group flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">New Connection</h3>
                    <p className="text-sm text-on-surface-variant mt-1 leading-snug">Spin up a new database cluster instantly.</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate('/dashboard/docs')}
                  className="w-full text-left p-5 bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface-container-highest rounded-2xl transition-all group flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center flex-shrink-0 text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface group-hover:text-tertiary transition-colors">API Reference</h3>
                    <p className="text-sm text-on-surface-variant mt-1 leading-snug">View usage limits and endpoint documentation.</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="relative rounded-[3rem] p-10 overflow-hidden neon-bloom border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-high/90 to-surface-container-low/90 backdrop-blur-3xl z-0"></div>
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/3">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant/10 mb-6 shadow-xl relative">
                   <div className="absolute inset-0 bg-secondary/10 rounded-2xl animate-ping opacity-20"></div>
                   <Rocket className="text-secondary" size={32} />
                 </div>
                 <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-4">Fast track your workflow</h2>
                 <p className="text-on-surface-variant leading-relaxed">Three simple steps to transition from zero to production-ready architecture.</p>
               </div>
               
               <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { step: '01', title: 'Initialize', desc: 'Create your first project database container.' },
                   { step: '02', title: 'Design', desc: 'Define your table schemas effortlessly.' },
                   { step: '03', title: 'Deploy', desc: 'Access instant, secure RESTful endpoints.' }
                 ].map((item, i) => (
                   <div key={i} className="bg-surface-container/50 border border-outline-variant/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-surface-container transition-colors">
                     <span className="text-5xl font-black text-outline-variant/10 absolute -right-2 -bottom-4 group-hover:text-outline-variant/20 transition-colors pointer-events-none">{item.step}</span>
                     <div className="text-primary font-mono font-bold text-sm mb-3">STEP {item.step}</div>
                     <h3 className="text-lg font-bold text-on-surface mb-2 relative z-10">{item.title}</h3>
                     <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">{item.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard