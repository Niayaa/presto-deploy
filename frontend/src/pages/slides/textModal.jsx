import React, { useState } from 'react';

const TextModal = ({ onSave, onClose, initialData }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [fontSize, setFontSize] = useState(initialData?.fontSize || 1);
  const [color, setColor] = useState(initialData?.color || '#000000');
  const [fontFamily, setFontFamily] = useState(initialData?.fontFamily || 'Arial');

  const handleSave = () => {
    onSave({ text, fontSize, color, fontFamily });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{initialData ? 'Edit Text Element' : 'Add Text Element'}</h3>

        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows="5" />

        <label>Font Size (em):</label>
        <input type="number" value={fontSize} onChange={(e) => setFontSize(parseFloat(e.target.value))} />

        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <label>Font Family:</label>
        <input type="text" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TextModal;
