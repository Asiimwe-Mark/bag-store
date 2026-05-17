import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />
  };

  const bgColors = {
    success: 'border-green-200',
    error: 'border-red-200',
    warning: 'border-yellow-200'
  };

  return (
    <div className={`toast show fixed top-4 sm:top-6 right-4 sm:right-6 z-[70] bg-white rounded-xl shadow-2xl p-3 sm:p-4 flex items-center gap-3 border ${bgColors[toast.type] || 'border-gray-100'} max-w-[calc(100vw-2rem)] sm:max-w-sm`}>
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
        {icons[toast.type] || icons.success}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-matte-900 truncate">{toast.title}</p>
        <p className="text-xs text-matte-500 truncate">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
        <XCircle className="w-5 h-5" />
      </button>
      <div className="toast-progress">
        <div className={`toast-progress-bar ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
      </div>
    </div>
  );
};

export default Toast;