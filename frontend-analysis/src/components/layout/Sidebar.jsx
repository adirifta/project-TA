import React from 'react';

const Sidebar = ({ user, onLogout }) => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Hello, {user?.name}</h2>
        <button
          onClick={onLogout}
          className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;