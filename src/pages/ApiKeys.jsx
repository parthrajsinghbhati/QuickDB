import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Check, AlertCircle, Loader } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const ApiKeys = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [copied, setCopied] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchApiKeys = async () => {
    try {
      const response = await api.get('/keys');
      setApiKeys(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const response = await api.post('/keys', { name: newKeyName });
      setApiKeys([response.data, ...apiKeys]);
      setNewKeyName('');
      setError(null);
    } catch (err) {
      setError('Failed to create API key');
    } finally {
      setCreating(false);
    }
  };

  const handleRevokeKey = async (id) => {
    if (!window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) return;
    try {
      await api.delete(`/keys/${id}`);
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch (err) {
      setError('Failed to revoke API key');
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
            <p className="text-slate-400">Manage API keys for accessing your data programmatically</p>
          </div>

          {/* Create Key Section */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-500" />
              Create New API Key
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key Name (e.g., Mobile App, Website)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
              />
              <button
                onClick={handleCreateKey}
                disabled={creating || !newKeyName.trim()}
                className="bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {creating ? <Loader className="animate-spin" size={18} /> : <Plus size={18} />}
                Generate Key
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Keys List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-violet-500" />
              Active API Keys
            </h2>
            
            {loading ? (
              <div className="text-center py-8 text-slate-500">Loading keys...</div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed text-slate-500">
                No API keys found. Create one to get started.
              </div>
            ) : (
              apiKeys.map((key) => (
                <div key={key.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{key.name}</h3>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        Created: {new Date(key.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="bg-slate-950 px-3 py-1.5 rounded text-violet-400 font-mono text-sm border border-slate-800">
                        {key.key}
                      </code>
                      <button
                        onClick={() => handleCopy(key.key, key.id)}
                        className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                        title="Copy Key"
                      >
                        {copied === key.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    {key.lastUsedAt && (
                      <p className="text-xs text-slate-500 mt-2">
                        Last used: {new Date(key.lastUsedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors ml-4"
                    title="Revoke Key"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
