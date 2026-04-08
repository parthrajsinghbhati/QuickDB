import React from 'react'
import { Database, Trash2, ExternalLink } from 'lucide-react'
import useDatabases from '../hooks/useDatabases'

const DatabaseCard = ({ db }) => {
  const { deleteDatabase } = useDatabases();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this database?')) {
      try {
        await deleteDatabase(db.id);
      } catch (error) {
        console.error('Failed to delete database:', error);
      }
    }
  };

  return (
    <div className="group glass-card rounded-[2rem] p-6 border border-outline-variant/10 hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(186,158,255,0.1)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col">
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/10 blur-[40px] group-hover:bg-primary/20 transition-colors pointer-events-none rounded-full"></div>
      
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="p-3 w-12 h-12 flex items-center justify-center bg-primary-container/20 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Database className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">{db.name}</h3>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
          (db.status || 'active') === 'active' 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
            : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/20'
        }`}>
          {db.status || 'Active'}
        </span>
      </div>
      
      <p className="text-on-surface-variant text-sm mb-6 h-10 line-clamp-2 leading-relaxed relative z-10">
        {db.description || 'No description provided for this database container.'}
      </p>
      
      <div className="flex items-center gap-4 text-xs font-mono font-medium text-on-surface-variant/70 mb-6 bg-surface-container p-3 rounded-xl border border-outline-variant/5 relative z-10">
        <div className="flex flex-col">
          <span className="uppercase text-[10px] tracking-widest opacity-70 mb-0.5">Tables</span>
          <span className="text-on-surface">{db._count?.tables || db.tables || 0}</span>
        </div>
        <div className="w-px h-6 bg-outline-variant/20"></div>
        <div className="flex flex-col">
          <span className="uppercase text-[10px] tracking-widest opacity-70 mb-0.5">Updated</span>
          <span className="text-on-surface">{db.updatedAt ? new Date(db.updatedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year:'2-digit'}) : (db.lastUpdated || 'Recently')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto relative z-10">
        <button 
          onClick={() => window.location.href = `/dashboard/database/${db.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 hover:text-white text-primary border border-primary/20 rounded-xl transition-all text-sm font-bold cursor-pointer"
        >
          <ExternalLink size={18} />
          Open Data
        </button>
        <button 
          onClick={handleDelete}
          className="p-3 text-on-surface-variant hover:text-error hover:bg-error-container/20 border border-outline-variant/10 hover:border-error/30 rounded-xl transition-colors cursor-pointer"
          title="Delete Database"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default DatabaseCard
