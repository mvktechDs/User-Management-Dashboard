import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className} d-inline-flex align-items-center justify-content-center`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
