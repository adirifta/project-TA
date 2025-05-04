import React from 'react';
import Dashboard from '../Dashboard';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto p-4">
      {children}
      <Dashboard />
    </main>
  );
};

export default MainContent;