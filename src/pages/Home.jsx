import { useState } from 'react';
import DropZone from '../components/DropZone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css';

const Home = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileAccepted = async (file) => {
    console.log('File accepted:', file.name);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending request to backend...');
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response data:', data);
      toast.success(data.message || 'Arquivo carregado com sucesso!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Houve um erro ao tentar fazer o upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='upload_wrapper'>
      <h2>CSV to PDF Converter</h2>
      <DropZone onFileAccepted={handleFileAccepted} />
      {uploading && <p>Uploading...</p>}
      <ToastContainer position='bottom-right' autoClose={3000} />
    </div>
  );
};

export default Home;
