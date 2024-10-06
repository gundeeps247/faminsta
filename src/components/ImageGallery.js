import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import MediaModal from './MediaModal';
import './ImageGallery.css';

const ImageGallery = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchMediaFiles = async () => {
      const storageRef = ref(storage, 'images/');
      const res = await listAll(storageRef);
      
      const mediaUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name };
        })
      );

      const sortedMedia = mediaUrls.sort((a, b) => {
        const timestampA = parseInt(a.name.split('_')[0], 10);
        const timestampB = parseInt(b.name.split('_')[0], 10);
        return timestampB - timestampA;
      });

      setMediaFiles(sortedMedia);
    };

    fetchMediaFiles();
  }, []);

  const openMediaModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const showNext = () => {
    if (selectedIndex < mediaFiles.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  const handleDownload = (url, fileName) => {
    const a = document.createElement('a');
    a.href = url;

    // Automatically determine the file extension based on the media type
    const fileExtension = url.split('.').pop();
    const name = fileName ? fileName : `download.${fileExtension}`; // Use the file name or set a default

    a.download = name; // Set the file name for the download
    a.click();
  };

  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {mediaFiles.map((media, index) => (
          <div className="gallery-item" key={index}>
            {media.name.endsWith('.mp4') || media.name.endsWith('.mov') ? (
              <video src={media.url} controls width="100%" height="100%">
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img src={media.url} alt={`Uploaded ${index}`} onClick={() => openMediaModal(index)} />
                <div className="dots-menu">
                  <span className="dots-icon">&#8942;</span>
                  <div className="dots-dropdown">
                    <button onClick={() => handleDownload(media.url, media.name)}>Download</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <MediaModal
          url={mediaFiles[selectedIndex].url}
          isVideo={mediaFiles[selectedIndex].name.endsWith('.mp4') || mediaFiles[selectedIndex].name.endsWith('.mov')}
          onClose={closeModal}
          onPrevious={showPrevious}
          onNext={showNext}
          showPrev={selectedIndex > 0}
          showNext={selectedIndex < mediaFiles.length - 1}
        />
      )}
    </div>
  );
};

export default ImageGallery;
