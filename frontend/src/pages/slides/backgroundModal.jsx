import React, { useState } from 'react';
import './backgroundModal.css';

const BackgroundModal = ({ currentBackground, onSave, onClose }) => {
  const [backgroundType, setBackgroundType] = useState(currentBackground.type || 'color');
  const [color, setColor] = useState(currentBackground.color || '#ffffff');
  const [gradient, setGradient] = useState(currentBackground.gradient || ['#ffffff', '#000000']);
  const [gradientDirection, setGradientDirection] = useState('to right'); // Default gradient direction
  const [image, setImage] = useState(currentBackground.image || '');

  const handleSave = () => {
    const newBackground = { type: backgroundType };
    if (backgroundType === 'color') {
      newBackground.color = color;
    } else if (backgroundType === 'gradient') {
      newBackground.gradient = gradient;
      newBackground.direction = gradientDirection;
    } else if (backgroundType === 'image') {
      newBackground.image = image;
    }
    onSave(newBackground);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Background Picker</h3>

        {/* Solid Color Option */}
        <div>
          <label>
            <input
              type="radio"
              value="color"
              checked={backgroundType === 'color'}
              onChange={() => setBackgroundType('color')}
            />
            Solid Color
          </label>
          {backgroundType === 'color' && (
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          )}
        </div>

        {/* Gradient Option */}
        <div>
          <label>
            <input
              type="radio"
              value="gradient"
              checked={backgroundType === 'gradient'}
              onChange={() => setBackgroundType('gradient')}
            />
            Gradient
          </label>
          {backgroundType === 'gradient' && (
            <div>
              <label>Start Color:</label>
              <input
                type="color"
                value={gradient[0]}
                onChange={(e) => setGradient([e.target.value, gradient[1]])}
              />
              <label>End Color:</label>
              <input
                type="color"
                value={gradient[1]}
                onChange={(e) => setGradient([gradient[0], e.target.value])}
              />
              <label>Direction:</label>
              <select
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value)}
              >
                <option value="to right">Left to Right</option>
                <option value="to bottom">Top to Bottom</option>
                <option value="to left">Right to Left</option>
                <option value="to top">Bottom to Top</option>
              </select>
            </div>
          )}
        </div>

        {/* Image Option */}
        <div>
          <label>
            <input
              type="radio"
              value="image"
              checked={backgroundType === 'image'}
              onChange={() => setBackgroundType('image')}
            />
            Image
          </label>
          {backgroundType === 'image' && (
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
            />
          )}
        </div>

        {/* Modal Actions */}
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundModal;
