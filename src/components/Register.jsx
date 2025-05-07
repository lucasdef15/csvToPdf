import { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: user,
          password: pwd,
          roles: ['User'],
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      toast.success('Cadastro realizado com sucesso! Seja bem-vindo 👋', {
        toastId: 'register-success',
      });
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className='max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg text-center animate-fade-in'>
          <h1 className='text-3xl font-bold text-green-600 mb-4'>
            Conta Criada!
          </h1>
          <p className='text-lg text-gray-700 mb-2'>
            Sua conta foi criada com sucesso. Agora você está pronto para
            explorar!
          </p>
          <p className='text-lg'>
            <Link
              to='/login'
              className='text-blue-600 font-semibold hover:underline transition'
            >
              Clique aqui para Entrar →
            </Link>
          </p>
        </section>
      ) : (
        <section className='w-sm mx-auto mt-7 p-8 bg-white rounded-2xl shadow-2xl animate-fade-in'>
          <p
            ref={errRef}
            className={`${
              errMsg ? 'text-red-500 bg-red-100 p-3 rounded mb-4' : 'sr-only'
            }`}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
            Cadastrar
          </h1>
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username */}
            <div>
              <label
                htmlFor='username'
                className='block text-gray-700 font-medium mb-1'
              >
                Nome de usuário:
                <span className='ml-2 inline-block'>
                  {validName ? (
                    <FaCheck className='text-green-500' />
                  ) : user && !validName ? (
                    <FaTimes className='text-red-500' />
                  ) : null}
                </span>
              </label>
              <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {userFocus && user && !validName && (
                <p
                  id='uidnote'
                  className='text-sm text-gray-600 bg-gray-100 p-2 mt-1 rounded-md flex items-start gap-2'
                >
                  <FaInfoCircle className='mt-1 text-blue-500' />
                  <span>
                    De 4 a 24 caracteres. <br />
                    Deve começar com uma letra. <br />
                    Letras, números, underscores e hífens são permitidos.
                  </span>
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block text-gray-700 font-medium mb-1'
              >
                Senha:
                <span className='ml-2 inline-block'>
                  {validPwd ? (
                    <FaCheck className='text-green-500' />
                  ) : pwd && !validPwd ? (
                    <FaTimes className='text-red-500' />
                  ) : null}
                </span>
              </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {pwdFocus && !validPwd && (
                <p
                  id='pwdnote'
                  className='text-sm text-gray-600 bg-gray-100 p-2 mt-1 rounded-md flex items-start gap-2'
                >
                  <FaInfoCircle className='mt-1 text-blue-500' />
                  <span>
                    De 8 a 24 caracteres. <br />
                    Deve incluir letras maiúsculas e minúsculas, um número e um
                    caractere especial. <br />
                    Caracteres especiais permitidos: <span>!</span>{' '}
                    <span>@</span> <span>#</span> <span>$</span> <span>%</span>
                  </span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor='confirm_pwd'
                className='block text-gray-700 font-medium mb-1'
              >
                Confirmar Senha:
                <span className='ml-2 inline-block'>
                  {validMatch && matchPwd ? (
                    <FaCheck className='text-green-500' />
                  ) : matchPwd && !validMatch ? (
                    <FaTimes className='text-red-500' />
                  ) : null}
                </span>
              </label>
              <input
                type='password'
                id='confirm_pwd'
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              {matchFocus && !validMatch && (
                <p
                  id='confirmnote'
                  className='text-sm text-gray-600 bg-gray-100 p-2 mt-1 rounded-md flex items-start gap-2'
                >
                  <FaInfoCircle className='mt-1 text-blue-500' />
                  <span>Deve corresponder ao primeiro campo de senha.</span>
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={!validName || !validPwd || !validMatch}
              className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
                !validName || !validPwd || !validMatch
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Criar Conta
            </button>
          </form>

          <p className='text-sm text-gray-700 mt-6 text-center'>
            Já tem uma conta?{' '}
            <Link
              to='/login'
              className='text-blue-600 font-semibold hover:underline'
            >
              Entrar
            </Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
