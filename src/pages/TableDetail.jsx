import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Loader, ChevronLeft, ChevronRight, RefreshCw, Trash2, Edit2 } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const TableDetail = () => {
  const { databaseId, tableId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
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
                <span className="cursor-pointer hover:text-slate-300" onClick={() => navigate(`/dashboard/database/${databaseId}`)}>Database</span>
                <span>/</span>
                <span className="text-slate-200">{table?.name || 'Table'}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(`/dashboard/database/${databaseId}`)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-slate-100">{table?.name || 'Loading...'}</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => fetchRecords(pagination.page)}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                title="Refresh Data"
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-900/20 font-medium"
              >
                <Plus size={20} />
                Add Record
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-slate-900/40 rounded-xl border border-slate-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader className="animate-spin text-violet-500" size={32} />
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-8">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/50 border-b border-slate-700">
                        <th className="p-4 text-slate-400 font-medium text-sm">ID</th>
                        {columns.map((col, idx) => (
                          <th key={idx} className="p-4 text-slate-400 font-medium text-sm whitespace-nowrap">
                            {col.name} <span className="text-xs text-slate-600 ml-1">({col.type})</span>
                          </th>
                        ))}
                        <th className="p-4 text-slate-400 font-medium text-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {records.length === 0 ? (
                        <tr>
                          <td colSpan={columns.length + 2} className="p-8 text-center text-slate-500">
                            No records found. Add some data to get started.
                          </td>
                        </tr>
                      ) : (
                        records.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="p-4 text-slate-500 font-mono text-xs">{record.id}</td>
                            {columns.map((col, idx) => (
                              <td key={idx} className="p-4 text-slate-300 text-sm whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                                {typeof record.data[col.name] === 'object' 
                                  ? JSON.stringify(record.data[col.name]) 
                                  : String(record.data[col.name] || '-')}
                              </td>
                            ))}
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-blue-400 transition-colors">
                                  <Edit2 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteRecord(record.id)}
                                  className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900/20">
                  <div className="text-sm text-slate-500">
                    Showing {records.length} of {pagination.total} records
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm text-slate-400 px-2">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetail;
