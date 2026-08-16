import React from 'react';

const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = '',
  circle = false
}) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : '4px',
        display: 'inline-block'
      }}
    />
  );
};

export const SkeletonTable = ({ rows = 5, cols = 7 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIndex) => (
        <tr key={rIndex}>
          {Array.from({ length: cols }).map((_, cIndex) => (
            <td key={cIndex}>
              <Skeleton 
                width={
                  cIndex === 0 ? '70%' : 
                  cIndex === 1 ? '85%' : 
                  cIndex === 5 ? '40%' : '60%'
                } 
                height="1.1rem" 
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export const SkeletonDetails = () => {
  return (
    <div className="uh-card">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Skeleton width="56px" height="56px" circle />
        <div className="flex-grow-1">
          <Skeleton width="200px" height="1.75rem" className="mb-2" />
          <Skeleton width="150px" height="1rem" />
        </div>
      </div>
      <hr className="my-4" style={{ borderColor: 'var(--uh-border)' }} />
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Skeleton width="80px" height="0.875rem" className="mb-2 d-block" />
          <Skeleton width="180px" height="1.25rem" />
        </div>
        <div className="col-12 col-md-6">
          <Skeleton width="80px" height="0.875rem" className="mb-2 d-block" />
          <Skeleton width="220px" height="1.25rem" />
        </div>
        <div className="col-12 col-md-6">
          <Skeleton width="100px" height="0.875rem" className="mb-2 d-block" />
          <Skeleton width="150px" height="1.25rem" />
        </div>
        <div className="col-12 col-md-6">
          <Skeleton width="100px" height="0.875rem" className="mb-2 d-block" />
          <Skeleton width="170px" height="1.25rem" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
