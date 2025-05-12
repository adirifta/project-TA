import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    notifications: true,
    darkMode: false,
    timezone: 'Asia/Jakarta',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={logout} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <MainContent>
            <div className="px-6 py-8">
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                  <p className="mt-1 text-gray-600">
                    Manage your account settings and preferences
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => setActiveTab('account')}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'account' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Account
                      </button>
                      <button
                        onClick={() => setActiveTab('preferences')}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'preferences' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Preferences
                      </button>
                      <button
                        onClick={() => setActiveTab('security')}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Security
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'profile' && (
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                          <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                              <img
                                className="w-16 h-16 rounded-full object-cover"
                                src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=random`}
                                alt="Current profile"
                              />
                            </div>
                            <label className="block">
                              <span className="sr-only">Choose profile photo</span>
                              <input
                                type="file"
                                className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-indigo-50 file:text-indigo-700
                                  hover:file:bg-indigo-100"
                              />
                            </label>
                          </div>

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {activeTab === 'account' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Manage your account details and subscription
                          </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Delete account</h4>
                              <p className="text-sm text-gray-500">
                                Permanently delete your account and all of your data
                              </p>
                            </div>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'preferences' && (
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                          <fieldset>
                            <legend className="text-lg font-medium text-gray-900">Preferences</legend>
                            <div className="mt-4 space-y-4">
                              <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="notifications"
                                    name="notifications"
                                    type="checkbox"
                                    checked={formData.notifications}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="notifications" className="font-medium text-gray-700">
                                    Email Notifications
                                  </label>
                                  <p className="text-gray-500">
                                    Receive email notifications for important updates
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                  <input
                                    id="darkMode"
                                    name="darkMode"
                                    type="checkbox"
                                    checked={formData.darkMode}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="darkMode" className="font-medium text-gray-700">
                                    Dark Mode
                                  </label>
                                  <p className="text-gray-500">
                                    Switch between light and dark theme
                                  </p>
                                </div>
                              </div>
                            </div>
                          </fieldset>

                          <div>
                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                              Timezone
                            </label>
                            <select
                              id="timezone"
                              name="timezone"
                              value={formData.timezone}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>Asia/Jakarta</option>
                              <option>Asia/Singapore</option>
                              <option>UTC</option>
                              <option>America/New_York</option>
                              <option>Europe/London</option>
                            </select>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Save Preferences
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Manage your password and security settings
                          </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                              <p className="text-sm text-gray-500">
                                Update your current password
                              </p>
                            </div>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                              Change Password
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                              <p className="text-sm text-gray-500">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                              Enable 2FA
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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

export default SettingsPage;