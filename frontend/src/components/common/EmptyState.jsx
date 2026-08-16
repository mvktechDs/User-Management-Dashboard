import React from 'react';
import { Search } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Search,
  title = 'No results found',
  description = 'Try adjusting your search criteria or add a new record.',
  action
}) => {
  return (
    <div className="text-center py-5 px-4 uh-card d-flex flex-column align-items-center justify-content-center my-3">
      <div className="bg-light p-3 rounded-circle mb-3 d-inline-flex align-items-center justify-content-center text-muted" style={{ width: '64px', height: '64px' }}>
        <Icon size={28} />
      </div>
      <h5 className="fw-semibold text-dark mb-2">{title}</h5>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '380px' }}>
        {description}
      </p>
      {action}
    </div>
  );
};

export default EmptyState;
