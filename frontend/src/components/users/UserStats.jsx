import React from 'react';
import { Users, Building2, UserPlus } from 'lucide-react';
import Skeleton from '../common/Skeleton';

const UserStats = ({ stats, loading }) => {
  const statItems = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: '#4F46E5',
      bgColor: '#EEF2F6'
    },
    {
      title: 'Unique Companies',
      value: stats.uniqueCompanies,
      icon: Building2,
      color: '#16805C',
      bgColor: '#E6F4EA'
    },
    {
      title: 'New Users (7d)',
      value: stats.newUsers,
      icon: UserPlus,
      color: '#172033',
      bgColor: '#F0F2F5'
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {statItems.map((item, index) => (
        <div className="col-12 col-md-4" key={index}>
          <div className="uh-card h-100 d-flex align-items-center justify-content-between p-3">
            <div>
              <p className="text-secondary small fw-medium mb-1 text-uppercase" style={{ letterSpacing: '0.04em' }}>
                {item.title}
              </p>
              {loading ? (
                <Skeleton width="80px" height="1.75rem" />
              ) : (
                <h3 className="mb-0 fw-bold text-dark">{item.value}</h3>
              )}
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: item.bgColor,
                color: item.color
              }}
            >
              <item.icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
