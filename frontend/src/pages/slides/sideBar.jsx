import React from 'react';
import './sideBar.css';

const Sidebar = ({ onAddText, onAddImage, onAddVideo }) => {
  return (
    <div className="sidebar">
      <button onClick={onAddText}>Text</button>
      <button onClick={onAddImage}>Image</button>
      <button onClick={onAddVideo}>Video</button>
    </div>
  );
};

export default Sidebar;
