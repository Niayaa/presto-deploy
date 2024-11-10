import './dashboard.css';
import React, { useState } from 'react';

const SlideEditor = () => {
  const [slides, setSlides] = useState([{ id: Date.now(), content: '' }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNewSlide = () => {
    setSlides([...slides, { id: Date.now(), content: '' }]);
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

  return (
    <div className="slide-editor">
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
      <div className="slide-content">
        <p>{slides[currentSlideIndex].content || "Empty Slide"}</p>
      </div>
    </div>
  );
};

export default SlideEditor;
