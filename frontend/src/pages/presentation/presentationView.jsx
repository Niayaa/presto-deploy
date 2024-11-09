import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PresentationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState(['Slide 1']);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addSlide = () => {
    setSlides([...slides, `Slide ${slides.length + 1}`]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length === 1) {
      alert("Cannot delete the last slide. Delete the presentation instead.");
      return;
    }
    const updatedSlides = slides.filter((_, i) => i !== currentSlide);
    setSlides(updatedSlides);
    setCurrentSlide(Math.max(currentSlide - 1, 0));
  };

  return (
    <div className="presentation-view">
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Presentation {id}</h2>

      <div className="slide-viewer">
        <div>{slides[currentSlide]}</div>
        <div>Slide {currentSlide + 1} of {slides.length}</div>
      </div>

      <button onClick={addSlide}>Add Slide</button>
      <button onClick={deleteSlide}>Delete Slide</button>

      <div className="navigation">
        <button
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide(currentSlide - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentSlide === slides.length - 1}
          onClick={() => setCurrentSlide(currentSlide + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PresentationView;
