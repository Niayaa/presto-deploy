import React, { useState, useEffect } from 'react';
import Sidebar from '../slides/sideBar';
import Slide from '../slides/slide';
import TextModal from '../slides/textModal';
import ImageModal from '../slides/imageModal';
import VideoModal from '../slides/videoModal';
import CodeModal from '../slides/codeModal';

const SlideEditor = ({ presentationId }) => {
  const [store, setStore] = useState({ presentations: [] });
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5005/store`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStore(data.store);

          const foundPresentation = data.store.presentations.find(
            (p) => p.id === Number(presentationId)
          );
          if (foundPresentation) {
            setPresentation(foundPresentation);
          }
        } else {
          console.error('Failed to fetch store');
        }
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    fetchStore();
  }, [presentationId]);

  const savePresentation = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedPresentation = {
        background: presentation.background || {},
        description: presentation.description || "",
        id: presentation.id,
        name: presentation.name || "Untitled",
        slides: presentation.slides.map(slide => ({
          id: slide.id,
          content: slide.content || '',
          elements: slide.elements || []
        })),
        thumbnail: presentation.thumbnail || null
      };

      const updatedStore = {
        ...store,
        presentations: store.presentations.map(p => 
          p.id === presentation.id ? updatedPresentation : p
        )
      };

      const response = await fetch(`http://localhost:5005/store`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ store: updatedStore }),
      });

      if (response.ok) {
        console.log('Presentation saved successfully');
        setStore(updatedStore);
      } else {
        console.error('Failed to save presentation');
      }
    } catch (error) {
      console.error('Error saving presentation:', error);
    }
  };

  const handleNewSlide = () => {
    const newSlide = { id: Date.now(), elements: [] };
    const newSlides = [...presentation.slides, newSlide];
    setPresentation((prev) => ({ ...prev, slides: newSlides }));
    setCurrentSlideIndex(newSlides.length - 1);
  };

  const handleDeleteSlide = () => {
    if (presentation.slides.length > 1) {
      const newSlides = presentation.slides.filter(
        (_, index) => index !== currentSlideIndex
      );
      setPresentation((prev) => ({ ...prev, slides: newSlides }));
      setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0));
    } else {
      alert('Cannot delete the only slide. Delete the presentation instead.');
    }
  };

  const handleSaveElement = (data, type, closeModal) => {
    if (currentSlideIndex < 0 || currentSlideIndex >= presentation.slides.length) {
      console.error('Invalid slide index');
      return;
    }

    const newElement = {
      id: Date.now(),
      type,
      ...data,
    };

    const updatedSlides = [...presentation.slides];
    if (!updatedSlides[currentSlideIndex].elements) {
      updatedSlides[currentSlideIndex].elements = [];
    }

    updatedSlides[currentSlideIndex].elements.push(newElement);

    setPresentation((prev) => ({
      ...prev,
      slides: updatedSlides,
    }));

    closeModal();
  };

  if (!presentation) {
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
      <button onClick={savePresentation}>Save Changes</button>
      <div className="slide-controls">
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          disabled={currentSlideIndex === 0}
        >
          Prev
        </button>
        <span>Slide {currentSlideIndex + 1} of {presentation.slides.length}</span>
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          disabled={currentSlideIndex === presentation.slides.length - 1}
        >
          Next
        </button>
      </div>
      <Slide
        elements={presentation.slides[currentSlideIndex]?.elements || []}
        setElements={(updatedElements) => {
          const newSlides = [...presentation.slides];
          newSlides[currentSlideIndex].elements = updatedElements;
          setPresentation((prev) => ({ ...prev, slides: newSlides }));
        }}
      />
      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'text', () => setIsTextModalOpen(false))}
          onClose={() => setIsTextModalOpen(false)}
        />
      )}
      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'image', () => setIsImageModalOpen(false))}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
      {isVideoModalOpen && (
        <VideoModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'video', () => setIsVideoModalOpen(false))}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
      {isCodeModalOpen && (
        <CodeModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'code', () => setIsCodeModalOpen(false))}
          onClose={() => setIsCodeModalOpen(false)}
        />
      )}
    </div>
  );  
};

export default SlideEditor;
