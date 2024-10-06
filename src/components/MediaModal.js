import React, { useState, useEffect } from 'react';
import './MediaModal.css';

const MediaModal = ({ media, isVideo, onClose, onPrevious, onNext, showPrev, showNext }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Function to handle zooming
  const handleZoom = (e) => {
    if (e.deltaY > 0) setZoomLevel((prev) => Math.max(prev - 0.1, 1));
    else setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  };

  // Function to handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && showNext) {
      onNext(); // Swipe left to show next
    } else if (distance < -minSwipeDistance && showPrev) {
      onPrevious(); // Swipe right to show previous
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && showNext) onNext();
      if (e.key === 'ArrowLeft' && showPrev) onPrevious();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showNext, showPrev, onNext, onPrevious, onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>

        <div
          className="media-container"
          onWheel={handleZoom}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isVideo ? (
            <video
              className="modal-video"
              controls
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <source src={media.url} type="video/mp4" />
            </video>
          ) : (
            <img
              className="modal-image"
              src={media.url}
              alt="Modal"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          )}
        </div>

        <div className="navigation-controls">
          {showPrev && <button className="nav-button left" onClick={onPrevious}>&larr;</button>}
          {showNext && <button className="nav-button right" onClick={onNext}>&rarr;</button>}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
