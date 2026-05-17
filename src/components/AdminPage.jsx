import React, { useState, useEffect } from 'react';
import {
  X, Mail, Lock, LogOut, Users, Download, Copy, Trash2, Search,
  Shield, CheckCircle, AlertCircle, BarChart3, ShoppingBag, TrendingUp
} from 'lucide-react';
import { getSubscribers, removeSubscriber, saveSubscribers, escapeHtml, PRODUCTS } from '../data/products';

// Admin emails with full privileges
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

// Store admin session in localStorage
const ADMIN_SESSION_KEY = 'lorah_admin_session';

const getAdminSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
    if (session && session.email && session.loginTime) {
      // Session expires after 24 hours
      const hoursSinceLogin = (Date.now() - session.loginTime) / (1000 * 60 * 60);
      if (hoursSinceLogin < 24) return session;
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch {}
  return null;
};

const saveAdminSession = (email) => {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email, loginTime: Date.now() }));
};

const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

const AdminPage = ({ onClose, showToast }) => {
  const [session, setSession] = useState(getAdminSession);
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Subscriber management state
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState(new Set());

  useEffect(() => {
    if (session) {
      setSubscribers(getSubscribers());
    }
  }, [session]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail) {
        setLoginError('Please enter your email address.');
        setIsLoggingIn(false);
        return;
      }

      if (!ADMIN_EMAILS.includes(trimmedEmail)) {
        setLoginError('Access denied. This email is not registered as an admin.');
        setIsLoggingIn(false);
        return;
      }

      saveAdminSession(trimmedEmail);
      setSession({ email: trimmedEmail, loginTime: Date.now() });
      setIsLoggingIn(false);
      showToast('success', 'Welcome Back', `Logged in as ${trimmedEmail}`);
    }, 800);
  };

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
    setEmail('');
    showToast('success', 'Logged Out', 'You have been logged out successfully.');
  };

  // Subscriber management
  const filteredSubscribers = subscribers.filter(sub => {
    if (!subscriberSearch) return true;
    const q = subscriberSearch.toLowerCase();
    return sub.name?.toLowerCase().includes(q) || sub.email?.toLowerCase().includes(q);
  });

  const toggleSelectSubscriber = (id) => {
    setSelectedSubscribers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedSubscribers.size === filteredSubscribers.length) {
      setSelectedSubscribers(new Set());
    } else {
      setSelectedSubscribers(new Set(filteredSubscribers.map(s => s.id)));
    }
  };

  const removeSelected = () => {
    const remaining = subscribers.filter(s => !selectedSubscribers.has(s.id));
    saveSubscribers(remaining);
    setSubscribers(remaining);
    setSelectedSubscribers(new Set());
    showToast('success', 'Removed', `${selectedSubscribers.size} subscriber(s) removed.`);
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to remove ALL subscribers? This cannot be undone.')) {
      saveSubscribers([]);
      setSubscribers([]);
      setSelectedSubscribers(new Set());
      showToast('success', 'Cleared', 'All subscribers have been removed.');
    }
  };

  const exportCSV = () => {
    if (subscribers.length === 0) {
      showToast('warning', 'No Data', 'No subscribers to export.');
      return;
    }
    const csv = [
      'Name,Email,Subscribed At',
      ...subscribers.map(s => `"${escapeHtml(s.name || '')}","${escapeHtml(s.email)}","${s.subscribedAt || ''}"`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorah-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Exported', 'Subscriber list downloaded as CSV.');
  };

  const exportJSON = () => {
    if (subscribers.length === 0) {
      showToast('warning', 'No Data', 'No subscribers to export.');
      return;
    }
    const blob = new Blob([JSON.stringify(subscribers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorah-subscribers-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Exported', 'Subscriber list downloaded as JSON.');
  };

  const copyEmails = () => {
    if (subscribers.length === 0) {
      showToast('warning', 'No Data', 'No emails to copy.');
      return;
    }
    navigator.clipboard.writeText(subscribers.map(s => s.email).join(', '));
    showToast('success', 'Copied', `${subscribers.length} email(s) copied to clipboard.`);
  };

  // Stats
  const categoryStats = {};
  PRODUCTS.forEach(p => {
    categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
  });
  const topCategories = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const totalProducts = PRODUCTS.length;
  const featuredCount = PRODUCTS.filter(p => p.featured).length;
  const inStockCount = PRODUCTS.filter(p => p.inStock).length;

  // Login Screen
  if (!session) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-matte-900/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-beige-50 flex items-center justify-center hover:bg-beige-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-brand-red" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-matte-900">Admin Access</h2>
            <p className="text-matte-500 text-sm mt-2">Sign in with your admin email to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-matte-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-matte-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setLoginError(''); }}
                  placeholder="admin@lorah.com"
                  className="input-premium w-full pl-10 pr-4 py-3 rounded-xl border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red transition-all text-sm"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2">
                  <AlertCircle className="w-3.5 h-3.5" /> {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="magnetic-btn w-full flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 text-sm"
            >
              {isLoggingIn ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-matte-400 mt-6">
            Authorized admin emails only. Contact the owner for access.
          </p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="fixed inset-0 z-50 bg-beige-50 overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-beige-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-red/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-matte-900 text-lg">LORAH Admin</h1>
              <p className="text-xs text-matte-500">{session.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-matte-600 hover:bg-beige-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white bg-matte-900 hover:bg-matte-800 transition-colors"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-beige-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-matte-500">Total Products</span>
            </div>
            <p className="font-serif text-2xl font-bold text-matte-900">{totalProducts}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-beige-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-matte-500">In Stock</span>
            </div>
            <p className="font-serif text-2xl font-bold text-matte-900">{inStockCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-beige-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-champagne-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-champagne-300" />
              </div>
              <span className="text-xs font-medium text-matte-500">Featured</span>
            </div>
            <p className="font-serif text-2xl font-bold text-matte-900">{featuredCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-beige-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-matte-500">Subscribers</span>
            </div>
            <p className="font-serif text-2xl font-bold text-matte-900">{subscribers.length}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-100">
            <h3 className="font-serif font-bold text-matte-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-champagne-300" /> Top Categories
            </h3>
            <div className="space-y-3">
              {topCategories.map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-matte-700">{cat}</span>
                    <span className="font-semibold text-matte-900">{count}</span>
                  </div>
                  <div className="h-2 bg-beige-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-red to-champagne-300 rounded-full transition-all duration-700"
                      style={{ width: `${(count / totalProducts) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribers Management */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-beige-100 overflow-hidden">
            <div className="p-6 border-b border-beige-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-matte-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-champagne-300" /> Newsletter Subscribers
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={exportCSV} className="text-xs px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                  <button onClick={exportJSON} className="text-xs px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> JSON
                  </button>
                  <button onClick={copyEmails} className="text-xs px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-400" />
                  <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red text-sm"
                  />
                </div>
                {selectedSubscribers.size > 0 && (
                  <button
                    onClick={removeSelected}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove ({selectedSubscribers.size})
                  </button>
                )}
                {subscribers.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredSubscribers.length === 0 ? (
                <div className="p-8 text-center text-matte-500 text-sm">
                  {subscribers.length === 0 ? 'No subscribers yet.' : 'No subscribers match your search.'}
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-beige-50 text-xs text-matte-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-3 text-left w-10">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.size === filteredSubscribers.length && filteredSubscribers.length > 0}
                          onChange={selectAll}
                          className="rounded border-beige-300"
                        />
                      </th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Subscribed</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige-100">
                    {filteredSubscribers.map(sub => (
                      <tr key={sub.id} className="hover:bg-beige-50 transition-colors">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.has(sub.id)}
                            onChange={() => toggleSelectSubscriber(sub.id)}
                            className="rounded border-beige-300"
                          />
                        </td>
                        <td className="p-3 text-sm font-medium text-matte-900">{escapeHtml(sub.name || 'Subscriber')}</td>
                        <td className="p-3 text-sm text-matte-600">{escapeHtml(sub.email)}</td>
                        <td className="p-3 text-xs text-matte-500">
                          {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : '—'}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              removeSubscriber(sub.id);
                              setSubscribers(getSubscribers());
                              showToast('success', 'Removed', `${sub.email} removed.`);
                            }}
                            className="text-red-400 hover:text-red-600 transition-colors"
                            aria-label={`Remove ${sub.email}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
