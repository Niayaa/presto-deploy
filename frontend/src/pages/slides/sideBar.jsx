
import React from 'react';
import './sideBar.css';

const Sidebar = ({ onAddText, onAddImage, onAddVideo, onAddCode }) => {
  return (
    <div className="sidebar">
      <button onClick={onAddText}>Add Text</button>
      <button onClick={onAddImage}>Add Image</button>
      <button onClick={onAddVideo}>Add Video</button>
      <button onClick={onAddCode}>Add Code</button>
    </div>
  );
};

export default Sidebar;
