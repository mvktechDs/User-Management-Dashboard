import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUser, clearMutationError } from '../../redux/slices/userSlice';
import UserForm from './UserForm';
import { X } from 'lucide-react';
import { toast } from '../../utils/toast';

const CreateUserDrawer = ({ show, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (show) {
      dispatch(clearMutationError());
    }
  }, [show, dispatch]);

  if (!show) return null;

  const handleSubmit = async (userData) => {
    try {
      const resultAction = await dispatch(createUser(userData));
      if (createUser.fulfilled.match(resultAction)) {
        toast.success(`User "${userData.name}" created successfully.`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        const err = resultAction.payload || { message: 'Creation failed.' };
        toast.error(err.message || 'Unable to create user.');
      }
    } catch (e) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{
          zIndex: 1048,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      />

      <div
        className="offcanvas offcanvas-end show border-start"
        tabIndex="-1"
        style={{
          zIndex: 1050,
          visibility: 'visible',
          width: '100%',
          maxWidth: '650px',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.08)'
        }}
      >
        <div className="offcanvas-header border-bottom bg-light px-4 py-3 d-flex align-items-center justify-content-between">
          <div>
            <h5 className="offcanvas-title fw-bold text-dark mb-0">Add New User</h5>
          </div>
          <button
            type="button"
            className="btn btn-icon btn-light rounded-circle border d-flex align-items-center justify-content-center p-0"
            onClick={onClose}
            style={{ width: '36px', height: '36px' }}
            aria-label="Close drawer"
          >
            <X size={18} className="text-secondary" />
          </button>
        </div>

        <div className="offcanvas-body p-4" style={{ overflowY: 'auto' }}>
          <UserForm
            onSubmit={handleSubmit}
            isLoading={loading.mutation}
            submitText="Create Profile"
            apiError={error.mutation}
            onCancel={onClose}
          />
        </div>
      </div>
    </>
  );
};

export default CreateUserDrawer;
