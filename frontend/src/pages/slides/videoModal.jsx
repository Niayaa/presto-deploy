import React, { useState } from 'react';

const VideoModal = ({ onSave, onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.url || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [width, setWidth] = useState(initialData?.width || 50);
  const [height, setHeight] = useState(initialData?.height || 30);
  const [autoPlay, setAutoPlay] = useState(initialData?.autoPlay || false);

  const handleSave = () => {
    // Ensure the URL is in the correct embed format
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
      onSave({ url: embedUrl, description, width, height, autoPlay });
    } else if (url.includes('youtube.com/embed/')) {
      onSave({ url: `${url}${autoPlay ? '?autoplay=1' : ''}`, description, width, height, autoPlay });
    } else {
      alert('Please enter a valid YouTube URL.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Video Element</h3>
        
        <label>Video URL:</label>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
        />

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
        />

        <label>Height (%):</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(parseFloat(e.target.value))} 
        />

        <label>
          <input 
            type="checkbox" 
            checked={autoPlay} 
            onChange={(e) => setAutoPlay(e.target.checked)} 
          />
          Auto-play
        </label>

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default VideoModal;
