import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const { id, message, type, duration } = e.detail;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };

    window.addEventListener('app-toast', handleToast);
    return () => window.removeEventListener('app-toast', handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000, maxWidth: '380px' }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast show border shadow-sm mb-2 bg-white"
          style={{ borderRadius: '6px', borderLeft: `4px solid ${t.type === 'success' ? 'var(--uh-success)' : 'var(--uh-danger)'}` }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center gap-2">
              {t.type === 'success' ? (
                <CheckCircle2 size={18} className="text-success flex-shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-danger flex-shrink-0" />
              )}
              <span className="small fw-medium text-dark">{t.message}</span>
            </div>
            <button
              type="button"
              className="btn-close"
              style={{ fontSize: '0.75rem' }}
              aria-label="Close"
              onClick={() => removeToast(t.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
