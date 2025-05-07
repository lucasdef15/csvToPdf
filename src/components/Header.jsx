import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='flex w-[80%]  bg-white rounded-3xl p-1 mx-auto sticky top-5 backdrop-blur-[10px] shadow-lg'>
      <Navigation />
    </header>
  );
};

export default Header;
