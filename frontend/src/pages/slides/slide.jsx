import React from 'react';
import ElementEditor from './elementEditor';
import './slide.css';

const Slide = ({ elements, setElements, background }) => {
  const getBackgroundStyle = () => {
    if (!background) return { backgroundColor: 'white' };

    switch (background.type) {
      case 'color':
        return { backgroundColor: background.color };
      case 'gradient':
        return {
          backgroundImage: `linear-gradient(${background.direction}, ${background.gradient[0]}, ${background.gradient[1]})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${background.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      default:
        return { backgroundColor: 'white' };
    }
  };

  return (
    <div className="slide-container" style={getBackgroundStyle()}>
      <div className="slide">
        <ElementEditor elements={elements} setElements={setElements} />
      </div>
    </div>
  );
};

export default Slide;
