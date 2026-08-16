import React from 'react';

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
        style={{ zIndex: 1500 }}
      >
        <div className="spinner-border text-primary" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5 w-100">
      <div className="spinner-border text-primary" style={{ borderWidth: '3px' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
