import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { BsFillFileEarmarkSpreadsheetFill } from 'react-icons/bs';

const DropZone = ({ onFileAccepted }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type === 'text/csv') {
        setSelectedFile(file);
        onFileAccepted(file);
      } else {
        toast.error('Apenas arquivos CSV são permitidos.');
        setSelectedFile(null);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex flex-col items-center justify-center text-center
        border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300
        px-8 py-10 my-4
        ${
          isDragActive
            ? 'border-green-600 bg-blue-50 text-green-600'
            : 'border-gray-400 bg-gray-50 text-gray-600'
        }
      `}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <div className='flex flex-col items-center gap-2'>
          <BsFillFileEarmarkSpreadsheetFill className='text-green-600 text-4xl' />
          <p className='text-sm text-green-700'>
            Arquivo carregado: {selectedFile.name}
          </p>
        </div>
      ) : isDragActive ? (
        <p className='text-base font-medium'>Solte o arquivo CSV aqui...</p>
      ) : (
        <p className='text-base font-medium'>
          Arraste e solte um arquivo CSV aqui, ou clique para selecionar
        </p>
      )}
    </div>
  );
};

export default DropZone;
