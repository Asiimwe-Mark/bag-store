import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const BG_COLORS = {
  success: 'border-green-200 bg-green-50/50',
  error: 'border-red-200 bg-red-50/50',
  warning: 'border-amber-200 bg-amber-50/50',
  info: 'border-blue-200 bg-blue-50/50',
};

const BAR_COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

const SingleToast = ({ toast, onRemove }) => {
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingRef = useRef(3000);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 350);
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, onRemove]);

  const handleMouseEnter = () => {
    if (exiting) return;
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - startRef.current;
    setPaused(true);
  };

  const handleMouseLeave = () => {
    if (exiting) return;
    startRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 350);
    }, remainingRef.current);
    setPaused(false);
  };

  const handleClose = () => {
    if (exiting) return;
    clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 350);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-xl shadow-2xl border
        flex items-center gap-3 p-3 sm:p-4 relative overflow-hidden
        transition-all duration-300 ease-out
        ${BG_COLORS[toast.type] || 'border-gray-200'}
        ${exiting ? 'opacity-0 translate-x-full scale-95' : 'opacity-100 translate-x-0 scale-100'}
      `}
    >
      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
        {ICONS[toast.type] || ICONS.info}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-matte-900 truncate">{toast.title}</p>
        {toast.message && <p className="text-xs text-matte-500 mt-0.5 line-clamp-2">{toast.message}</p>}
      </div>
      <button
        onClick={handleClose}
        className="p-1 rounded-md text-matte-400 hover:text-matte-600 hover:bg-white/60 transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/5">
        <div
          className={`h-full ${BAR_COLORS[toast.type] || 'bg-gray-400'} rounded-full`}
          style={{
            animation: paused ? 'none' : 'shrink 3s linear forwards',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[70] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <SingleToast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
