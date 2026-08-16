import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ minHeight: '60vh' }}>
      <div className="bg-light p-3 rounded-circle mb-3 d-inline-flex align-items-center justify-content-center text-secondary" style={{ width: '72px', height: '72px' }}>
        <HelpCircle size={36} />
      </div>
      <h2 className="fw-bold text-dark mb-2">Page Not Found</h2>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '400px' }}>
        The URL path you entered doesn't map to any dashboard view. Please check the address or return home.
      </p>
      <Button variant="primary" onClick={() => navigate('/dashboard')} className="shadow-sm">
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
