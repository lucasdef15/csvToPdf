import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='nav_wrapper'>
      <section className='logo_wrapper'>
        <span className='logo'>
          <span className='green'>CSV</span>
          <span style={{ fontSize: '1rem' }}>to</span>
          <span className='red'>PDF</span>
        </span>
        <Link to='/'>Home</Link>
      </section>
      <section className='login_btns'>
        <button className='clear'>Login</button>
        <button className='blue'>Sign up</button>
      </section>
    </nav>
  );
};

export default Navigation;
