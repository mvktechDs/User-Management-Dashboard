import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Mail, Phone, Building2, MapPin, Globe, Calendar, Pencil, Trash2 } from 'lucide-react';
import { formatCoordinates, formatDate } from '../../utils/formatters';

const UserDetailsModal = ({ show, onClose, user, onEditClick, onDeleteClick }) => {
  if (!user) return null;

  const footerActions = (
    <div className="d-flex gap-2 w-100 justify-content-end align-items-center">
      <Button
        variant="secondary"
        className="btn-sm border shadow-sm d-flex align-items-center gap-1"
        onClick={() => onEditClick(user)}
      >
        <Pencil size={14} />
        Edit Profile
      </Button>
      <Button
        variant="danger"
        className="btn-sm shadow-sm d-flex align-items-center gap-1"
        onClick={() => onDeleteClick(user)}
      >
        <Trash2 size={14} />
        Delete User
      </Button>
      <Button
        variant="secondary"
        className="btn-sm border shadow-sm"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="User Profile Details"
      footerActions={footerActions}
      size="lg"
    >
      <div className="row g-4 text-start">
        <div className="col-12 col-md-4 text-center py-2 d-flex flex-column align-items-center justify-content-center border-end-md" style={{ borderRight: '1px solid var(--uh-border)' }}>
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center text-uppercase fw-semibold mb-3 shadow-sm"
            style={{ width: '72px', height: '72px', fontSize: '1.75rem' }}
          >
            {user.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
          </div>
          <h6 className="fw-bold text-dark mb-1">{user.name}</h6>
          <p className="text-secondary small mb-3">{user.company?.name || 'Independent Partner'}</p>
          <div className="d-flex align-items-center gap-2 text-secondary justify-content-center" style={{ fontSize: '0.75rem' }}>
            <Calendar size={13} />
            <span>Created {formatDate(user.createdAt)}</span>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <div className="d-flex gap-2 align-items-start">
                <div className="bg-light p-2 rounded text-secondary flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-secondary fw-semibold d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Email
                  </span>
                  <a href={`mailto:${user.email}`} className="text-primary small text-break">
                    {user.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="d-flex gap-2 align-items-start">
                <div className="bg-light p-2 rounded text-secondary flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-secondary fw-semibold d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Phone
                  </span>
                  <span className="text-dark small">{user.phone}</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="d-flex gap-2 align-items-start">
                <div className="bg-light p-2 rounded text-secondary flex-shrink-0">
                  <Building2 size={16} />
                </div>
                <div>
                  <span className="text-secondary fw-semibold d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Company
                  </span>
                  <span className="text-dark small">{user.company?.name || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="d-flex gap-2 align-items-start">
                <div className="bg-light p-2 rounded text-secondary flex-shrink-0">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="text-secondary fw-semibold d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Coordinates
                  </span>
                  <span className="text-dark small">
                    {formatCoordinates(user.address?.geo?.lat, user.address?.geo?.lng)}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex gap-2 align-items-start border-top pt-3">
                <div className="bg-light p-2 rounded text-secondary flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-secondary fw-semibold d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Address
                  </span>
                  <span className="text-dark small d-block">{user.address?.street}</span>
                  <span className="text-secondary small">{user.address?.city}, {user.address?.zipcode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
