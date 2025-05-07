import { useState } from 'react';
import DropZone from '../components/DropZone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

const Home = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [pdfs, setPdfs] = useState([]); // Store PDFs with url and filename
  const axiosPrivate = useAxiosPrivate();

  const handleFileAccepted = async (file) => {
    if (!file) {
      toast.error('Nenhum arquivo selecionado.', { toastId: 'error-file' });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axiosPrivate.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { message, pdfUrl } = res.data;
      const filename = pdfUrl.split('/').pop();

      setPdfs((prevPdfs) => [
        ...prevPdfs,
        { url: `http://localhost:5000${pdfUrl}`, filename },
      ]);

      toast.success(message || 'Arquivo carregado e PDF gerado com sucesso!', {
        toastId: 'success-file',
      });
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response?.status === 401) {
        toast.error('Você precisa estar logado para enviar arquivos.', {
          toastId: 'unauthorized-upload',
        });
        navigate('/login'); // REDIRECIONA PARA LOGIN
        return;
      }

      let errorMessage = 'Houve um erro ao tentar fazer o upload.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 403) {
        errorMessage = 'Acesso negado. Verifique suas credenciais.';
      }

      toast.error(errorMessage, { toastId: 'error-file' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (indexToDelete) => {
    setPdfs((prevPdfs) =>
      prevPdfs.filter((_, index) => index !== indexToDelete)
    );
    toast.info('PDF removido da lista.', { toastId: 'info-delete' });
  };

  return (
    <div className='w-[450px] max-w-5xl mx-auto p-6 text-center'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6'>
        CSV to PDF Converter
      </h2>
      <DropZone onFileAccepted={handleFileAccepted} />
      {uploading && (
        <p className='text-blue-600 font-semibold mt-4'>Uploading...</p>
      )}
      <div className='mt-8'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          PDFs Gerados
        </h3>
        {pdfs.length === 0 ? (
          <p className='text-gray-600'>Nenhum PDF gerado ainda.</p>
        ) : (
          <ul className='space-y-3'>
            {pdfs.map((pdf, index) => (
              <li
                key={index}
                className='flex items-center gap-2 justify-between bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200'
              >
                <BsFillFileEarmarkPdfFill
                  fontSize={25}
                  className='text-red-500'
                />
                <span className='text-gray-700 truncate flex-1 text-left pr-4'>
                  {pdf.filename}
                </span>
                <div className='flex gap-2'>
                  <a
                    href={pdf.url}
                    download={pdf.filename}
                    target='_blank'
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200'
                    title='Baixar PDF'
                  >
                    <FaDownload size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(index)}
                    className='flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200'
                    title='Remover PDF'
                  >
                    <FaTimes size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
