import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  fetchUsers,
  deleteUser,
  setSearch
} from '../redux/slices/userSlice';
import UserTable from '../components/users/UserTable';
import UserCard from '../components/users/UserCard';
import DeleteUserModal from '../components/users/DeleteUserModal';
import UserDetailsModal from '../components/users/UserDetailsModal';
import EditUserDrawer from '../components/users/EditUserDrawer';
import CreateUserDrawer from '../components/users/CreateUserDrawer';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { SkeletonTable } from '../components/common/Skeleton';
import { toast } from '../utils/toast';
import { Plus, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, error, pagination, search } = useAppSelector(
    (state) => state.users
  );

  const [searchInput, setSearchInput] = useState(search);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToView, setUserToView] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const delayDebounce = setTimeout(() => {
      dispatch(setSearch(searchInput));
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: pagination.limit, search }));
  }, [dispatch, search, pagination.limit]);

  const handlePageChange = (newPage) => {
    dispatch(fetchUsers({ page: newPage, limit: pagination.limit, search }));
  };

  const handleRetry = () => {
    dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit, search }));
  };

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const openViewDetails = (user) => {
    setUserToView(user);
    setShowViewModal(true);
  };

  const openEditDrawer = (user) => {
    setUserToEdit(user);
    setShowEditDrawer(true);
  };

  const closeEditDrawer = () => {
    setUserToEdit(null);
    setShowEditDrawer(false);
  };

  const openCreateDrawer = () => {
    setShowCreateDrawer(true);
  };

  const closeCreateDrawer = () => {
    setShowCreateDrawer(false);
  };

  const closeViewDetails = () => {
    setUserToView(null);
    setShowViewModal(false);
  };

  const closeDeleteConfirmation = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const resultAction = await dispatch(deleteUser(userToDelete._id));
      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success(`User "${userToDelete.name}" deleted successfully.`);
        dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit, search }));
      } else {
        const err = resultAction.payload || { message: 'Deletion failed.' };
        toast.error(err.message || 'Unable to delete user.');
      }
    } catch (e) {
      toast.error('An unexpected error occurred.');
    } finally {
      closeDeleteConfirmation();
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    dispatch(setSearch(''));
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>User Directory</h2>
          <p className="text-secondary small mb-0">Browse company personnel, search records, or add new staff profiles.</p>
        </div>
        <Button
          variant="primary"
          className="d-flex align-items-center gap-1 shadow-sm"
          onClick={openCreateDrawer}
        >
          <Plus size={16} />
          Add User
        </Button>
      </div>

      <div className="uh-card border bg-white p-0 overflow-hidden mb-4">
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2 bg-white">
          <div className="position-relative w-100" style={{ maxWidth: '380px' }}>
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
              <Search size={16} />
            </span>
            <input
              type="text"
              id="users-search-input"
              className="form-control ps-5 pe-4"
              placeholder="Search by name, email, or company..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                type="button"
                className="btn border-0 position-absolute end-0 top-50 translate-middle-y pe-3 text-secondary p-0"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {loading.list ? (
          <div className="p-3">
            <div className="table-responsive border rounded">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Company</th>
                    <th scope="col">City</th>
                    <th scope="col">Created</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SkeletonTable rows={5} />
                </tbody>
              </table>
            </div>
          </div>
        ) : error.list ? (
          <div className="p-4">
            <ErrorState
              title="Failed to load users"
              message={error.list.message || 'The server returned an error while fetching directory list.'}
              onRetry={handleRetry}
            />
          </div>
        ) : users.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title={search ? 'No matching users found' : 'No users registered'}
              description={search ? 'Try adjusting your terms or typing a different name, email, or company.' : 'Click Add User to create your first directory profile.'}
              action={
                search ? (
                  <Button variant="secondary" onClick={clearSearch}>Reset search filters</Button>
                ) : (
                  <Button variant="primary" onClick={openCreateDrawer}>
                    <Plus size={16} className="me-1" /> Add user profile
                  </Button>
                )
              }
            />
          </div>
        ) : (
          <>
            <div className="d-none d-lg-block p-3">
              <UserTable
                users={users}
                onViewClick={openViewDetails}
                onEditClick={openEditDrawer}
                onDeleteClick={openDeleteConfirmation}
              />
            </div>

            <div className="d-lg-none p-3">
              <div className="row g-2">
                {users.map((user) => (
                  <div className="col-12 col-md-6" key={user._id}>
                    <UserCard
                      user={user}
                      onViewClick={openViewDetails}
                      onEditClick={openEditDrawer}
                      onDeleteClick={openDeleteConfirmation}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 border-top bg-light d-flex align-items-center justify-content-between flex-wrap gap-2">
              <span className="small text-secondary fw-medium">
                Showing {users.length} of {pagination.total} user{pagination.total !== 1 ? 's' : ''}
              </span>

              {pagination.totalPages > 1 && (
                <nav aria-label="Users page navigation">
                  <ul className="pagination pagination-sm mb-0 align-items-center gap-1">
                    <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link border d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </li>
                    <li className="mx-2 small fw-medium text-dark">
                      Page {pagination.page} of {pagination.totalPages}
                    </li>
                    <li className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link border d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', borderRadius: '4px' }}
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </>
        )}
      </div>

      <DeleteUserModal
        show={showDeleteModal}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDeleteUser}
        userName={userToDelete?.name}
        isLoading={loading.mutation}
      />

      <UserDetailsModal
        show={showViewModal}
        onClose={closeViewDetails}
        user={userToView}
        onEditClick={(user) => {
          closeViewDetails();
          openEditDrawer(user);
        }}
        onDeleteClick={(user) => {
          closeViewDetails();
          openDeleteConfirmation(user);
        }}
      />

      <EditUserDrawer
        show={showEditDrawer}
        onClose={closeEditDrawer}
        user={userToEdit}
        onSuccess={() => {
          dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit, search }));
        }}
      />

      <CreateUserDrawer
        show={showCreateDrawer}
        onClose={closeCreateDrawer}
        onSuccess={() => {
          dispatch(fetchUsers({ page: 1, limit: pagination.limit, search }));
        }}
      />
    </div>
  );
};

export default Users;
