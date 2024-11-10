import './dashboard.css';
import React, { useState } from 'react';
import Sidebar from '../slides/sidebar';
import Slide from '../slides/slide';

const SlideEditor = () => {
  const [slides, setSlides] = useState([{ id: Date.now(), elements: [] }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNewSlide = () => {
    setSlides([...slides, { id: Date.now(), elements: [] }]);
    setCurrentSlideIndex(slides.length);
  };

  const handleDeleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, index) => index !== currentSlideIndex);
      setSlides(newSlides);
      setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      alert("Cannot delete the only slide. Delete the presentation instead.");
    }
  };

  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      text: 'New Text',
      width: 30,
      height: 10,
      fontSize: 1,
      color: '#000000',
      x: 0,
      y: 0,
    };

    const newSlides = [...slides];
    newSlides[currentSlideIndex].elements = [
      ...newSlides[currentSlideIndex].elements,
      newElement,
    ];
    setSlides(newSlides);
  };

  return (
    <div className="slide-editor">
      <Sidebar onAddText={addTextElement} />
      <button onClick={handleNewSlide}>New Slide</button>
      <button onClick={handleDeleteSlide}>Delete Slide</button>
      <div className="slide-controls">
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          disabled={currentSlideIndex === 0}
        >
          Prev
        </button>
        <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          disabled={currentSlideIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
      <Slide
        elements={slides[currentSlideIndex].elements}
        setElements={(updatedElements) => {
          const newSlides = [...slides];
          newSlides[currentSlideIndex].elements = updatedElements;
          setSlides(newSlides);
        }}
      />
    </div>
  );
};

export default SlideEditor;
