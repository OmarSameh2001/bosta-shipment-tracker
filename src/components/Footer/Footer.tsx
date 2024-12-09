import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={{ display:'flex', flexDirection: 'row', opacity: '50%'}} >
      <img src={require('../../assets/footer.png')} alt="Bosta Logo" height={'150px'} />
      <img src={require('../../assets/footer.png')} alt="Bosta Logo" height={'150px'}/>
      <img src={require('../../assets/footer.png')} alt="Bosta Logo" height={'150px'} style={{margin: 0}}/>
    </div>
  );
};

export default Footer;

