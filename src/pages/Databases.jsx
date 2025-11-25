import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import DatabaseCard from '../components/DatabaseCard'

const Databases = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dummy data matching the design
  const databases = [
    {
      id: 1,
      name: 'E-commerce Store',
      description: 'Product catalog and order management system',
      status: 'active',
      tables: 5,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Blog Platform',
      description: 'Content management for blog articles',
      status: 'active',
      tables: 3,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'User Management',
      description: 'Authentication and user profiles',
      status: 'inactive',
      tables: 4,
      lastUpdated: '3 days ago'
    }
  ];

  const filteredDatabases = databases.filter(db => 
    db.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-100">My Databases</h1>
              <p className="text-slate-400 mt-1">Manage and access all your databases</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/create')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-900/20 font-medium cursor-pointer"
            >
              <Plus size={20} />
              Create Database
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
          </div>
          
          {/* Database Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatabases.map((db) => (
              <DatabaseCard key={db.id} db={db} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Databases
