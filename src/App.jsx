import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Header />
      <main className='w-full flex place-content-center mt-28'>
        <Outlet />
      </main>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </>
  );
};

export default App;
