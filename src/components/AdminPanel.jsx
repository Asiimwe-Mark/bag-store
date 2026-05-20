import React, { useState, useEffect } from 'react';
import { X, Download, FileText, Trash2, Search, Copy, Check } from 'lucide-react';
import { fetchSubscribers, removeSubscriber, clearSubscribers, escapeHtml } from '../data/products';

const AdminPanel = ({ isOpen, onClose, showToast }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSubscribers().then(setSubscribers);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filteredSubs = subscribers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSubs = [...filteredSubs].sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));

  const today = new Date().toDateString();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const todayCount = subscribers.filter(s => new Date(s.subscribedAt).toDateString() === today).length;
  const weekCount = subscribers.filter(s => new Date(s.subscribedAt) >= weekAgo).length;

  const handleRemove = async (id) => {
    await removeSubscriber(id);
    const updated = await fetchSubscribers();
    setSubscribers(updated);
    showToast('success', 'Removed', 'Subscriber removed successfully.');
  };

  const handleExportCSV = () => {
    if (!subscribers.length) return showToast('warning', 'No Data', 'No subscribers to export.');
    const csv = ['Name,Email,Date'].concat(subscribers.map(s => `"${s.name}","${s.email}","${new Date(s.subscribedAt).toLocaleString()}"`)).join('\n');
    downloadFile(csv, 'lorah_subscribers.csv', 'text/csv');
    showToast('success', 'Exported', 'CSV downloaded.');
  };

  const handleExportJSON = () => {
    if (!subscribers.length) return showToast('warning', 'No Data', 'No subscribers to export.');
    downloadFile(JSON.stringify(subscribers, null, 2), 'lorah_subscribers.json', 'application/json');
    showToast('success', 'Exported', 'JSON downloaded.');
  };

  const handleCopyAll = () => {
    if (!subscribers.length) return showToast('warning', 'No Data', 'No emails to copy.');
    navigator.clipboard.writeText(subscribers.map(s => s.email).join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('success', 'Copied', `${subscribers.length} emails copied to clipboard.`);
  };

  const handleClearAll = async () => {
    await clearSubscribers();
    setSubscribers([]);
    setShowClearConfirm(false);
    showToast('success', 'Cleared', 'All subscribers removed.');
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      <div className={`admin-panel fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl overflow-hidden ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-r from-matte-900 to-matte-800 p-5 sm:p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold">Newsletter Admin</h3>
                <p className="text-white/60 text-sm">Manage subscribers</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/10 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold">{subscribers.length}</p>
                <p className="text-xs text-white/60">Total</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold">{todayCount}</p>
                <p className="text-xs text-white/60">Today</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold">{weekCount}</p>
                <p className="text-xs text-white/60">This Week</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 sm:p-4 border-b border-gray-100">
            <button onClick={handleExportCSV} className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-green-600 transition-colors">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" /> CSV
            </button>
            <button onClick={handleExportJSON} className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-brand-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-rose-500 transition-colors">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> JSON
            </button>
            <button onClick={() => setShowClearConfirm(true)} className="flex items-center justify-center gap-1 sm:gap-2 bg-red-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-600 transition-colors">
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="p-3 sm:p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subscribers..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-champagne-300 focus:ring-2 focus:ring-champagne-300/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {sortedSubs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No subscribers found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedSubs.map(s => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-red/20 to-rose-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-serif font-bold text-matte-800 text-sm">{s.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-matte-900 truncate">{escapeHtml(s.name)}</p>
                      <p className="text-xs text-gray-500 truncate">{escapeHtml(s.email)}</p>
                      <p className="text-[10px] text-gray-400">{new Date(s.subscribedAt).toLocaleDateString()}</p>
                    </div>
                    <button 
                      onClick={() => handleRemove(s.id)}
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 sm:w-8 sm:h-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Stored in localStorage</p>
              <button 
                onClick={handleCopyAll}
                className="text-xs text-brand-red hover:text-rose-500 font-medium transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} 
                {copied ? 'Copied!' : 'Copy All Emails'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="modal-overlay open fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowClearConfirm(false)}></div>
          <div className="modal-content relative bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Trash2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold mb-2">Clear All Subscribers?</h4>
              <p className="text-gray-500 text-sm mb-4 sm:mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowClearConfirm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleClearAll} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;