import './dashboard.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../slides/sideBar';
import Slide from '../slides/slide';
import TextModal from '../slides/textModal';
import ImageModal from '../slides/imageModal';
import VideoModal from '../slides/videoModal';
import CodeModal from '../slides/codeModal';

const SlideEditor = ({ presentationId, apiEndpoint }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  // Fetch slides from the server
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiEndpoint}/presentations/${presentationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSlides(data.slides || [{ id: Date.now(), elements: [] }]);
        } else {
          console.error('Failed to fetch slides');
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, [presentationId, apiEndpoint]);

  // Save slides to the server
  const saveSlides = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedPresentation = {
        slides,
      };

      const response = await fetch(`${apiEndpoint}/presentations/${presentationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPresentation),
      });

      if (response.ok) {
        console.log('Slides saved successfully');
      } else {
        console.error('Failed to save slides');
      }
    } catch (error) {
      console.error('Error saving slides:', error);
    }
  };

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
      alert('Cannot delete the only slide. Delete the presentation instead.');
    }
  };

  const handleSaveElement = (data, type) => {
    const newSlides = [...slides];
    const currentSlide = newSlides[currentSlideIndex];

    if (editingElement) {
      currentSlide.elements = currentSlide.elements.map((el) =>
        el.id === editingElement.id ? { ...el, ...data } : el
      );
    } else {
      const newElement = { id: Date.now(), type, ...data };
      currentSlide.elements.push(newElement);
    }

    setSlides(newSlides);
    setEditingElement(null);
  };

  if (!slides.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slide-editor">
      <Sidebar
        onAddText={() => setIsTextModalOpen(true)}
        onAddImage={() => setIsImageModalOpen(true)}
        onAddVideo={() => setIsVideoModalOpen(true)}
        onAddCode={() => setIsCodeModalOpen(true)}
      />
      <button onClick={handleNewSlide}>New Slide</button>
      <button onClick={handleDeleteSlide}>Delete Slide</button>
      <button onClick={saveSlides}>Save Changes</button>
      <div className="slide-controls">
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          disabled={currentSlideIndex === 0}
        >
          Prev
        </button>
        <span>
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          disabled={currentSlideIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
      <Slide
        elements={slides[currentSlideIndex]?.elements || []}
        setElements={(updatedElements) => {
          const newSlides = [...slides];
          newSlides[currentSlideIndex].elements = updatedElements;
          setSlides(newSlides);
        }}
      />
      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'text')}
          onClose={() => setIsTextModalOpen(false)}
        />
      )}
      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'image')}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
      {isVideoModalOpen && (
        <VideoModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'video')}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
      {isCodeModalOpen && (
        <CodeModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'code')}
          onClose={() => setIsCodeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SlideEditor;

