import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='flex w-[80%]  bg-amber-50 rounded-3xl p-4 mx-auto sticky top-5 backdrop-blur-[10px] shadow-lg'>
      <Navigation />
    </header>
  );
};

export default Header;
