import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  show,
  onClose,
  title,
  children,
  footerActions,
  size = 'md'
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [show, onClose]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-backdrop show"
        onClick={onClose}
        style={{
          zIndex: 1050,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      />
      <div
        className="modal show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className={`modal-dialog modal-${size} modal-dialog-centered`} role="document">
          <div className="modal-content border-0 shadow" style={{ borderRadius: '8px' }}>
            <div className="modal-header border-bottom py-3 px-4">
              <h5 className="modal-title fs-6 fw-semibold" id="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body p-4">
              {children}
            </div>
            {footerActions && (
              <div className="modal-footer border-top bg-light py-3 px-4 d-flex justify-content-end gap-2" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                {footerActions}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
