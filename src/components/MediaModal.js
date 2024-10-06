import React from 'react';
import './MediaModal.css';

const MediaModal = ({ url, isVideo, onClose, onPrevious, onNext, showPrev, showNext }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>

        {isVideo ? (
          <div className="video-container">
            <video src={url} controls autoPlay className="modal-video" />
          </div>
        ) : (
          <img src={url} alt="Enlarged" className="modal-image" />
        )}

        <div className="modal-controls">
          {showPrev && <button className="nav-button prev-button" onClick={onPrevious}>&#10094;</button>}
          {showNext && <button className="nav-button next-button" onClick={onNext}>&#10095;</button>}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
