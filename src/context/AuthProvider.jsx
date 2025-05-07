import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Try to get auth info from localStorage when the component mounts
    const storedAuth = localStorage.getItem('auth');
    return storedAuth
      ? JSON.parse(storedAuth)
      : { accessToken: '', user: null };
  });

  // Save auth data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  // Optional: Fetch user info again if we have a token but no user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (auth.accessToken && !auth.user) {
        try {
          const response = await axios.get('/user', {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          });
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: response.data,
          }));
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      }
    };

    fetchUserInfo();
  }, [auth.accessToken, auth.user]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
