import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Trash2 } from 'lucide-react'
import useTables from '../hooks/useTables'

const TableCard = ({ table }) => {
  const navigate = useNavigate();
  const { deleteTable } = useTables();
  
  const handleNavigate = () => {
    if (table.databaseId) {
      navigate(`/dashboard/database/${table.databaseId}/table/${table.id}`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await deleteTable(table.id);
      } catch (error) {
        console.error('Failed to delete table:', error);
      }
    }
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-slate-900/40 hover:bg-slate-800/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <Table className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{table.name}</h3>
            <p className="text-xs text-slate-500">{new Date(table.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-2 mb-6">
        {(() => {
          const columns = Array.isArray(table.columns) 
            ? table.columns 
            : Object.entries(table.columns || {}).map(([name, details]) => ({ name, ...details }));
          
          return (
            <>
              {columns.slice(0, 3).map((col, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                  {/* We don't have icons for types yet, just use a generic one or text */}
                  <span>{col.name}</span>
                  <span className="text-xs text-slate-600 ml-auto">{col.type}</span>
                </div>
              ))}
              {columns.length > 3 && (
                <div className="text-xs text-slate-600 pl-6">
                  + {columns.length - 3} more columns
                </div>
              )}
            </>
          );
        })()}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-500">Created {new Date(table.createdAt).toLocaleDateString()}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (table.databaseId) {
               navigate(`/dashboard/database/${table.databaseId}/table/${table.id}`);
            }
          }}
          className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
        >
          View Data
        </button>
      </div>
    </div>
  )
}

export default TableCard
