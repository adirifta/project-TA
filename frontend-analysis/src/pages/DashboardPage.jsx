import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} onLogout={logout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <MainContent>
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          {user && (
            <p className="mt-2 text-gray-600">
              Logged in as: {user.name} ({user.email})
            </p>
          )}
        </MainContent>
      </div>
    </div>
  );
};

export default DashboardPage;