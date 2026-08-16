import React from 'react';
import { Menu, User } from 'lucide-react';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="navbar bg-white border-bottom px-4 py-3 sticky-top" style={{ height: '70px', zIndex: 1000 }}>
      <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn p-0 border-0 text-dark d-lg-none me-2"
            onClick={onMenuToggle}
            aria-label="Toggle navigation"
          >
            <Menu size={22} />
          </button>

          <h1 className="h5 mb-0 fw-bold text-dark d-none d-sm-block" style={{ letterSpacing: '-0.01em' }}>
            User Management
          </h1>

        </div>


      </div>
    </header>
  );
};

export default Header;
