import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const ReportsPage = () => {
  const { user, logout } = useAuth();

  // Sample data for the reports
  const topProducts = [
    { id: 1, name: 'Premium Widget', sales: 1245, revenue: 18432 },
    { id: 2, name: 'Standard Widget', sales: 987, revenue: 12345 },
    { id: 3, name: 'Basic Widget', sales: 654, revenue: 8765 },
    { id: 4, name: 'Deluxe Package', sales: 432, revenue: 15678 },
    { id: 5, name: 'Starter Kit', sales: 321, revenue: 5432 },
  ];

  const recentActivities = [
    { id: 1, action: 'New order #10025', user: 'John Doe', time: '2 mins ago', status: 'completed' },
    { id: 2, action: 'Payment received #10024', user: 'Jane Smith', time: '15 mins ago', status: 'completed' },
    { id: 3, action: 'New customer registered', user: 'Robert Johnson', time: '1 hour ago', status: 'pending' },
    { id: 4, action: 'Order shipped #10023', user: 'Emily Davis', time: '3 hours ago', status: 'shipped' },
    { id: 5, action: 'Refund processed #10022', user: 'Michael Wilson', time: '1 day ago', status: 'refunded' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={logout} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <MainContent>
            <div className="space-y-6">
              {/* Page Header */}
              <div className="p-6 bg-white rounded-lg shadow">
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
                    <p className="mt-1 text-gray-600">
                      Comprehensive overview of your business performance
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                  title="Total Revenue"
                  value="$48,252"
                  change="+12.5%"
                  isPositive={true}
                  icon="currency-dollar"
                />
                <SummaryCard
                  title="Total Orders"
                  value="3,245"
                  change="+8.2%"
                  isPositive={true}
                  icon="shopping-cart"
                />
                <SummaryCard
                  title="Conversion Rate"
                  value="3.42%"
                  change="-0.5%"
                  isPositive={false}
                  icon="trending-up"
                />
                <SummaryCard
                  title="Avg. Order Value"
                  value="$148.85"
                  change="+4.3%"
                  isPositive={true}
                  icon="chart-bar"
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Top Products Table */}
                <div className="lg:col-span-2">
                  <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Sales
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Revenue
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topProducts.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{product.sales.toLocaleString()}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">
                                  ${product.revenue.toLocaleString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-sm text-indigo-600 hover:text-indigo-900">
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h2>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex">
                          <div className={`flex-shrink-0 mt-1 w-2 h-2 rounded-full ${
                            activity.status === 'completed' ? 'bg-green-500' :
                            activity.status === 'pending' ? 'bg-yellow-500' :
                            activity.status === 'shipped' ? 'bg-blue-500' : 'bg-red-500'
                          }`}></div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <div className="flex text-xs text-gray-500">
                              <span>{activity.user}</span>
                              <span className="mx-1">•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View All Activity
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Reports Section */}
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Performance Metrics</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Sales by Category</h3>
                      <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                      </select>
                    </div>
                    <div className="mt-4 h-60 bg-gray-50 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Chart will be displayed here</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Customer Acquisition</h3>
                      <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                      </select>
                    </div>
                    <div className="mt-4 h-60 bg-gray-50 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MainContent>
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, change, isPositive, icon }) => {
  const icons = {
    'currency-dollar': (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'shopping-cart': (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'trending-up': (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    'chart-bar': (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-indigo-50">
          {icons[icon]}
        </div>
      </div>
      <div className="mt-2">
        <span className={`inline-flex items-center text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
          {isPositive ? (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
        <span className="ml-2 text-sm text-gray-500">vs last period</span>
      </div>
    </div>
  );
};

export default ReportsPage;