import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={logout} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <MainContent>
            <div className="p-6 bg-white rounded-lg shadow">
              <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
              {user && (
                <div className="mt-4">
                  <p className="text-gray-600">
                    Logged in as: <span className="font-medium">{user.name}</span> ({user.email})
                  </p>
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <StatCard label="Total Users" value="1,234" icon="users" />
                      <StatCard label="Revenue" value="$34,543" icon="currency-dollar" />
                      <StatCard label="Conversion Rate" value="3.42%" icon="trending-up" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </MainContent>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => {
  const icons = {
    users: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    'currency-dollar': (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'trending-up': (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        {icons[icon]}
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default DashboardPage;