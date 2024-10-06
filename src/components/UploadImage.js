import React, { useState } from 'react';
import { storage } from '../firebaseConfig'; // Import your Firebase storage configuration
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './Upload.css';

const UploadMemory = () => {
  const [files, setFiles] = useState([]);
  const [mediaUrl, setMediaUrl] = useState(null); // For storing the clicked media's URL
  const [isVideo, setIsVideo] = useState(false);  // To check if it's video
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = () => {
    Array.from(files).forEach((file) => {
      const storageRef = ref(storage, `memories/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring code if needed
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          // Upload complete, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    });
  };

  // Function to open modal with the correct media type
  const openModal = (url, isVideo) => {
    setMediaUrl(url);
    setIsVideo(isVideo);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setMediaUrl(null);
  };

  return (
    <div className="upload-container">
      <h2>Share Memories</h2>

      {/* File Input */}
      <label htmlFor="file-upload" className="file-upload-label">
        Share memories
      </label>
      <input
        type="file"
        id="file-upload"
        multiple
        onChange={handleFileChange}
        className="file-upload-input"
      />

      {/* Upload Button */}
      <button onClick={handleUpload} className="upload-button">
        Share
      </button>

      {/* Uploaded media preview (photos/videos) */}
      <div className="media-gallery">
        {files &&
          Array.from(files).map((file, index) => {
            const fileURL = URL.createObjectURL(file);
            const isVideoFile = file.type.startsWith('video');

            return isVideoFile ? (
              <video
                key={index}
                src={fileURL}
                onClick={() => openModal(fileURL, true)} // Open modal for video
                className="media-item"
                controls
              />
            ) : (
              <img
                key={index}
                src={fileURL}
                onClick={() => openModal(fileURL, false)} // Open modal for image
                alt="memory"
                className="media-item"
              />
            );
          })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            {isVideo ? (
              <video src={mediaUrl} className="modal-media" controls autoPlay />
            ) : (
              <img src={mediaUrl} alt="memory" className="modal-media" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMemory;
