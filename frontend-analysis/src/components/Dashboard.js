import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import Loader from './ui/Loader';
import ErrorMessage from './ui/ErrorMessage';

const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* Render your dashboard components using the data */}
      {data && (
        <div>
          {/* Your dashboard content here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;