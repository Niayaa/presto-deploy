import React, { useState } from 'react';

const CodeModal = ({ initialData, onSave, onClose }) => {
  const [code, setCode] = useState(initialData?.code || '');
  const [width, setWidth] = useState(initialData?.width || 50);
  const [height, setHeight] = useState(initialData?.height || 30);
  const [fontSize, setFontSize] = useState(initialData?.fontSize || 1);

  const handleSave = () => {
    onSave({ code, width, height, fontSize });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{initialData ? 'Edit Code Block' : 'Add Code Block'}</h3>
        
        <label>Code:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="5"
          style={{ fontFamily: 'monospace' }}
        />

        <label>Width (%):</label>
        <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} />

        <label>Height (%):</label>
        <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} />

        <label>Font Size (em):</label>
        <input type="number" value={fontSize} onChange={(e) => setFontSize(parseFloat(e.target.value))} />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CodeModal;
