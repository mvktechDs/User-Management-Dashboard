import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Unable to complete action',
  message = 'Please check your connection and try again.',
  onRetry
}) => {
  return (
    <div className="text-center py-5 px-4 uh-card d-flex flex-column align-items-center justify-content-center my-3" style={{ border: '1px solid #FECDCA', backgroundColor: '#FEF3F2' }}>
      <div className="bg-white p-3 rounded-circle mb-3 d-inline-flex align-items-center justify-content-center text-danger shadow-sm" style={{ width: '60px', height: '60px' }}>
        <AlertCircle size={24} />
      </div>
      <h5 className="fw-semibold text-danger mb-2">{title}</h5>
      <p className="text-danger-emphasis small mb-4 mx-auto" style={{ maxWidth: '360px' }}>
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="d-flex align-items-center gap-2 border shadow-sm">
          <RefreshCw size={16} />
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
