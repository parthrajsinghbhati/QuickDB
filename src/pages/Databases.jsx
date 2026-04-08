import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import DatabaseCard from '../components/DatabaseCard'
import useDatabases from '../hooks/useDatabases'

const Databases = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();
  const { databases, loading, error, pagination, fetchDatabases } = useDatabases();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    let sortBy = 'createdAt';
    let order = 'desc';

    if (sortOption === 'oldest') {
      sortBy = 'createdAt';
      order = 'asc';
    } else if (sortOption === 'name_asc') {
      sortBy = 'name';
      order = 'asc';
    } else if (sortOption === 'name_desc') {
      sortBy = 'name';
      order = 'desc';
    }

    fetchDatabases(1, 9, searchQuery, sortBy, order);
  }, [fetchDatabases, searchQuery, sortOption]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      let sortBy = 'createdAt';
      let order = 'desc';

      if (sortOption === 'oldest') {
        sortBy = 'createdAt';
        order = 'asc';
      } else if (sortOption === 'name_asc') {
        sortBy = 'name';
        order = 'asc';
      } else if (sortOption === 'name_desc') {
        sortBy = 'name';
        order = 'desc';
      }
      
      fetchDatabases(newPage, 9, searchQuery, sortBy, order);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-background transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-8 py-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">My Databases</h1>
              <p className="text-on-surface-variant text-lg">Manage, configure, and access your database containers.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/create')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 cta-gradient text-white rounded-xl hover:scale-[1.02] shadow-[0_4px_20px_rgba(110,59,215,0.4)] transition-all font-bold cursor-pointer"
            >
              <Plus size={20} strokeWidth={3} />
              Create Database
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 glass-card p-4 rounded-2xl border-outline-variant/10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input 
                type="text"
                placeholder="Search databases by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-xl text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
              />
            </div>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-5 py-3 w-full md:w-48 bg-surface-container border border-outline-variant/10 rounded-xl text-on-surface font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none dropdown-arrow"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>
          </div>
          
          {/* Database Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 bg-error-container/20 border border-error/30 rounded-2xl text-center">
              <p className="text-error font-bold mb-1">Failed to load databases</p>
              <p className="text-sm text-on-error-container">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {databases.length === 0 ? (
                  <div className="col-span-full text-center py-20 border-2 border-dashed border-outline-variant/10 rounded-3xl">
                    <p className="text-on-surface-variant font-medium text-lg mb-2">No databases found.</p>
                    <p className="text-on-surface-variant/60">Create one to get started bridging your UI to data.</p>
                  </div>
                ) : (
                  databases.map((db) => (
                    <DatabaseCard key={db.id} db={db} />
                  ))
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12 mb-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-3 rounded-full bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:border-outline-variant/10 disabled:hover:text-on-surface-variant disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-on-surface font-bold text-sm tracking-widest uppercase">
                    Page {pagination.page} <span className="text-on-surface-variant font-normal">of</span> {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-3 rounded-full bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:border-outline-variant/10 disabled:hover:text-on-surface-variant disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Databases
