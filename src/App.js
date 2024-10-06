import React, { useState } from "react";
import UploadImage from "./components/UploadImage";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">#PAVMOL</div>
        <div className="nav-center">SHARE YOUR MEMORIES</div>
      </nav>
      <h2 className="welcome-text">WELCOME TO THE WEDDING GALLERY </h2>
      <UploadImage />
      <ImageGallery onImageClick={handleImageClick} />

      {/* Modal for displaying large images */}
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedImage} alt="" className="large-image" />
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          MADE WITH LOVE FOR MY SISTER BY TASHNEET &nbsp; 
          <span role="img" aria-label="heart">🤍</span>
        </p>
        <div className="circle" onClick={() => handleImageClick('/images/myImage.jpg')}>
  <img src="/images/myImage.jpg" alt="Profile of Tashneet" />
</div>

      </footer>
    </div>
  );
}

export default App;
