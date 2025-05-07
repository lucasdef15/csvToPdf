import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000', // ou seu domínio
  withCredentials: true, // importante para enviar cookies
});
