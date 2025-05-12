import React from 'react';

const Footer = () => {
  return (
    <footer className="px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Dashboard App. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Terms</a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Privacy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;