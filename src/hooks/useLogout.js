import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosPrivate.post('/auth/logout'); // limpa cookie no backend
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    } finally {
      setAuth({ accessToken: '', user: null });
      localStorage.removeItem('auth');
      navigate('/login'); // ou a rota que quiser
    }
  };

  return logout;
};

export default useLogout;
