import React, { useState, useEffect, useRef } from 'react';
import {
  X, Mail, Lock, LogOut, Users, Download, Copy, Trash2, Search,
  Shield, CheckCircle, AlertCircle, BarChart3, ShoppingBag, TrendingUp,
  Edit3, Save, ImagePlus, RotateCcw, Plus, Loader2, ChevronDown, Eye, Video, Film, Play
} from 'lucide-react';
import {
  fetchSubscribers, removeSubscriber, clearSubscribers, escapeHtml,
  formatPrice, categories as CATEGORIES_LIST,
  updateProduct, deleteProduct, uploadProductImage, deleteProductImage, addProduct,
  seedProducts,
  fetchVideos, addVideo, updateVideo, deleteVideo, uploadVideoFile, deleteVideoFile
} from '../data/products';
import { isConfigured } from '../lib/supabase';

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
const ADMIN_SESSION_KEY = 'lorah_admin_session';

const getAdminSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
    if (session && session.email && session.loginTime) {
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

const EMPTY_PRODUCT = {
  id: '', name: '', brand: '', category: 'Tote Bag', price: 0,
  images: [], colors: [], description: '', inStock: true, featured: false,
};

// ─────────────────────────────────────────────
//  Inline Editable Cell
// ─────────────────────────────────────────────
const EditableField = ({ value, type = 'text', options, onSave, className = '' }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (type === 'text') inputRef.current.select();
    }
  }, [editing, type]);

  const handleSave = () => {
    setEditing(false);
    if (draft !== value) onSave(draft);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
  };

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(value); setEditing(true); }}
        className={`group flex items-center gap-1 text-left hover:text-brand-red transition-colors max-w-full ${className}`}
        title={String(value)}
      >
        <span className="truncate min-w-0">{type === 'price' ? formatPrice(value) : value}</span>
        <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-matte-400 flex-shrink-0" />
      </button>
    );
  }

  if (type === 'select' && options) {
    return (
      <select
        ref={inputRef}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); onSave(e.target.value); setEditing(false); }}
        onBlur={handleSave}
        className="w-full px-2 py-1.5 rounded-lg border border-brand-red bg-white text-sm focus:outline-none"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <input
        ref={inputRef}
        type={type === 'price' ? 'number' : type}
        value={draft}
        onChange={(e) => setDraft(type === 'price' ? Number(e.target.value) : e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1.5 rounded-lg border border-brand-red bg-white text-sm focus:outline-none"
      />
      <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded flex-shrink-0">
        <Save className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
//  Image Manager (click-based, works on touch)
// ─────────────────────────────────────────────
const ImageManager = ({ product, onUpload, onRemove, onSetPrimary }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-beige-100 text-matte-500 hover:text-matte-700 transition-colors flex items-center gap-1" title="Manage images">
        <ImagePlus className="w-4 h-4" />
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-xl shadow-xl border border-beige-200 p-3 z-30">
          <p className="text-xs font-medium text-matte-500 mb-2">Images ({product.images.length})</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.images.map((img, i) => (
              <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-beige-200 group/img">
                <img src={img} alt="" className="w-full h-full object-cover" />
                {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-brand-red text-white text-[8px] text-center leading-tight">Primary</span>}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-0.5 transition-opacity">
                  {i !== 0 && (
                    <button onClick={() => onSetPrimary(product.id, i)} className="p-0.5 bg-white/90 rounded" title="Set as primary">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </button>
                  )}
                  {product.images.length > 1 && (
                    <button onClick={() => onRemove(product.id, i)} className="p-0.5 bg-white/90 rounded" title="Remove">
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <label className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-beige-50 hover:bg-beige-100 text-sm text-matte-700 cursor-pointer transition-colors">
            <ImagePlus className="w-4 h-4" /> Add Image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { onUpload(product.id, e); setOpen(false); }} />
          </label>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  Product Card (mobile view)
// ─────────────────────────────────────────────
const ProductCardMobile = ({ product, onFieldUpdate, onImageUpload, onRemoveImage, onSetPrimaryImage, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-beige-100 rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-beige-100 border border-beige-200 flex-shrink-0 relative group">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="%23f5f0eb" width="64" height="64"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="10">No Img</text></svg>'; }} />
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
            <ImagePlus className="w-4 h-4 text-white" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(product.id, e)} />
          </label>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-matte-400">{product.id}</p>
          <EditableField value={product.name} onSave={(val) => onFieldUpdate(product.id, 'name', val)} className="text-sm font-medium text-matte-900" />
          <div className="flex items-center gap-2 mt-1">
            <EditableField value={product.category} type="select" options={CATEGORIES_LIST} onSave={(val) => onFieldUpdate(product.id, 'category', val)} className="text-xs text-matte-500" />
            <span className="text-matte-300">|</span>
            <EditableField value={product.price} type="price" onSave={(val) => onFieldUpdate(product.id, 'price', val)} className="text-xs font-semibold text-brand-red" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-beige-50 text-matte-400 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="pt-2 border-t border-beige-50">
          <p className="text-xs font-medium text-matte-500 mb-2">Images ({product.images.length})</p>
          <div className="flex flex-wrap gap-2">
            {product.images.map((img, i) => (
              <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-beige-200 group/img">
                <img src={img} alt="" className="w-full h-full object-cover" />
                {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-brand-red text-white text-[8px] text-center leading-tight">Primary</span>}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-0.5 transition-opacity">
                  {i !== 0 && <button onClick={() => onSetPrimaryImage(product.id, i)} className="p-0.5 bg-white/90 rounded"><CheckCircle className="w-3 h-3 text-green-600" /></button>}
                  {product.images.length > 1 && <button onClick={() => onRemoveImage(product.id, i)} className="p-0.5 bg-white/90 rounded"><Trash2 className="w-3 h-3 text-red-500" /></button>}
                </div>
              </div>
            ))}
            <label className="w-14 h-14 rounded-lg border-2 border-dashed border-beige-200 flex items-center justify-center cursor-pointer hover:border-brand-red transition-colors">
              <Plus className="w-4 h-4 text-matte-400" />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(product.id, e)} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  Add Product Form
// ─────────────────────────────────────────────
const AddProductForm = ({ onSave, onCancel, showToast }) => {
  const [form, setForm] = useState({ ...EMPTY_PRODUCT });
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const oversized = files.find(f => f.size > 5 * 1024 * 1024);
    if (oversized) {
      showToast('warning', 'Too Large', `${oversized.name} exceeds 5MB limit.`);
      return;
    }
    setImageFiles(prev => [...prev, ...files]);
    e.target.value = '';
  };

  const removeImageFile = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim() || !form.category.trim()) {
      showToast('warning', 'Missing Fields', 'ID, Name, and Category are required.');
      return;
    }
    setSaving(true);
    try {
      const uploadedUrls = [];
      for (const file of imageFiles) {
        const url = await uploadProductImage(form.id, file);
        uploadedUrls.push(url);
      }
      const productData = {
        ...form,
        id: form.id.trim().toUpperCase(),
        price: Number(form.price) || 0,
        images: uploadedUrls,
        colors: form.colors.length > 0 ? form.colors : ['Default'],
      };
      await addProduct(productData);
      showToast('success', 'Product Added', `${productData.name} has been added.`);
      onSave();
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed', err.message || 'Could not add product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-matte-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-beige-100 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-serif font-bold text-base sm:text-lg text-matte-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-brand-red" /> Add New Product
          </h3>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-beige-50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-matte-600 mb-1">Product ID *</label>
              <input type="text" value={form.id} onChange={(e) => update('id', e.target.value)} placeholder="e.g. CB-023" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-matte-600 mb-1">Brand</label>
              <input type="text" value={form.brand} onChange={(e) => update('brand', e.target.value)} placeholder="e.g. Chrisbella" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Name *</label>
            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Product name" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-matte-600 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" required>
                {CATEGORIES_LIST.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-matte-600 mb-1">Price (UGX)</label>
              <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} placeholder="Product description..." className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red resize-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Colors (comma-separated)</label>
            <input type="text" value={form.colors.join(', ')} onChange={(e) => update('colors', e.target.value.split(',').map(c => c.trim()).filter(Boolean))} placeholder="Black, Navy, Brown" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-beige-50 text-sm focus:outline-none focus:border-brand-red" />
          </div>

          <div>
            <label className="block text-xs font-medium text-matte-600 mb-2">Images</label>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
              {imageFiles.map((file, i) => (
                <div key={i} className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-beige-200 group">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImageFile(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-beige-50 hover:bg-beige-100 border border-beige-200 text-sm text-matte-700 cursor-pointer transition-colors">
              <ImagePlus className="w-4 h-4" /> Choose Images
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleAddImages} />
            </label>
            <p className="text-xs text-matte-400 mt-1">Max 5MB per image.</p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.inStock} onChange={(e) => update('inStock', e.target.checked)} className="rounded border-beige-300" />
              <span className="text-matte-700">In Stock</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="rounded border-beige-300" />
              <span className="text-matte-700">Featured</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-beige-100">
            <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-medium text-matte-600 hover:bg-beige-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-60">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Add Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  Add Video Form
// ─────────────────────────────────────────────
const AddVideoForm = ({ onSave, onCancel, saving }) => {
  const [videoType, setVideoType] = useState('upload');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [file, setFile] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 50 * 1024 * 1024) {
      alert('File must be under 50MB.');
      return;
    }
    setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { alert('Please enter a title.'); return; }
    if (videoType === 'upload' && !file) { alert('Please select a video file.'); return; }
    if (videoType === 'embed' && !videoUrl.trim()) { alert('Please paste a video URL.'); return; }
    onSave({ title: title.trim(), videoType, videoUrl: videoUrl.trim(), file, sortOrder });
  };

  return (
    <div className="p-4 sm:p-6 border-b border-beige-100 bg-beige-50/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <button type="button" onClick={() => setVideoType('upload')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${videoType === 'upload' ? 'bg-brand-red text-white' : 'bg-white border border-beige-200 text-matte-600 hover:border-brand-red'}`}>
            Upload File
          </button>
          <button type="button" onClick={() => setVideoType('embed')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${videoType === 'embed' ? 'bg-brand-red text-white' : 'bg-white border border-beige-200 text-matte-600 hover:border-brand-red'}`}>
            Paste Link
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-matte-600 mb-1">Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Video title" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" required />
        </div>

        {videoType === 'upload' ? (
          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Video File *</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragActive ? 'border-brand-red bg-brand-red/5' : 'border-beige-200 bg-white hover:border-brand-red/50'}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); }}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <Film className="w-8 h-8 text-brand-red" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-matte-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-matte-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="p-1 rounded-lg hover:bg-red-50 text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Film className="w-8 h-8 text-matte-400 mx-auto mb-2" />
                  <p className="text-sm text-matte-600">Drag & drop or <button type="button" onClick={() => fileInputRef.current?.click()} className="text-brand-red font-medium hover:underline">browse</button></p>
                  <p className="text-xs text-matte-400 mt-1">MP4, WebM — Max 50MB</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Video URL *</label>
            <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..." className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" />
            <p className="text-xs text-matte-400 mt-1">YouTube or Vimeo URLs supported</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-matte-600 mb-1">Sort Order</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-beige-100">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-medium text-matte-600 hover:bg-beige-50 transition-colors">Cancel</button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Add Video</>}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────
const AdminPage = ({ onClose, showToast, products, onProductUpdate }) => {
  const [session, setSession] = useState(getAdminSession);
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState('products');
  const [productSearch, setProductSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const [subscribers, setSubscribers] = useState([]);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState(new Set());

  const [videos, setVideos] = useState([]);
  const [videoSearch, setVideoSearch] = useState('');
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    if (session) fetchSubscribers().then(setSubscribers);
  }, [session]);

  useEffect(() => {
    if (session) fetchVideos().then(setVideos);
  }, [session]);

  // ─── Product Management ───

  const filteredProducts = (products || []).filter(p => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });

  const handleProductFieldUpdate = async (productId, field, value) => {
    try {
      await updateProduct(productId, { [field]: value });
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Updated', `${field} updated.`);
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not update product.');
    }
  };

  const handleImageUpload = async (productId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('warning', 'Too Large', 'Image must be under 5MB.');
      return;
    }
    showToast('info', 'Uploading', 'Uploading image...');
    try {
      const url = await uploadProductImage(productId, file);
      const product = products.find(p => p.id === productId);
      const newImages = [...(product?.images || []), url];
      await updateProduct(productId, { images: newImages });
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Image Added', 'New image uploaded.');
    } catch (err) {
      showToast('error', 'Upload Failed', err.message || 'Could not upload image.');
    }
    e.target.value = '';
  };

  const handleRemoveImage = async (productId, imageIndex) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const newImages = product.images.filter((_, i) => i !== imageIndex);
    if (newImages.length === 0) {
      showToast('warning', 'Cannot Remove', 'Product must have at least one image.');
      return;
    }
    try {
      const removedUrl = product.images[imageIndex];
      if (removedUrl?.includes('supabase')) await deleteProductImage(removedUrl);
      await updateProduct(productId, { images: newImages });
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Image Removed', 'Image removed.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not remove image.');
    }
  };

  const handleSetPrimaryImage = async (productId, imageIndex) => {
    const product = products.find(p => p.id === productId);
    if (!product || imageIndex === 0) return;
    const newImages = [...product.images];
    const [moved] = newImages.splice(imageIndex, 1);
    newImages.unshift(moved);
    try {
      await updateProduct(productId, { images: newImages });
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Primary Set', 'Image set as primary.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not update images.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm(`Delete product ${productId}? This cannot be undone.`)) return;
    try {
      await deleteProduct(productId);
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Deleted', 'Product deleted.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not delete product.');
    }
  };

  const handleSeedProducts = async () => {
    if (!window.confirm('This will insert all static products into Supabase. Existing products with the same ID will be skipped. Continue?')) return;
    setSeeding(true);
    try {
      const count = await seedProducts();
      if (onProductUpdate) await onProductUpdate();
      showToast('success', 'Seeded', `${count} products synced to Supabase.`);
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not seed products.');
    } finally {
      setSeeding(false);
    }
  };

  // ─── Subscriber Management ───

  const filteredSubscribers = subscribers.filter(sub => {
    if (!subscriberSearch) return true;
    const q = subscriberSearch.toLowerCase();
    return sub.name?.toLowerCase().includes(q) || sub.email?.toLowerCase().includes(q);
  });

  const toggleSelectSubscriber = (id) => {
    setSelectedSubscribers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedSubscribers.size === filteredSubscribers.length) setSelectedSubscribers(new Set());
    else setSelectedSubscribers(new Set(filteredSubscribers.map(s => s.id)));
  };

  const removeSelected = async () => {
    const ids = [...selectedSubscribers];
    await Promise.all(ids.map(id => removeSubscriber(id)));
    const updated = await fetchSubscribers();
    setSubscribers(updated);
    setSelectedSubscribers(new Set());
    showToast('success', 'Removed', `${ids.length} subscriber(s) removed.`);
  };

  const clearAll = async () => {
    if (window.confirm('Are you sure you want to remove ALL subscribers? This cannot be undone.')) {
      await clearSubscribers();
      setSubscribers([]);
      setSelectedSubscribers(new Set());
      showToast('success', 'Cleared', 'All subscribers have been removed.');
    }
  };

  const exportCSV = () => {
    if (subscribers.length === 0) { showToast('warning', 'No Data', 'No subscribers to export.'); return; }
    const csv = ['Name,Email,Subscribed At', ...subscribers.map(s => `"${escapeHtml(s.name || '')}","${escapeHtml(s.email)}","${s.subscribedAt || ''}"`)].join('\n');
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
    if (subscribers.length === 0) { showToast('warning', 'No Data', 'No subscribers to export.'); return; }
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
    if (subscribers.length === 0) { showToast('warning', 'No Data', 'No emails to copy.'); return; }
    navigator.clipboard.writeText(subscribers.map(s => s.email).join(', '));
    showToast('success', 'Copied', `${subscribers.length} email(s) copied to clipboard.`);
  };

  // ─── Video Management ───

  const filteredVideos = videos.filter(v => {
    if (!videoSearch) return true;
    return v.title?.toLowerCase().includes(videoSearch.toLowerCase());
  });

  const handleAddVideo = async (formData) => {
    setVideoLoading(true);
    try {
      let videoUrl = formData.videoUrl;
      let thumbnailUrl = formData.thumbnailUrl || null;

      if (formData.videoType === 'upload' && formData.file) {
        const result = await uploadVideoFile(formData.file);
        videoUrl = result.url;
      }

      if (formData.videoType === 'embed') {
        const { getVideoThumbnail } = await import('../data/products');
        thumbnailUrl = getVideoThumbnail(formData.videoUrl) || null;
      }

      await addVideo({
        title: formData.title,
        videoUrl,
        videoType: formData.videoType,
        thumbnailUrl,
        sortOrder: formData.sortOrder || 0,
      });

      const updated = await fetchVideos();
      setVideos(updated);
      setShowAddVideoForm(false);
      showToast('success', 'Video Added', `"${formData.title}" has been added.`);
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not add video.');
    } finally {
      setVideoLoading(false);
    }
  };

  const handleDeleteVideo = async (video) => {
    if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    try {
      if (video.videoType === 'upload' && video.videoUrl?.includes('supabase')) {
        const marker = '/videos/';
        const idx = video.videoUrl.indexOf(marker);
        if (idx !== -1) {
          const path = video.videoUrl.substring(idx + marker.length);
          await deleteVideoFile(path);
        }
      }
      await deleteVideo(video.id);
      const updated = await fetchVideos();
      setVideos(updated);
      showToast('success', 'Deleted', 'Video deleted.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not delete video.');
    }
  };

  const handleUpdateVideoTitle = async (videoId, newTitle) => {
    try {
      await updateVideo(videoId, { title: newTitle });
      const updated = await fetchVideos();
      setVideos(updated);
      showToast('success', 'Updated', 'Video title updated.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not update video.');
    }
  };

  // Stats
  const categoryStats = {};
  (products || []).forEach(p => { categoryStats[p.category] = (categoryStats[p.category] || 0) + 1; });
  const topCategories = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const totalProducts = (products || []).length;
  const featuredCount = (products || []).filter(p => p.featured).length;
  const inStockCount = (products || []).filter(p => p.inStock).length;

  // ─── Login Screen ───
  if (!session) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-matte-900/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 sm:p-10 shadow-2xl">
          <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-beige-50 flex items-center justify-center hover:bg-beige-100 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-brand-red" />
            </div>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-matte-900">Admin Access</h2>
            <p className="text-matte-500 text-xs sm:text-sm mt-2">Sign in with your admin email to continue.</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoginError('');
            setIsLoggingIn(true);
            const trimmedEmail = email.trim().toLowerCase();
            if (!trimmedEmail) { setLoginError('Please enter your email address.'); setIsLoggingIn(false); return; }
            if (!ADMIN_EMAILS.includes(trimmedEmail)) { setLoginError('Access denied. This email is not registered as an admin.'); setIsLoggingIn(false); return; }
            saveAdminSession(trimmedEmail);
            setSession({ email: trimmedEmail, loginTime: Date.now() });
            setIsLoggingIn(false);
            showToast('success', 'Welcome Back', `Logged in as ${trimmedEmail}`);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-matte-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-matte-400" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setLoginError(''); }} placeholder="admin@lorah.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red transition-all text-sm" autoFocus />
              </div>
              {loginError && <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2"><AlertCircle className="w-3.5 h-3.5" /> {loginError}</p>}
            </div>
            <button type="submit" disabled={isLoggingIn} className="w-full flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 text-sm">
              {isLoggingIn ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <><Lock className="w-4 h-4" /> Sign In</>}
            </button>
          </form>
          <p className="text-center text-xs text-matte-400 mt-6">Authorized admin emails only.</p>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div className="fixed inset-0 z-50 bg-beige-50 overflow-y-auto">
      {showAddForm && (
        <AddProductForm
          onSave={() => { setShowAddForm(false); onProductUpdate?.(); }}
          onCancel={() => setShowAddForm(false)}
          showToast={showToast}
        />
      )}

      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-beige-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-red/10 flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-matte-900 text-base sm:text-lg">LORAH Admin</h1>
              <p className="text-[10px] sm:text-xs text-matte-500 hidden sm:block">{session.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={() => { clearAdminSession(); setSession(null); setEmail(''); showToast('success', 'Logged Out', 'You have been logged out.'); }} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm text-matte-600 hover:bg-beige-100 transition-colors">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
            <button onClick={onClose} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm text-white bg-matte-900 hover:bg-matte-800 transition-colors">
              <X className="w-4 h-4" /> <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Supabase Status Banner */}
        {!isConfigured() && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">Supabase not configured</p>
              <p className="text-xs text-amber-600 mt-1">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your .env file.</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon: <ShoppingBag className="w-5 h-5 text-blue-600" />, label: 'Total Products', value: totalProducts, bg: 'bg-blue-50' },
            { icon: <CheckCircle className="w-5 h-5 text-green-600" />, label: 'In Stock', value: inStockCount, bg: 'bg-green-50' },
            { icon: <TrendingUp className="w-5 h-5 text-champagne-300" />, label: 'Featured', value: featuredCount, bg: 'bg-champagne-100' },
            { icon: <Users className="w-5 h-5 text-purple-600" />, label: 'Subscribers', value: subscribers.length, bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-beige-100">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${stat.bg} flex items-center justify-center`}>{stat.icon}</div>
                <span className="text-[10px] sm:text-xs font-medium text-matte-500">{stat.label}</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-matte-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 sm:mb-6 bg-white rounded-xl p-1 shadow-sm border border-beige-100 w-fit overflow-x-auto">
          {[['products', ShoppingBag], ['videos', Video], ['subscribers', Users], ['categories', BarChart3]].map(([tab, Icon]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-brand-red text-white' : 'text-matte-600 hover:bg-beige-50'}`}>
              <Icon className="w-4 h-4" />
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ─── PRODUCTS TAB ─── */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-beige-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-beige-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-serif font-bold text-matte-900 text-sm sm:text-base flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-champagne-300" /> Product Management
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {isConfigured() && (
                    <button onClick={handleSeedProducts} disabled={seeding} className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg text-[10px] sm:text-xs font-medium bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors disabled:opacity-50">
                      {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">Seed from Static</span>
                      <span className="sm:hidden">Seed</span>
                    </button>
                  )}
                  <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors">
                    <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
              {/* Hide search when add form is open */}
              {!showAddForm && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-400" />
                  <input type="text" placeholder="Search by name, category, or ID..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red text-sm" />
                </div>
              )}
            </div>

            {/* Loading state */}
            {totalProducts === 0 && (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-brand-red animate-spin mx-auto mb-3" />
                <p className="text-sm text-matte-500">Loading products...</p>
              </div>
            )}

            {/* Desktop table (hidden on small screens) */}
            {totalProducts > 0 && (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-beige-50 text-xs text-matte-500 uppercase tracking-wider">
                      <tr>
                        <th className="p-3 text-left w-20">Image</th>
                        <th className="p-3 text-left w-20">ID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left w-36">Category</th>
                        <th className="p-3 text-left w-32">Price</th>
                        <th className="p-3 text-center w-28">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige-100">
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-beige-50/50 transition-colors">
                          <td className="p-3">
                            <div className="relative group w-14 h-14 rounded-lg overflow-hidden bg-beige-100 border border-beige-200">
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><rect fill="%23f5f0eb" width="56" height="56"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="10">No Image</text></svg>'; }} />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                                <label className="cursor-pointer p-1 bg-white/90 rounded hover:bg-white transition-colors" title="Upload new image">
                                  <ImagePlus className="w-3.5 h-3.5 text-matte-700" />
                                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(product.id, e)} />
                                </label>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-xs font-mono text-matte-500">{product.id}</td>
                          <td className="p-3 min-w-0 max-w-[300px]">
                            <EditableField value={product.name} onSave={(val) => handleProductFieldUpdate(product.id, 'name', val)} className="text-sm font-medium text-matte-900" />
                          </td>
                          <td className="p-3">
                            <EditableField value={product.category} type="select" options={CATEGORIES_LIST} onSave={(val) => handleProductFieldUpdate(product.id, 'category', val)} className="text-sm text-matte-600" />
                          </td>
                          <td className="p-3">
                            <EditableField value={product.price} type="price" onSave={(val) => handleProductFieldUpdate(product.id, 'price', val)} className="text-sm font-semibold text-brand-red" />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-1">
                              <ImageManager product={product} onUpload={handleImageUpload} onRemove={handleRemoveImage} onSetPrimary={handleSetPrimaryImage} />
                              <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors" title="Delete product">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card view (shown on small screens) */}
                <div className="md:hidden divide-y divide-beige-50">
                  {filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-matte-500 text-sm">No products match your search.</div>
                  ) : (
                    filteredProducts.map(product => (
                      <div key={product.id} className="p-3">
                        <ProductCardMobile
                          product={product}
                          onFieldUpdate={handleProductFieldUpdate}
                          onImageUpload={handleImageUpload}
                          onRemoveImage={handleRemoveImage}
                          onSetPrimaryImage={handleSetPrimaryImage}
                          onDelete={handleDeleteProduct}
                        />
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {totalProducts > 0 && filteredProducts.length === 0 && (
              <div className="hidden md:block p-8 text-center text-matte-500 text-sm">No products match your search.</div>
            )}
          </div>
        )}

        {/* ─── VIDEOS TAB ─── */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-beige-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-beige-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-serif font-bold text-matte-900 text-sm sm:text-base flex items-center gap-2">
                  <Video className="w-5 h-5 text-champagne-300" /> Video Management
                </h3>
                <button onClick={() => setShowAddVideoForm(true)} className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors">
                  <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Video</span><span className="sm:hidden">Add</span>
                </button>
              </div>
              {!showAddVideoForm && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-400" />
                  <input type="text" placeholder="Search videos..." value={videoSearch} onChange={(e) => setVideoSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red text-sm" />
                </div>
              )}
            </div>

            {/* Add Video Form */}
            {showAddVideoForm && (
              <AddVideoForm
                onSave={handleAddVideo}
                onCancel={() => setShowAddVideoForm(false)}
                saving={videoLoading}
              />
            )}

            {/* Video List */}
            {!showAddVideoForm && (
              <div className="divide-y divide-beige-100">
                {filteredVideos.length === 0 ? (
                  <div className="p-8 text-center text-matte-500 text-sm">
                    {videos.length === 0 ? 'No videos yet. Add your first video!' : 'No videos match your search.'}
                  </div>
                ) : (
                  filteredVideos.map(video => (
                    <div key={video.id} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-beige-50/50 transition-colors">
                      <div className="w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden bg-matte-900 flex-shrink-0 relative group/thumb">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-5 h-5 text-matte-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-4 h-4 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={video.title}
                          onSave={(val) => handleUpdateVideoTitle(video.id, val)}
                          className="text-sm font-medium text-matte-900"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${video.videoType === 'upload' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                            {video.videoType === 'upload' ? 'File' : 'Embed'}
                          </span>
                          <span className="text-[10px] text-matte-400 truncate">{video.videoUrl}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(video)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── SUBSCRIBERS TAB ─── */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-beige-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-beige-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-serif font-bold text-matte-900 text-sm sm:text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-champagne-300" /> Newsletter Subscribers
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button onClick={exportCSV} className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1"><Download className="w-3.5 h-3.5" /> CSV</button>
                  <button onClick={exportJSON} className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1"><Download className="w-3.5 h-3.5" /> JSON</button>
                  <button onClick={copyEmails} className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-beige-50 hover:bg-beige-100 text-matte-700 transition-colors flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</button>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-400" />
                  <input type="text" placeholder="Search subscribers..." value={subscriberSearch} onChange={(e) => setSubscriberSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red text-sm" />
                </div>
                {selectedSubscribers.size > 0 && (
                  <button onClick={removeSelected} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-red-50 text-red-600 text-xs hover:bg-red-100 transition-colors whitespace-nowrap">
                    <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Remove</span> ({selectedSubscribers.size})
                  </button>
                )}
                {subscribers.length > 0 && (
                  <button onClick={clearAll} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-red-50 text-red-600 text-xs hover:bg-red-100 transition-colors whitespace-nowrap">
                    <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Clear All</span>
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredSubscribers.length === 0 ? (
                <div className="p-8 text-center text-matte-500 text-sm">{subscribers.length === 0 ? 'No subscribers yet.' : 'No subscribers match your search.'}</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-beige-50 text-xs text-matte-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-3 text-left w-10"><input type="checkbox" checked={selectedSubscribers.size === filteredSubscribers.length && filteredSubscribers.length > 0} onChange={selectAll} className="rounded border-beige-300" /></th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left hidden sm:table-cell">Subscribed</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige-100">
                    {filteredSubscribers.map(sub => (
                      <tr key={sub.id} className="hover:bg-beige-50 transition-colors">
                        <td className="p-3"><input type="checkbox" checked={selectedSubscribers.has(sub.id)} onChange={() => toggleSelectSubscriber(sub.id)} className="rounded border-beige-300" /></td>
                        <td className="p-3 text-sm font-medium text-matte-900">{escapeHtml(sub.name || 'Subscriber')}</td>
                        <td className="p-3 text-sm text-matte-600 truncate max-w-[120px] sm:max-w-none">{escapeHtml(sub.email)}</td>
                        <td className="p-3 text-xs text-matte-500 hidden sm:table-cell">{sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : '—'}</td>
                        <td className="p-3 text-right">
                          <button onClick={async () => { await removeSubscriber(sub.id); const updated = await fetchSubscribers(); setSubscribers(updated); showToast('success', 'Removed', `${sub.email} removed.`); }} className="text-red-400 hover:text-red-600 transition-colors" aria-label={`Remove ${sub.email}`}>
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
        )}

        {/* ─── CATEGORIES TAB ─── */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-beige-100">
            <h3 className="font-serif font-bold text-matte-900 mb-4 text-sm sm:text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-champagne-300" /> Category Breakdown
            </h3>
            <div className="space-y-3">
              {topCategories.map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-matte-700">{cat}</span>
                    <span className="font-semibold text-matte-900">{count}</span>
                  </div>
                  <div className="h-2 bg-beige-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-red to-champagne-300 rounded-full transition-all duration-700" style={{ width: `${(count / totalProducts) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
