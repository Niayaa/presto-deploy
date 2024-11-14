import React, { useState } from 'react';
import './textModal.css';

const TextModal = ({ onSave, onClose, initialData }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [width, setWidth] = useState(initialData?.width || 30);
  const [height, setHeight] = useState(initialData?.height || 10);
  const [fontSize, setFontSize] = useState(initialData?.fontSize || 1);
  const [color, setColor] = useState(initialData?.color || '#000000');
  const [x, setX] = useState(initialData?.x || 0);
  const [y, setY] = useState(initialData?.y || 0);

  const handleSave = () => {
    onSave({ text, width, height, fontSize, color, x, y });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{initialData ? 'Edit Text Element' : 'Add Text Element'}</h3>
        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />

        <label>Width (%):</label>
        <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} />

        <label>Height (%):</label>
        <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} />

        <label>Font Size (em):</label>
        <input type="number" value={fontSize} onChange={(e) => setFontSize(parseFloat(e.target.value))} />

        <label>Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <label>X Position (%):</label>
        <input type="number" value={x} onChange={(e) => setX(parseFloat(e.target.value))} />

        <label>Y Position (%):</label>
        <input type="number" value={y} onChange={(e) => setY(parseFloat(e.target.value))} />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TextModal;