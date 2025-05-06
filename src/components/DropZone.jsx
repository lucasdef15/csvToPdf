import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const DropZone = ({ onFileAccepted }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log('Dropped file:', file);
      if (file && file.type === 'text/csv') {
        setSelectedFile(file);
        onFileAccepted(file);
      } else {
        toast.error('Only CSV files are allowed.');
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
      style={{
        border: isDragActive ? '2px dashed #00A63E' : '2px dashed #999',
        padding: '5rem',
        marginBlock: '.8rem',
        borderRadius: '12px',
        textAlign: 'center',
        backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        color: isDragActive ? '#00A63E' : '',
      }}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#00A63E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
            <polyline points='14 2 14 8 20 8' />
            <line x1='16' y1='13' x2='8' y2='13' />
            <line x1='16' y1='17' x2='8' y2='17' />
            <polyline points='10 9 9 9 8 9' />
          </svg>
          <p>File loaded: {selectedFile.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the CSV here...</p>
      ) : (
        <p>Drag & drop a CSV file here, or click to select</p>
      )}
    </div>
  );
};

export default DropZone;
