import React, { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadImage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);

  const handleChange = (e) => {
    if (e.target.files) {
      // Save the selected files in state
      setFiles([...e.target.files]);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    const newProgress = Array(files.length).fill(0);
    setProgress(newProgress);

    files.forEach((file, index) => {
      // Generate a unique file name with a timestamp to maintain the order
      const timestamp = Date.now();
      const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          const updatedProgress = [...progress];
          updatedProgress[index] = prog;
          setProgress(updatedProgress);
        },
        (error) => {
          console.error('Upload error:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(`File ${file.name} uploaded! URL: ${url}`);
          });
        }
      );
    });
  };

  return (
    <div>
      <h2>Upload Multiple Files (Images and Videos)</h2>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload All</button>
      <br />
      {progress.map((prog, index) => (
        <div key={index}>
          <p>{`File ${index + 1} progress: ${prog}%`}</p>
          <progress value={prog} max="100" />
        </div>
      ))}
    </div>
  );
};

export default UploadImage;
