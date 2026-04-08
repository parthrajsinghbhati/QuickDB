import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronRight, Database, Table as TableIcon, Code, Server } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import useDatabases from '../hooks/useDatabases';
import { useDatabaseContext } from '../context/DatabaseContext';

const ApiDocs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
        return `// Get all records\nconst response = await fetch('${url}', {\n  method: 'GET',\n  headers: {\n    'x-api-key': '${apiKey}',\n    'Content-Type': 'application/json'\n  }\n});\n\nconst data = await response.json();\nconsole.log(data);`;
      case 'POST':
        return `// Create a new record\nconst response = await fetch('${url}', {\n  method: 'POST',\n  headers: {\n    'x-api-key': '${apiKey}',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    // Your data here\n    name: "Example Name",\n    value: 123\n  })\n});\n\nconst newRecord = await response.json();\nconsole.log(newRecord);`;
      case 'GET_ID':
        return `// Get record by ID\nconst response = await fetch('${url}/:id', {\n  method: 'GET',\n  headers: {\n    'x-api-key': '${apiKey}',\n    'Content-Type': 'application/json'\n  }\n});\n\nconst record = await response.json();\nconsole.log(record);`;
      case 'PUT':
        return `// Update a record\nconst response = await fetch('${url}/:id', {\n  method: 'PUT',\n  headers: {\n    'x-api-key': '${apiKey}',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    // Updated data\n    name: "Updated Name"\n  })\n});\n\nconst updatedRecord = await response.json();\nconsole.log(updatedRecord);`;
      case 'DELETE':
        return `// Delete a record\nconst response = await fetch('${url}/:id', {\n  method: 'DELETE',\n  headers: {\n    'x-api-key': '${apiKey}',\n    'Content-Type': 'application/json'\n  }\n});\n\nconst result = await response.json();\nconsole.log(result);`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Documentation Sidebar */}
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="glass-card rounded-[2rem] border border-outline-variant/20 p-5 sticky top-28 shadow-xl">
                <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
                  <div className="p-2 bg-primary-container/20 rounded-xl border border-primary/20">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  Databases
                </h3>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-on-surface-variant text-sm px-2">Loading clusters...</div>
                  ) : databases.length === 0 ? (
                    <div className="text-on-surface-variant text-sm px-2">No databases found</div>
                  ) : (
                    databases.map((db) => (
                      <div key={db.id} className="space-y-1">
                        <button
                          onClick={() => setSelectedDatabase(db === selectedDatabase ? null : db)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                            selectedDatabase?.id === db.id
                              ? 'bg-primary/10 text-primary border-primary/30 shadow-inner'
                              : 'bg-surface-container-low border-transparent hover:bg-surface-container-high hover:border-outline-variant/10 text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          <span className="truncate">{db.name}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${selectedDatabase?.id === db.id ? 'rotate-90 text-primary' : 'text-on-surface-variant'}`} />
                        </button>
                        
                        {selectedDatabase?.id === db.id && (
                          <div className="pl-4 space-y-2 mt-3 mb-2 animate-in slide-in-from-top-2 duration-300">
                            {tables.length === 0 ? (
                              <div className="text-on-surface-variant/60 text-xs px-3 py-1 font-medium">No schemas defined</div>
                            ) : (
                              tables.map((table) => (
                                <button
                                  key={table.id}
                                  onClick={() => setSelectedTable(table)}
                                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    selectedTable?.id === table.id
                                      ? 'bg-tertiary text-white shadow-md'
                                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                  }`}
                                >
                                  <TableIcon className={`w-4 h-4 ${selectedTable?.id === table.id ? 'text-white' : 'text-on-surface-variant/50'}`} />
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
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">API Reference</h1>
                <p className="text-on-surface-variant text-lg">Auto-generated REST endpoints for your mapped tables.</p>
              </div>

              {/* Base URL Card */}
              <div className="glass-card rounded-[2rem] border border-outline-variant/20 p-8 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <div className="p-3 bg-primary-container/20 rounded-xl border border-primary/20">
                    <Server className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-bold text-on-surface">Base URL</h2>
                     <p className="text-on-surface-variant text-sm mt-1">All endpoints route through this origin</p>
                  </div>
                </div>
                
                <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-5 flex items-center justify-between group relative z-10 shadow-inner">
                  <code className="text-primary font-mono text-sm tracking-wide">{baseUrl}</code>
                  <button
                    onClick={() => handleCopy(baseUrl, 'base-url')}
                    className="p-2.5 bg-surface-container-high hover:bg-primary/20 rounded-lg transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/10 cursor-pointer"
                  >
                    {copied === 'base-url' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {selectedTable ? (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 pb-6 border-b border-outline-variant/10">
                    <div className="p-3 bg-tertiary/10 rounded-xl border border-tertiary/20">
                       <Code className="w-6 h-6 text-tertiary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-on-surface">{selectedTable.name} <span className="text-on-surface-variant/50 font-medium">Endpoints</span></h2>
                  </div>

                  <div className="space-y-8">
                    {[
                      { method: 'GET', id: 'get-all', title: 'Retrieve All Records', color: 'emerald', path: `/${selectedTable.id}/records` },
                      { method: 'POST', id: 'post', title: 'Create A Record', color: 'primary', path: `/${selectedTable.id}/records` },
                      { method: 'GET', id: 'get-id', title: 'Retrieve Single Record', color: 'emerald', path: `/${selectedTable.id}/records/:id` },
                      { method: 'PUT', id: 'put', title: 'Update Record', color: 'secondary', path: `/${selectedTable.id}/records/:id` },
                      { method: 'DELETE', id: 'delete', title: 'Delete Record', color: 'error', path: `/${selectedTable.id}/records/:id` }
                    ].map((endpoint) => (
                      <div key={endpoint.id} className="space-y-4">
                        <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-xl border border-outline-variant/5 w-fit">
                          <span className={`px-4 py-1 rounded bg-${endpoint.color}/10 text-${endpoint.color} text-xs font-extrabold tracking-widest border border-${endpoint.color}/20 uppercase`}>{endpoint.method}</span>
                          <code className="text-on-surface font-mono font-bold tracking-wide">{endpoint.path}</code>
                          <div className="w-px h-4 bg-outline-variant/20 mx-2"></div>
                          <span className="text-on-surface-variant text-sm font-medium">{endpoint.title}</span>
                        </div>
                        <div className="border border-outline-variant/20 rounded-2xl overflow-hidden shadow-lg bg-surface-container/50">
                          <div className="flex items-center justify-between px-5 py-3 bg-surface-container border-b border-outline-variant/10">
                            <div className="flex gap-2 items-center">
                               <div className="w-3 h-3 rounded-full bg-error/50"></div>
                               <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
                               <div className="w-3 h-3 rounded-full bg-emerald-400/50"></div>
                               <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/50 ml-3">JavaScript Example</span>
                            </div>
                            <button
                              onClick={() => handleCopy(getCodeExample(endpoint.id === 'get-id' ? 'GET_ID' : endpoint.method, selectedTable.id), endpoint.id)}
                              className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/10 cursor-pointer hover:border-primary/30 hover:bg-primary/5"
                            >
                              {copied === endpoint.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              {copied === endpoint.id ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <pre className="p-6 overflow-x-auto text-[13px] leading-relaxed text-secondary/90 font-mono">
                            {getCodeExample(endpoint.id === 'get-id' ? 'GET_ID' : endpoint.method, selectedTable.id)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-surface-container-low/50 rounded-[2rem] border-2 border-outline-variant/10 border-dashed">
                  <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6 shadow-inner border border-outline-variant/10">
                    <TableIcon className="w-10 h-10 text-on-surface-variant/50 flex-shrink-0" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">Select a Schema</h3>
                  <p className="text-on-surface-variant text-center max-w-md text-lg">
                    Choose a database and table from the sidebar to view localized API specs.
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
