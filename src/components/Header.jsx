import React from 'react';
import Navigation from './Navigation';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className='header_wrapper box-shadow'>
      <Navigation />
    </header>
  );
};

export default Header;
