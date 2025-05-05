import React from 'react';
import Navigation from './Navigation';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className=' container header_wrapper box-shadow'>
      <Navigation />
    </div>
  );
};

export default Header;
