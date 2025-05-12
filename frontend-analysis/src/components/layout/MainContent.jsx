import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="container px-4 py-6 mx-auto">
        {children}
      </div>
    </main>
  );
};

export default MainContent;