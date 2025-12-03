import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const TableGrid = ({ columns, records, onDeleteRecord, onEditRecord }) => {
  return (
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
            <th className="p-4 text-slate-400 font-medium text-sm">Raw Data</th>
            <th className="p-4 text-slate-400 font-medium text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {records.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 3} className="p-8 text-center text-slate-500">
                No records found. Add some data to get started.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="p-4 text-slate-500 font-mono text-xs">{record.id}</td>
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 text-slate-300 text-sm whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                    {/* Potential fix area: Ensure record.data[col.name] is accessed correctly */}
                    {typeof record.data[col.name] === 'object' 
                      ? JSON.stringify(record.data[col.name]) 
                      : String(record.data[col.name] !== undefined && record.data[col.name] !== null ? record.data[col.name] : '-')}
                  </td>
                ))}
                <td className="p-4 text-slate-500 font-mono text-xs max-w-xs overflow-hidden text-ellipsis">
                    {JSON.stringify(record.data)}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEditRecord && onEditRecord(record)}
                      className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDeleteRecord && onDeleteRecord(record.id)}
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
  );
};

export default TableGrid;
