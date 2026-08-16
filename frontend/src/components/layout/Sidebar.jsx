import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      <aside
        className="uh-sidebar d-flex flex-column"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-dark text-white p-2 rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <span className="fw-bold small">UM</span>
            </div>
            <span className="fw-bold fs-5 text-dark m-0" style={{ letterSpacing: '-0.02em' }}>User Management</span>
          </div>
          <button
            type="button"
            className="btn-close d-lg-none"
            aria-label="Close"
            onClick={onClose}
          />
        </div>

        <div className="p-3 flex-grow-1">
          <span className="text-uppercase fw-bold text-secondary px-2 mb-2 d-block" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>
            User Management
          </span>
          <nav className="nav flex-column gap-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Users size={16} />
              <span>Users</span>
            </NavLink>
          </nav>
        </div>


      </aside>
    </>
  );
};

export default Sidebar;
