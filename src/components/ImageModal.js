// // src/components/ImageModal.js
// import React, { useEffect } from 'react';
// import './ImageModal.css';

// const ImageModal = ({ url, onClose, onPrevious, onNext, showPrev, showNext }) => {
//   let touchStartX = 0;
//   let touchEndX = 0;

//   const handleTouchStart = (e) => {
//     touchStartX = e.touches[0].clientX; // Get the starting touch position
//   };

//   const handleTouchMove = (e) => {
//     touchEndX = e.touches[0].clientX; // Get the moving touch position
//   };

//   const handleTouchEnd = () => {
//     if (touchStartX > touchEndX + 50 && showNext) {
//       // Swipe left
//       onNext();
//     } else if (touchStartX < touchEndX - 50 && showPrev) {
//       // Swipe right
//       onPrevious();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'ArrowLeft' && showPrev) {
//         onPrevious();
//       } else if (event.key === 'ArrowRight' && showNext) {
//         onNext();
//       } else if (event.key === 'Escape') {
//         onClose(); // Close the modal when Escape is pressed
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     // Clean up event listener on unmount
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onPrevious, onNext, onClose, showPrev, showNext]);

//   if (!url) return null;

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div 
//         className="modal-content" 
//         onClick={(e) => e.stopPropagation()}
//         onTouchStart={handleTouchStart} // Start touch event
//         onTouchMove={handleTouchMove} // Move touch event
//         onTouchEnd={handleTouchEnd} // End touch event
//       >
//         <span className="close-button" onClick={onClose}>&times;</span>

//         {showPrev && (
//           <button className="nav-button prev-button" onClick={onPrevious}>
//             &#10094;
//           </button>
//         )}

//         <img src={url} alt="Enlarged" className="modal-image" />

//         {showNext && (
//           <button className="nav-button next-button" onClick={onNext}>
//             &#10095;
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageModal;
