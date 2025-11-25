import React from 'react'
import { Table, MoreVertical } from 'lucide-react'

const TableCard = ({ table }) => {
  return (
    <div className="bg-slate-900/40 hover:bg-slate-800/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <Table className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{table.name}</h3>
            <p className="text-xs text-slate-500">{table.rows} rows</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-2 mb-6">
        {table.schema.slice(0, 3).map((col, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
            <col.icon size={14} className="text-slate-600" />
            <span>{col.name}</span>
            <span className="text-xs text-slate-600 ml-auto">{col.type}</span>
          </div>
        ))}
        {table.schema.length > 3 && (
          <div className="text-xs text-slate-600 pl-6">
            + {table.schema.length - 3} more columns
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-500">Updated {table.lastUpdated}</span>
        <button className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">
          View Data
        </button>
      </div>
    </div>
  )
}

export default TableCard
