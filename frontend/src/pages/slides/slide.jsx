
import React from 'react';
import ElementEditor from './elementEditor';
import './slide.css';

const Slide = ({ elements, setElements, background }) => {
  return (
    <div
      className="slide-container"
      style={{
        background: background.type === 'color' ? background.color
          : background.type === 'gradient' ? `linear-gradient(to right, ${background.gradient[0]}, ${background.gradient[1]})`
          : background.type === 'image' ? `url(${background.image}) no-repeat center/cover`
          : 'white',
      }}
    >
      <div className="slide">
        <ElementEditor elements={elements} setElements={setElements} />
      </div>
    </div>
  );
};

export default Slide;