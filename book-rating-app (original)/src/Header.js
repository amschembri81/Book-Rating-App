import React from 'react';

const Header = ({ children }) => {
  return (
    <div className="centered-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

export default Header;