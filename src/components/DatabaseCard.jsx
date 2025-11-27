import React from 'react'
import { Database, Trash2, ExternalLink } from 'lucide-react'

const DatabaseCard = ({ db }) => {
  return (
    <div className="group bg-slate-900/40 hover:bg-slate-800/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 transition-colors">
            <Database className="text-violet-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{db.name}</h3>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          (db.status || 'active') === 'active' 
            ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
            : 'bg-slate-700/30 text-slate-400 border border-slate-700/50'
        }`}>
          {db.status || 'Active'}
        </span>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 h-10 line-clamp-2">
        {db.description || 'No description provided'}
      </p>
      
      <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
        <span>{db._count?.tables || db.tables || 0} tables</span>
        <span>Updated {db.updatedAt ? new Date(db.updatedAt).toLocaleDateString() : (db.lastUpdated || 'Recently')}</span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.location.href = `/dashboard/database/${db.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
        >
          <ExternalLink size={16} />
          Open
        </button>
        <button className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default DatabaseCard
