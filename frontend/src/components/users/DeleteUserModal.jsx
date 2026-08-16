import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const DeleteUserModal = ({ show, onClose, onConfirm, userName, isLoading }) => {
  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={isLoading}
        className="border shadow-sm btn-sm"
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={onConfirm}
        isLoading={isLoading}
        className="shadow-sm btn-sm"
      >
        Delete User
      </Button>
    </>
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Delete user?"
      footerActions={footer}
      size="md"
    >
      <div className="text-start">
        <p className="mb-2 text-dark">
          Are you sure you want to permanently delete <strong>{userName}</strong>?
        </p>
        <p className="text-secondary small mb-0">
          This action cannot be undone and will permanently remove this user account from the central directory database.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
