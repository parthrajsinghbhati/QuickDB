import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Loader, ChevronLeft, ChevronRight, RefreshCw, Database } from 'lucide-react';
import TableGrid from '../components/TableGrid';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const TableDetail = () => {
  const { databaseId, tableId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [table, setTable] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [refreshing, setRefreshing] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchTableDetails = async () => {
    try {
      const response = await api.get(`/tables/${tableId}`);
      setTable(response.data);
    } catch (err) {
      console.error('Failed to fetch table details:', err);
      setError('Failed to load table details');
    }
  };

  const fetchRecords = async (page = 1) => {
    try {
      setRefreshing(true);
      const response = await api.get(`/data/${tableId}/records`, {
        params: { page, limit: 50 }
      });
      setRecords(response.data.records);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      setError('Failed to load data');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableDetails();
    fetchRecords(1);
  }, [tableId]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchRecords(newPage);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.delete(`/data/${tableId}/records/${recordId}`);
      fetchRecords(pagination.page);
    } catch (err) {
      alert('Failed to delete record');
    }
  };

  // Helper to get columns from table definition
  const getColumns = () => {
    if (!table || !table.columns) return [];
    return Array.isArray(table.columns) 
      ? table.columns 
      : Object.entries(table.columns).map(([name, details]) => ({ name, ...details }));
  };

  const columns = getColumns();

  return (
    <div className="min-h-screen bg-background font-body text-on-background transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-8 py-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm mb-4 font-medium px-4 py-2 bg-surface-container-low border border-outline-variant/10 rounded-max w-fit rounded-full">
                <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate('/dashboard')}><Database size={14}/> Dashboard</span>
                <span className="text-outline/40">/</span>
                <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate(`/dashboard/database/${databaseId}`)}>Database</span>
                <span className="text-outline/40">/</span>
                <span className="text-on-surface font-bold">{table?.name || 'Table'}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">{table?.name || 'Loading...'} Data</h1>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => fetchRecords(pagination.page)}
                className="p-3.5 bg-surface-container border border-outline-variant/20 hover:border-primary/50 text-on-surface rounded-xl transition-all shadow-sm cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-6 py-3.5 cta-gradient text-white rounded-xl hover:scale-[1.02] transition-transform shadow-[0_4px_20px_rgba(110,59,215,0.4)] font-bold cursor-pointer"
              >
                <Plus size={20} strokeWidth={3} />
                Add Record
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="glass-card rounded-[2rem] border border-outline-variant/20 overflow-hidden shadow-2xl">
            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 bg-error-container/20 border-b border-error/30 text-center">
                 <p className="text-error font-bold mb-1">Failed to load data</p>
                 <p className="text-sm text-on-error-container">{error}</p>
              </div>
            ) : (
              <div className="p-6">
                <TableGrid 
                  columns={columns}
                  records={records}
                  onDeleteRecord={handleDeleteRecord}
                  onEditRecord={(record) => console.log('Edit record:', record)}
                />

                {/* Pagination Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-6 border-t border-outline-variant/10">
                  <div className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4 sm:mb-0">
                    Showing <span className="text-primary">{records.length}</span> of <span className="text-primary">{pagination.total}</span> records
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="p-3 rounded-full bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:border-outline-variant/10 disabled:hover:text-on-surface-variant disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-on-surface font-bold text-sm tracking-widest uppercase">
                       {pagination.page} <span className="text-on-surface-variant font-normal">/</span> {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="p-3 rounded-full bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:border-outline-variant/10 disabled:hover:text-on-surface-variant disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetail;
