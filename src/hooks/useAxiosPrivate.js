import axios from '../api/axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const res = await axios.get('/auth/refresh', {
              withCredentials: true,
            });
            setAuth((prev) => ({
              ...prev,
              accessToken: res.data.accessToken,
            }));
            prevRequest.headers[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`;
            return axios(prevRequest);
          } catch (err) {
            console.error('Refresh token falhou:', err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return axios;
};

export default useAxiosPrivate;
