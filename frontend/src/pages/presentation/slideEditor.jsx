import './dashboard.css';
import React, { useState } from 'react';
import Sidebar from '../slides/sideBar';
import Slide from '../slides/slide';
import TextModal from '../slides/textModal';
import ImageModal from '../slides/imageModal';
import VideoModal from '../slides/videoModal';
import CodeModal from '../slides/codeModal';

const SlideEditor = () => {
  const [slides, setSlides] = useState([{ id: Date.now(), elements: [] }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

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
    setEditingElement(null);
    setIsTextModalOpen(true);
  };

  const addImageElement = () => {
    setEditingElement(null);
    setIsImageModalOpen(true);
  };

  const addVideoElement = () => {
    setEditingElement(null);
    setIsVideoModalOpen(true);
  };

  const addCodeElement = () => {
    setEditingElement(null);
    setIsCodeModalOpen(true);
  };

  const handleSaveText = (data) => {
    const newSlides = [...slides];
    if (editingElement) {
      newSlides[currentSlideIndex].elements = newSlides[currentSlideIndex].elements.map(el =>
        el.id === editingElement.id ? { ...el, ...data } : el
      );
    } else {
      const newElement = { id: Date.now(), type: 'text', ...data };
      newSlides[currentSlideIndex].elements.push(newElement);
    }
    setSlides(newSlides);
    setIsTextModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveImage = (data) => {
    const newSlides = [...slides];
    if (editingElement) {
      newSlides[currentSlideIndex].elements = newSlides[currentSlideIndex].elements.map(el =>
        el.id === editingElement.id ? { ...el, ...data } : el
      );
    } else {
      const newElement = { id: Date.now(), type: 'image', ...data };
      newSlides[currentSlideIndex].elements.push(newElement);
    }
    setSlides(newSlides);
    setIsImageModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveVideo = (data) => {
    const newSlides = [...slides];
    const newElement = editingElement ? 
      { ...editingElement, ...data } : 
      { id: Date.now(), type: 'video', ...data };
    newSlides[currentSlideIndex].elements = editingElement ? 
      newSlides[currentSlideIndex].elements.map(el => el.id === editingElement.id ? newElement : el) :
      [...newSlides[currentSlideIndex].elements, newElement];
    setSlides(newSlides);
    setIsVideoModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveCode = (data) => {
    const newSlides = [...slides];
    const newElement = editingElement ? 
      { ...editingElement, ...data } : 
      { id: Date.now(), type: 'code', ...data };
    newSlides[currentSlideIndex].elements = editingElement ? 
      newSlides[currentSlideIndex].elements.map(el => el.id === editingElement.id ? newElement : el) :
      [...newSlides[currentSlideIndex].elements, newElement];
    setSlides(newSlides);
    setIsCodeModalOpen(false);
    setEditingElement(null);
  };


  return (
    <div className="slide-editor">
      <Sidebar 
        onAddText={addTextElement} 
        onAddImage={addImageElement} 
        onAddVideo={addVideoElement} 
        onAddCode={addCodeElement}
      />
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

      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={handleSaveText}
          onClose={() => setIsTextModalOpen(false)}
        />
      )}

      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={handleSaveImage}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}

      {isVideoModalOpen && (
        <VideoModal
          initialData={editingElement}
          onSave={handleSaveVideo}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}

      {isCodeModalOpen && (
        <CodeModal
          initialData={editingElement}
          onSave={handleSaveCode}
          onClose={() => setIsCodeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SlideEditor;
