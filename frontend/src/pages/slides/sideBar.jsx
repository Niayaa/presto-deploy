import React from 'react';
import './sideBar.css';

const Sidebar = ({ onAddText, onAddImage }) => {
  return (
    <div className="sidebar">
      <button onClick={onAddText}>Text</button>
      <button onClick={onAddImage}>Image</button>
    </div>
  );
};

export default Sidebar;
