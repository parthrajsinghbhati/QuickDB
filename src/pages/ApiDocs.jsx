import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronRight, Database, Table as TableIcon, Code, Server } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import useDatabases from '../hooks/useDatabases';
import { useDatabaseContext } from '../context/DatabaseContext';

const ApiDocs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { databases, fetchDatabases, loading } = useDatabases();
  const { fetchTables, tables } = useDatabaseContext();
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [copied, setCopied] = useState(null);
  const [apiKey, setApiKey] = useState('YOUR_API_KEY');

  useEffect(() => {
    fetchDatabases();
    // Fetch the first API key to use in examples
    const fetchKey = async () => {
      try {
        // We need to import api service here or move it outside
        const response = await fetch('https://quickdb-backend.onrender.com/api/keys', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (data.length > 0) {
          setApiKey(data[0].key);
        }
      } catch (err) {
        console.error('Failed to fetch API key for docs', err);
      }
    };
    fetchKey();
  }, [fetchDatabases]);

  useEffect(() => {
    if (selectedDatabase) {
      fetchTables(selectedDatabase.id);
    }
  }, [selectedDatabase, fetchTables]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const baseUrl = 'https://quickdb-backend.onrender.com/api/data';

  const getCodeExample = (method, tableId) => {
    const url = `${baseUrl}/${tableId}/records`;

    switch (method) {
      case 'GET':
        return `// Get all records
const response = await fetch('${url}', {
  method: 'GET',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`;
      case 'POST':
        return `// Create a new record
const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // Your data here
    name: "Example Name",
    value: 123
  })
});

const newRecord = await response.json();
console.log(newRecord);`;
      case 'GET_ID':
        return `// Get record by ID
const response = await fetch('${url}/:id', {
  method: 'GET',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  }
});

const record = await response.json();
console.log(record);`;
      case 'PUT':
        return `// Update a record
const response = await fetch('${url}/:id', {
  method: 'PUT',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // Updated data
    name: "Updated Name"
  })
});

const updatedRecord = await response.json();
console.log(updatedRecord);`;
      case 'DELETE':
        return `// Delete a record
const response = await fetch('${url}/:id', {
  method: 'DELETE',
  headers: {
    'x-api-key': '${apiKey}',
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
console.log(result);`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Documentation Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-violet-500" />
                  Databases
                </h3>
                <div className="space-y-2">
                  {loading ? (
                    <div className="text-slate-500 text-sm">Loading...</div>
                  ) : databases.length === 0 ? (
                    <div className="text-slate-500 text-sm">No databases found</div>
                  ) : (
                    databases.map((db) => (
                      <div key={db.id} className="space-y-1">
                        <button
                          onClick={() => setSelectedDatabase(db === selectedDatabase ? null : db)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedDatabase?.id === db.id
                              ? 'bg-violet-600/10 text-violet-400'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate">{db.name}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${selectedDatabase?.id === db.id ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {selectedDatabase?.id === db.id && (
                          <div className="pl-4 space-y-1 mt-1">
                            {tables.length === 0 ? (
                              <div className="text-slate-600 text-xs px-3 py-1">No tables</div>
                            ) : (
                              tables.map((table) => (
                                <button
                                  key={table.id}
                                  onClick={() => setSelectedTable(table)}
                                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    selectedTable?.id === table.id
                                      ? 'bg-violet-600 text-white'
                                      : 'text-slate-500 hover:text-slate-300'
                                  }`}
                                >
                                  <TableIcon className="w-3 h-3" />
                                  <span className="truncate">{table.name}</span>
                                </button>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">API Documentation</h1>
                <p className="text-slate-400">Auto-generated REST APIs for your database tables</p>
              </div>

              {/* Base URL Card */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-5 h-5 text-violet-500" />
                  <h2 className="text-lg font-semibold text-white">API Base URL</h2>
                </div>
                <p className="text-slate-400 text-sm mb-4">All API endpoints are available under this base URL</p>
                <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 flex items-center justify-between group">
                  <code className="text-violet-400 font-mono text-sm">{baseUrl}</code>
                  <button
                    onClick={() => handleCopy(baseUrl, 'base-url')}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  >
                    {copied === 'base-url' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {selectedTable ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                    <Code className="w-6 h-6 text-violet-500" />
                    <h2 className="text-2xl font-bold text-white">{selectedTable.name} API</h2>
                  </div>

                  {/* Endpoints List */}
                  <div className="space-y-6">
                    {/* GET All */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">GET</span>
                        <code className="text-slate-300 font-mono text-sm">/{selectedTable.id}/records</code>
                        <span className="text-slate-500 text-sm ml-auto">Get all records</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                          <span className="text-xs font-medium text-slate-400">JavaScript</span>
                          <button
                            onClick={() => handleCopy(getCodeExample('GET', selectedTable.id), 'get-all')}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copied === 'get-all' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'get-all' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                          {getCodeExample('GET', selectedTable.id)}
                        </pre>
                      </div>
                    </div>

                    {/* POST */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">POST</span>
                        <code className="text-slate-300 font-mono text-sm">/{selectedTable.id}/records</code>
                        <span className="text-slate-500 text-sm ml-auto">Create a new record</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                          <span className="text-xs font-medium text-slate-400">JavaScript</span>
                          <button
                            onClick={() => handleCopy(getCodeExample('POST', selectedTable.id), 'post')}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copied === 'post' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'post' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                          {getCodeExample('POST', selectedTable.id)}
                        </pre>
                      </div>
                    </div>

                    {/* GET By ID */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">GET</span>
                        <code className="text-slate-300 font-mono text-sm">/{selectedTable.id}/records/:id</code>
                        <span className="text-slate-500 text-sm ml-auto">Get record by ID</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                          <span className="text-xs font-medium text-slate-400">JavaScript</span>
                          <button
                            onClick={() => handleCopy(getCodeExample('GET_ID', selectedTable.id), 'get-id')}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copied === 'get-id' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'get-id' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                          {getCodeExample('GET_ID', selectedTable.id)}
                        </pre>
                      </div>
                    </div>

                     {/* PUT */}
                     <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">PUT</span>
                        <code className="text-slate-300 font-mono text-sm">/{selectedTable.id}/records/:id</code>
                        <span className="text-slate-500 text-sm ml-auto">Update record</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                          <span className="text-xs font-medium text-slate-400">JavaScript</span>
                          <button
                            onClick={() => handleCopy(getCodeExample('PUT', selectedTable.id), 'put')}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copied === 'put' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'put' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                          {getCodeExample('PUT', selectedTable.id)}
                        </pre>
                      </div>
                    </div>

                    {/* DELETE */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">DELETE</span>
                        <code className="text-slate-300 font-mono text-sm">/{selectedTable.id}/records/:id</code>
                        <span className="text-slate-500 text-sm ml-auto">Delete record</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                          <span className="text-xs font-medium text-slate-400">JavaScript</span>
                          <button
                            onClick={() => handleCopy(getCodeExample('DELETE', selectedTable.id), 'delete')}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copied === 'delete' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === 'delete' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                          {getCodeExample('DELETE', selectedTable.id)}
                        </pre>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <TableIcon className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Table</h3>
                  <p className="text-slate-400 text-center max-w-md">
                    Choose a database and table from the sidebar to view its API documentation and code examples.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
