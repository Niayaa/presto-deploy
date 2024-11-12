import React from 'react';
import './sideBar.css';

const Sidebar = ({ onAddText, onAddImage, onAddVideo, onAddCode }) => {
  return (
    <div className="sidebar">
      <button onClick={onAddText}>Text</button>
      <button onClick={onAddImage}>Image</button>
      <button onClick={onAddVideo}>Video</button>
      <button onClick={onAddCode}>Code</button>
    </div>
  );
};

export default Sidebar;
