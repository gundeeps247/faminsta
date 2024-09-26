import React from "react";
import UploadImage from "./components/UploadImage";
import ImageGallery from "./components/ImageGallery";
import "./App.css"

function App() {
  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <UploadImage />
      <ImageGallery />
    </div>
  );
}

export default App;
