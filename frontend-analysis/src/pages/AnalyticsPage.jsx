import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';

const AnalyticsPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={logout} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <MainContent>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                {user && (
                  <p className="mt-2 text-gray-600">
                    Welcome back, <span className="font-medium">{user.name}</span>. Here's what's happening with your business.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <BarChart />
                <LineChart />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h2>
                    {/* Activity timeline component would go here */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">New user registered</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <PieChart />
              </div>
            </div>
          </MainContent>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;