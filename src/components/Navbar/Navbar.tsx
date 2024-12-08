import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f3fafb', color: 'black', position: 'relative', height: '75px' }}>
      <img src={require('../../assets/bosta-logo.png')} alt="Bosta Logo" height={'75px'} style={{ position: 'absolute', right: '60px' }} />
    </div>
  );
};

export default Navbar;

