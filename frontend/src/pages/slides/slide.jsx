import React from 'react';
import ElementEditor from './elementEditor';
import './slide.css';

const Slide = ({ elements, setElements }) => {
  return (
    <div className="slide-container">
      <div className="slide">
        <ElementEditor elements={elements} setElements={setElements} />
      </div>
    </div>
  );
};

export default Slide;
