import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

interface WebcamComponentProps {
  onSave: (savedFileName: string) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({ onSave }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam: ', error);
      }
    };

    getVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setPhoto(dataUrl);
      }
    }
  };

  const onSubmit = async () => {
    if (!photo) return;

    const blob = await fetch(photo).then(res => res.blob());
    const originalFile = new File([blob], "captured.png", { type: blob.type });
    const newFileName = generateFileName(originalFile.name); // Implement this function as needed

    const formData = new FormData();
    const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
    formData.append('image', renamedFile);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://production.msmfclasses.com:8080/SchoolTesting/image/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    try {
      const response = await axios.request(config);
      //console.log('Response:', response.data);
      setUploadStatus('File uploaded successfully.');
      onSave(newFileName); // Pass the saved file name to the parent component
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('File upload failed.');
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: '640px', height: '480px', border: '1px solid black' }} />
      <button onClick={takePhoto}>Take Photo</button>
      {photo && <img src={photo} alt="Captured" style={{ display: 'block', margin: '20px auto', maxWidth: '100%', height: 'auto' }}/>}
      <button onClick={onSubmit}>Upload Photo</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

// Dummy function for generating new file names
const generateFileName = (originalName: string) => {
  const timestamp = Date.now();
  const fileExtension = originalName.split('.').pop();
  return `image_${timestamp}.${fileExtension}`;
};

export default WebcamComponent;
