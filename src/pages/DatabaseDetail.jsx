import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Search, Table, MoreVertical, Calendar, Hash, Type } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import TableCard from '../components/TableCard'

const DatabaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dummy data for tables
  const tables = [
    {
      id: 1,
      name: 'users',
      columns: 4,
      rows: 1250,
      lastUpdated: '2 hours ago',
      schema: [
        { name: 'id', type: 'Number', icon: Hash },
        { name: 'email', type: 'Email', icon: Type },
        { name: 'name', type: 'Text', icon: Type },
        { name: 'created_at', type: 'Date', icon: Calendar },
      ]
    },
    {
      id: 2,
      name: 'products',
      columns: 6,
      rows: 84,
      lastUpdated: '1 day ago',
      schema: [
        { name: 'id', type: 'Number', icon: Hash },
        { name: 'title', type: 'Text', icon: Type },
        { name: 'price', type: 'Number', icon: Hash },
      ]
    },
    {
      id: 3,
      name: 'orders',
      columns: 5,
      rows: 450,
      lastUpdated: '5 hours ago',
      schema: [
        { name: 'id', type: 'Number', icon: Hash },
        { name: 'user_id', type: 'Number', icon: Hash },
        { name: 'total', type: 'Number', icon: Hash },
      ]
    }
  ];

  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <span className="cursor-pointer hover:text-slate-300" onClick={() => navigate('/dashboard')}>Dashboard</span>
                <span>/</span>
                <span className="text-slate-200">Database {id}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-100">Tables</h1>
              <p className="text-slate-400 mt-1">Manage the schema and data for this database</p>
            </div>
            <button 
              onClick={() => navigate(`/dashboard/database/${id}/new`)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-900/20 font-medium cursor-pointer"
            >
              <Plus size={20} />
              Create New Table
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTables.map((table) => (
              <TableCard key={table.id} table={table} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabaseDetail
