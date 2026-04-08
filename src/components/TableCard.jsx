import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Trash2, Database, AlignLeft, Hash, Calendar, Layers } from 'lucide-react'
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
      className="group glass-card rounded-[2rem] p-6 border border-outline-variant/10 hover:border-tertiary/40 hover:shadow-[0_8px_30px_rgb(176,174,255,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-tertiary/10 blur-[40px] group-hover:bg-tertiary/20 transition-colors pointer-events-none rounded-full"></div>

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-tertiary/10 rounded-xl border border-tertiary/20 group-hover:scale-110 group-hover:bg-tertiary/20 transition-all duration-300">
            <Table className="text-tertiary shadow-[0_0_10px_rgba(176,174,255,0.4)]" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-on-surface tracking-tight group-hover:text-tertiary transition-colors">{table.name}</h3>
            <p className="text-xs font-mono text-on-surface-variant mt-1.5 flex items-center gap-1 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active Model
            </p>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="text-on-surface-variant hover:text-error hover:bg-error-container/20 p-2.5 rounded-xl border border-transparent hover:border-error/30 transition-colors"
          title="Drop Table"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3 mb-6 relative z-10 flex-1">
        <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Schema Preview</div>
        {(() => {
          const columns = Array.isArray(table.columns) 
            ? table.columns 
            : Object.entries(table.columns || {}).map(([name, details]) => ({ name, ...details }));
          
          return (
            <div className="bg-surface-container/50 border border-outline-variant/5 rounded-xl p-3">
              {columns.slice(0, 3).map((col, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-on-surface py-1.5 border-b border-outline-variant/10 last:border-0 last:pb-0">
                  <Layers className="text-on-surface-variant opacity-50" size={12}/>
                  <span className="font-mono">{col.name}</span>
                  <span className="text-[10px] font-bold text-tertiary ml-auto uppercase tracking-widest bg-tertiary/10 px-2 py-0.5 rounded-md border border-tertiary/20">{col.type}</span>
                </div>
              ))}
              {columns.length > 3 && (
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center mt-3 border-t border-outline-variant/10 pt-2 opacity-70">
                  + {columns.length - 3} additional columns
                </div>
              )}
            </div>
          );
        })()}
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-outline-variant/10 relative z-10">
        <div className="flex items-center gap-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
           <Calendar size={12} />
           <span>{new Date(table.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (table.databaseId) {
               navigate(`/dashboard/database/${table.databaseId}/table/${table.id}`);
            }
          }}
          className="text-sm font-bold text-tertiary hover:text-white transition-colors group-hover:translate-x-1 duration-300"
        >
          View Data ➔
        </button>
      </div>
    </div>
  )
}

export default TableCard
