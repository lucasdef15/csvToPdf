import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className='main_container'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
