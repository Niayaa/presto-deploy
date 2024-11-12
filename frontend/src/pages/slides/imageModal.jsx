import React, { useState } from 'react';
import './imageModal.css';

const ImageModal = ({ onSave, onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.src || '');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(initialData?.alt || '');
  const [width, setWidth] = useState(initialData?.width || 30);
  const [height, setHeight] = useState(initialData?.height || 20);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {
    const imageSrc = file || url;
    onSave({ src: imageSrc, alt: description, width, height });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{initialData ? 'Edit Image Element' : 'Add Image Element'}</h3>

        <label>Image URL:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setFile(null);
          }}
        />

        <label>Or Upload File:</label>
        <input type="file" onChange={handleFileChange} />

        <label>Description (alt text):</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Width (%):</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value))}
          min="1" max="100"
        />

        <label>Height (%):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
          min="1" max="100"
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ImageModal;
