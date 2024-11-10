import React, { useState } from 'react';
import './dashboard.css';

const NewPresentationModal = ({ onCreate, onClose }) => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    onCreate(name);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Presentation</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Presentation Name"
        />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPresentationModal;
