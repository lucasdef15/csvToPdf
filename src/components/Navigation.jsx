import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logout feito com sucesso! Até logo 👋', {
      toastId: 'logout-success',
    });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className='flex w-[100%] h-12 sticky top-5 bg-[var(--color-heading)] rounded-[var(--radius-md)] p-4  mx-auto backdrop-blur-[10px] items-center justify-between z-50'>
      <section className='flex items-center justify-center gap-4'>
        <span className='font-[Outfit] font-bold text-[1.3rem] tracking-[0.6px] inline-flex items-center gap-1 text-[#1a1a1a] rounded-xl'>
          <span className='text-[#3ac47d]'>CSV</span>
          <span className='text-sm'>to</span>
          <span className='text-[#f45b69]'>PDF</span>
        </span>
        <Link
          to='/'
          className='text-sm font-medium text-[#1a1a1a] hover:underline'
        >
          Home
        </Link>
      </section>

      {!auth.user ? (
        <section className='flex items-center justify-center gap-3'>
          <button
            onClick={handleLogin}
            className='bg-white text-[#121212] font-bold cursor-pointer px-4 py-2 rounded transition-transform duration-200 hover:scale-110'
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className='bg-[#1a1a1a] text-white font-bold cursor-pointer px-4 py-2 rounded shadow-md transition duration-300 hover:scale-105 hover:shadow-lg'
          >
            Sign up
          </button>
        </section>
      ) : (
        <div className='flex items-center justify-between gap-4'>
          <span className='text-gray-700 font-medium'>
            {auth?.user?.username ? `Olá, ${auth.user.username}` : 'Usuário'}
          </span>
          <button
            onClick={handleLogout}
            className='text-white bg-red-500 hover:bg-red-600 cursor-pointer font-semibold px-4 py-2 rounded transition duration-200 cursor-pointer'
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
