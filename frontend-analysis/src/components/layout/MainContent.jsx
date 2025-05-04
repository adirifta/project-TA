import React from 'react';
import PropTypes from 'prop-types';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;