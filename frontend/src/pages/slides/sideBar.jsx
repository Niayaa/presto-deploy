import React from 'react';
import './sideBar.css';

const Sidebar = ({ onAddText }) => {
  return (
    <div className="sidebar">
      <button onClick={onAddText}>Text</button>
    </div>
  );
};

export default Sidebar;
