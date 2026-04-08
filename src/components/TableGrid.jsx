import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const TableGrid = ({ columns, records, onDeleteRecord, onEditRecord }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 shadow-inner">
      <table className="w-full text-left border-collapse font-mono text-sm">
        <thead>
          <tr className="bg-surface-container-high border-b border-outline-variant/20">
            <th className="p-4 px-6 text-on-surface-variant font-bold text-xs uppercase tracking-widest border-r border-outline-variant/10">ID</th>
            {columns.map((col, idx) => (
              <th key={idx} className="p-4 px-6 text-on-surface-variant font-bold text-xs uppercase tracking-widest whitespace-nowrap border-r border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="text-primary">{col.name}</span>
                  <span className="text-[10px] text-tertiary bg-tertiary/10 px-1.5 py-0.5 rounded border border-tertiary/20">{col.type}</span>
                </div>
              </th>
            ))}
            <th className="p-4 px-6 text-on-surface-variant font-bold text-xs uppercase tracking-widest border-r border-outline-variant/10">Raw JSON</th>
            <th className="p-4 px-6 text-on-surface-variant font-bold text-xs uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {records.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 3} className="p-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-dashed border-outline-variant/30 flex items-center justify-center text-on-surface-variant/50 font-sans">
                    Ø
                  </div>
                  <span className="text-on-surface-variant font-sans font-medium">No records found. Empty dataset in current view.</span>
                </div>
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="hover:bg-primary/5 transition-colors group">
                <td className="p-4 px-6 text-on-surface-variant/80 border-r border-outline-variant/10">{record.id}</td>
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 px-6 text-on-surface whitespace-nowrap max-w-xs overflow-hidden text-ellipsis border-r border-outline-variant/10">
                    {typeof record.data[col.name] === 'object' 
                      ? <span className="text-tertiary">{JSON.stringify(record.data[col.name])}</span> 
                      : (record.data[col.name] !== undefined && record.data[col.name] !== null 
                          ? String(record.data[col.name]) 
                          : <span className="text-outline/40 italic">null</span>)}
                  </td>
                ))}
                <td className="p-4 px-6 text-outline/50 max-w-xs overflow-hidden text-ellipsis border-r border-outline-variant/10 text-xs">
                    {JSON.stringify(record.data)}
                </td>
                <td className="p-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEditRecord && onEditRecord(record)}
                      className="p-2 hover:bg-surface-container-highest rounded-lg text-on-surface-variant hover:text-secondary border border-transparent hover:border-secondary/20 transition-all cursor-pointer"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDeleteRecord && onDeleteRecord(record.id)}
                      className="p-2 hover:bg-error-container/20 rounded-lg text-on-surface-variant hover:text-error border border-transparent hover:border-error/20 transition-all cursor-pointer"
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
