import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Search, Table, MoreVertical, Calendar, Hash, Type, Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardNavbar from '../components/DashboardNavbar'
import Sidebar from '../components/Sidebar'
import TableCard from '../components/TableCard'
import useTables from '../hooks/useTables'
import useDatabases from '../hooks/useDatabases'

const DatabaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  const { tables, loading: tablesLoading, error: tablesError, pagination, fetchTables } = useTables();
  const { currentDatabase, fetchDatabaseById, loading: dbLoading } = useDatabases();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (id) {
      fetchDatabaseById(id);
      
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

      fetchTables(id, 1, 9, searchQuery, sortBy, order);
    }
  }, [id, fetchDatabaseById, fetchTables, searchQuery, sortOption]);

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

      fetchTables(id, newPage, 9, searchQuery, sortBy, order);
    }
  };

  const loading = tablesLoading || dbLoading;

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
                <span className="text-slate-200">{currentDatabase?.name || `Database ${id}`}</span>
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

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>
          </div>

          {/* Tables Grid */}
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin text-violet-500" size={32} />
            </div>
          ) : tablesError ? (
            <div className="text-red-400 text-center py-4">{tablesError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tables.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-slate-500">
                    No tables found. Create one to get started.
                  </div>
                ) : (
                  tables.map((table) => (
                    <TableCard key={table.id} table={table} />
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-8">
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DatabaseDetail
