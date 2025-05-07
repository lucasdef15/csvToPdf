import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { Menu, X } from 'lucide-react'; // ícones
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logout feito com sucesso! Até logo 👋', {
      toastId: 'logout-success',
    });
    setMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className='w-full rounded-[var(--radius-md)] sticky  z-50 backdrop-blur-[10px]'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <section className='flex items-center justify-center'>
          <button
            onClick={() => navigate('/')}
            className='font-[Outfit] font-bold text-[1.3rem] tracking-[0.6px] inline-flex items-center gap-1 text-[#1a1a1a] cursor-pointer focus:outline-none'
          >
            <span className='text-[#3ac47d]'>CSV</span>
            <span className='text-sm'>to</span>
            <span className='text-[#f45b69]'>PDF</span>
          </button>
        </section>

        {/* Botão Hamburguer (visível apenas em telas pequenas) */}
        <button
          className='sm:hidden text-[#1a1a1a]'
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Desktop */}
        <section className='hidden sm:flex items-center gap-3'>
          {!auth.user ? (
            <>
              <button
                onClick={handleLogin}
                className='bg-white text-[#121212] font-bold cursor-pointer px-4 py-2 rounded hover:scale-110 transition'
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className='bg-[#1a1a1a] text-white font-bold cursor-pointer px-4 py-2 rounded shadow-md hover:scale-105 hover:shadow-lg transition'
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span className='text-gray-700 font-medium'>
                {`Olá, ${auth.user.username}`}
              </span>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white cursor-pointer font-semibold px-4 py-2 rounded hover:bg-red-600 transition'
              >
                Logout
              </button>
            </>
          )}
        </section>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className='sm:hidden mt-4 flex flex-col gap-3 items-start'>
          <Link
            to='/'
            className='text-sm font-medium text-[#1a1a1a]'
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {!auth.user ? (
            <>
              <button
                onClick={handleLogin}
                className='bg-white text-[#121212] font-bold px-4 py-2 rounded w-full text-left'
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className='bg-[#1a1a1a] text-white font-bold px-4 py-2 rounded w-full text-left'
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span className='text-gray-700 font-medium'>
                {`Olá, ${auth.user.username}`}
              </span>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white font-semibold px-4 py-2 rounded w-full text-left'
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
