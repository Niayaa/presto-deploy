import React, { useState } from 'react';
import './dashboard.css';

const EditTitleModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave(title);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Title"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTitleModal;
