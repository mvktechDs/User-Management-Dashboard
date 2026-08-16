import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Eye, Pencil, Trash2 } from 'lucide-react';

const UserCard = ({ user, onViewClick, onEditClick, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="uh-card d-flex flex-column h-100 p-3 mb-2 bg-white">
      <div className="d-flex align-items-start justify-content-between mb-2">
        <div className="overflow-hidden me-2">
          <h6 className="fw-semibold text-dark mb-0 text-truncate">{user.name}</h6>
          <p className="text-secondary small mb-0 text-truncate">{user.company?.name || 'No Company'}</p>
        </div>

        <div className="d-flex gap-1 flex-shrink-0">
          <button
            type="button"
            className="btn btn-sm btn-light border p-0 d-flex align-items-center justify-content-center"
            style={{ width: '28px', height: '28px', color: 'var(--uh-text-secondary)' }}
            onClick={() => onViewClick(user)}
            title="View Details"
          >
            <Eye size={12} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light border p-0 d-flex align-items-center justify-content-center"
            style={{ width: '28px', height: '28px', color: 'var(--uh-accent)' }}
            onClick={() => onEditClick(user)}
            title="Edit User"
          >
            <Pencil size={12} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light border p-0 d-flex align-items-center justify-content-center text-danger"
            style={{ width: '28px', height: '28px' }}
            onClick={() => onDeleteClick(user)}
            title="Delete User"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="d-flex flex-column gap-2 small text-secondary mt-auto">
        <div className="d-flex align-items-center gap-2">
          <Mail size={14} className="text-muted flex-shrink-0" />
          <span className="text-truncate" title={user.email}>{user.email}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Phone size={14} className="text-muted flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <MapPin size={14} className="text-muted flex-shrink-0" />
          <span>{user.address?.city || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
