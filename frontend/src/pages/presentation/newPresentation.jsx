import React, { useState } from 'react';

function NewPresentationModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (title.trim()) onCreate(title);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Presentation</h2>
        <input
          type="text"
          placeholder="Enter presentation title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default NewPresentationModal;
