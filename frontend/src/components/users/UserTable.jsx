import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const UserTable = ({ users, onViewClick, onEditClick, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="uh-table-container">
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col" style={{ minWidth: '150px' }}>Name</th>
              <th scope="col" style={{ minWidth: '180px' }}>Email</th>
              <th scope="col" style={{ minWidth: '130px' }}>Phone</th>
              <th scope="col" style={{ minWidth: '150px' }}>Company</th>
              <th scope="col" style={{ minWidth: '100px' }}>City</th>
              <th scope="col" style={{ minWidth: '110px' }}>Created</th>
              <th scope="col" className="text-end" style={{ minWidth: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <span className="fw-semibold text-dark">{user.name}</span>
                </td>
                <td className="text-secondary text-truncate" style={{ maxWidth: '180px' }} title={user.email}>
                  {user.email}
                </td>
                <td className="text-secondary">{user.phone}</td>
                <td className="text-secondary text-truncate" style={{ maxWidth: '150px' }} title={user.company?.name}>
                  {user.company?.name || 'N/A'}
                </td>
                <td>
                  <span className="badge bg-light text-dark border px-2 py-1fw-normal">
                    {user.address?.city || 'N/A'}
                  </span>
                </td>
                <td className="text-secondary small">
                  {formatDate(user.createdAt)}
                </td>
                <td className="text-end">
                  <div className="d-inline-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border p-1 d-inline-flex align-items-center justify-content-center"
                      style={{ width: '30px', height: '30px', color: 'var(--uh-text-secondary)' }}
                      title="View user details"
                      onClick={() => onViewClick(user)}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border p-1 d-inline-flex align-items-center justify-content-center"
                      style={{ width: '30px', height: '30px', color: 'var(--uh-accent)' }}
                      title="Edit user"
                      onClick={() => onEditClick(user)}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border p-1 d-inline-flex align-items-center justify-content-center text-danger"
                      style={{ width: '30px', height: '30px' }}
                      title="Delete user"
                      onClick={() => onDeleteClick(user)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
