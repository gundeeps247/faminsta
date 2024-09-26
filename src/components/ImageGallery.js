import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import ImageModal from './ImageModal';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, 'images/');
      const res = await listAll(storageRef);
      
      // Fetch URLs with filenames
      const imageUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name };
        })
      );

      // Sort the images by timestamp extracted from the filename (timestamps are at the start)
      const sortedImages = imageUrls.sort((a, b) => {
        const timestampA = parseInt(a.name.split('_')[0], 10);
        const timestampB = parseInt(b.name.split('_')[0], 10);
        return timestampB - timestampA; // Descending order (most recent first)
      });

      setImages(sortedImages);
    };

    fetchImages();
  }, []);

  const openImageModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const showNext = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            className="gallery-item"
            key={index}
            onClick={() => openImageModal(index)}
          >
            <img src={image.url} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ImageModal
          url={images[selectedIndex].url}
          onClose={closeModal}
          onPrevious={showPrevious}
          onNext={showNext}
          showPrev={selectedIndex > 0}
          showNext={selectedIndex < images.length - 1}
        />
      )}
    </div>
  );
};

export default ImageGallery;
