import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Check, AlertCircle, Loader } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const ApiKeys = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-background font-body text-on-background transition-colors">
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-4xl mx-auto px-8 py-10">
          
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">API Keys</h1>
            <p className="text-on-surface-variant text-lg">Secure cryptographic access points for your environment.</p>
          </div>

          {/* Create Key Section */}
          <div className="glass-card rounded-[2rem] border border-outline-variant/20 p-8 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-primary-container/20 rounded-xl border border-primary/20">
                 <Plus className="w-5 h-5 text-primary" strokeWidth={3} />
              </div>
              Provision Access Token
            </h2>
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Ex: Production Vercel App"
                className="flex-1 bg-surface-container border border-outline-variant/20 rounded-xl px-5 py-4 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium shadow-inner"
              />
              <button
                onClick={handleCreateKey}
                disabled={creating || !newKeyName.trim()}
                className="cta-gradient neon-bloom disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
              >
                {creating ? <Loader className="animate-spin" size={20} /> : <Plus size={20} strokeWidth={3} />}
                Generate Token
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-error-container/20 border border-error/30 rounded-2xl text-error font-medium flex items-center gap-3">
              <AlertCircle size={22} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Keys List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-secondary-container/20 rounded-xl border border-secondary/20">
                <Key className="w-5 h-5 text-secondary" />
              </div>
              Active Authentication Tokens
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
                </div>
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-outline-variant/10 rounded-3xl bg-surface-container-low/50">
                <p className="text-on-surface-variant font-medium text-lg mb-2">No active tokens.</p>
                <p className="text-on-surface-variant/60">Generate an API key to securely connect applications.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="glass-card bg-surface-container-low/50 p-6 rounded-[1.5rem] border border-outline-variant/10 flex items-center justify-between group hover:border-primary/30 transition-all hover:shadow-[0_8px_30px_rgb(186,158,255,0.05)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-on-surface text-lg">{key.name}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-2 py-1 rounded border border-outline-variant/5">
                          Created {new Date(key.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <code className="bg-surface-container px-4 py-2 rounded-lg text-primary font-mono text-sm border border-outline-variant/10 shadow-inner flex-1 min-w-0 break-all select-all">
                          {key.key}
                        </code>
                        <button
                          onClick={() => handleCopy(key.key, key.id)}
                          className="p-2.5 bg-surface-container-high hover:bg-primary/20 rounded-lg transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/10 cursor-pointer"
                          title="Copy Key"
                        >
                          {copied === key.id ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                        </button>
                      </div>
                      {key.lastUsedAt && (
                        <p className="text-xs font-mono font-medium text-on-surface-variant/70 mt-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
                          Last executed: {new Date(key.lastUsedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      className="p-3 bg-surface-container hover:bg-error-container/20 text-on-surface-variant hover:text-error rounded-xl transition-colors ml-6 border border-outline-variant/5 hover:border-error/20 cursor-pointer"
                      title="Revoke Configuration"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
