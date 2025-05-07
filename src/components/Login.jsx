import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../api/axios';
import { Link } from 'react-router-dom';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth, auth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setAuth({
        username,
        accessToken: response.data.accessToken,
      });
      setUser('');
      setPwd('');
      setSuccess(true);
      toast.success('Login feito com sucesso! Bem-vindo de volta 👋', {
        toastId: 'login-success',
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor');
        toast.error(errMsg || 'Sem resposta do servidor', {
          toastId: 'error-msg4',
        });
      } else if (err.response?.status === 400) {
        setErrMsg('Usuário ou senha ausentes');
        toast.error(errMsg || 'Usuário ou senha ausentes', {
          toastId: 'error-msg3',
        });
      } else if (err.response?.status === 401) {
        setErrMsg('Não autorizado');
        toast.error(errMsg || 'Não autorizado', { toastId: 'error-msg2' });
      } else {
        setErrMsg('Falha no login');
        toast.error(errMsg || 'Falha no login', { toastId: 'error-msg1' });
      }
      errRef.current.focus();
      toast.error(errorMessage, { toastId: 'login-error' });
    }
  };

  return (
    <>
      {success ? (
        <section className='max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg text-center animate-fade-in'>
          <h1 className='text-3xl font-bold text-green-600 mb-4'>
            Login realizado com sucesso!
          </h1>
          <p className='text-lg text-gray-700 mb-2'>
            Você entrou na sua conta. Bem-vindo de volta!
          </p>
          <p className='text-lg'>
            <Link
              to='/'
              className='text-blue-600 font-semibold hover:underline transition'
            >
              Ir para a página inicial →
            </Link>
          </p>
        </section>
      ) : (
        <section className='w-sm mx-auto mt-7 p-8 bg-white rounded-2xl shadow-2xl animate-fade-in'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label
                htmlFor='username'
                className='block text-gray-700 font-medium mb-1'
              >
                Nome de Usuário:
              </label>
              <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-gray-700 font-medium mb-1'
              >
                Senha:
              </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <button
              className='w-full bg-blue-600 text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'
              style={{ marginTop: '.8rem' }}
            >
              Sign In
            </button>
          </form>

          <p className='text-sm text-gray-700 mt-6 text-center'>
            Criar Uma Conta?{' '}
            <Link
              to='/register'
              className='text-blue-600 font-semibold hover:underline'
            >
              Sign up
            </Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
