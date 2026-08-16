import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../common/Toast';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--uh-bg)' }}>
      <ToastContainer />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="uh-content-wrapper d-flex flex-column flex-grow-1">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
