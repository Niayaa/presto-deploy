import './dashboard.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../slides/sideBar';
import Slide from '../slides/slide';
import TextModal from '../slides/textModal';
import ImageModal from '../slides/imageModal';
import VideoModal from '../slides/videoModal';
import CodeModal from '../slides/codeModal';

const SlideEditor = ({ presentationId }) => {
  const [presentation, setPresentation] = useState({
    slides: [],
    thumbnail: '',
    name: 'Untitled Presentation',
    description: '',
    contents: [],
  });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  // 组件挂载时从服务器获取 `presentation` 数据
  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5005/store`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          const foundPresentation = data.store.presentations.find(p => p.id === presentationId);
          if (foundPresentation) {
            setPresentation(foundPresentation);
          } else {
            console.warn(`Presentation with ID ${presentationId} not found.`);
          }
        } else {
          console.error('Failed to fetch presentation');
        }
      } catch (error) {
        console.error('Error fetching presentation:', error);
      }
    };

    fetchPresentation();
  }, [presentationId]);

  // 将本地 `presentation` 数据保存到服务器
  const savePresentation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5005/store`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ store: { presentations: [presentation] } })
      });

      if (!response.ok) {
        console.error('Failed to save presentation');
      } else {
        console.log('Presentation saved successfully');
      }
    } catch (error) {
      console.error('Error saving presentation:', error);
    }
  };

  const handleNewSlide = () => {
    const newSlides = [...presentation.slides, { id: Date.now(), elements: [] }];
    setPresentation(prev => ({ ...prev, slides: newSlides }));
    setCurrentSlideIndex(newSlides.length - 1);
  };

  const handleDeleteSlide = () => {
    if (presentation.slides.length > 1) {
      const newSlides = presentation.slides.filter((_, index) => index !== currentSlideIndex);
      setPresentation(prev => ({ ...prev, slides: newSlides }));
      setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0));
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

  const handleSaveElement = (data, type, closeModal) => {
    const newElement = editingElement
      ? { ...editingElement, ...data }
      : { id: Date.now(), type, ...data };

    const newSlides = [...presentation.slides];
    newSlides[currentSlideIndex].elements = editingElement
      ? newSlides[currentSlideIndex].elements.map(el => el.id === editingElement.id ? newElement : el)
      : [...newSlides[currentSlideIndex].elements, newElement];

    setPresentation(prev => ({ ...prev, slides: newSlides }));
    closeModal(false);
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
        <span>Slide {currentSlideIndex + 1} of {presentation.slides.length}</span>
        <button
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          disabled={currentSlideIndex === presentation.slides.length - 1}
        >
          Next
        </button>
      </div>
      
      {/* Save Button to Upload Changes */}
      <button onClick={savePresentation} className="save-button">
        Save Changes
      </button>
      
      <Slide
        elements={presentation.slides[currentSlideIndex]?.elements || []}
        setElements={(updatedElements) => {
          const newSlides = [...presentation.slides];
          newSlides[currentSlideIndex].elements = updatedElements;
          setPresentation(prev => ({ ...prev, slides: newSlides }));
        }}
      />

      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'text', setIsTextModalOpen)}
          onClose={() => setIsTextModalOpen(false)}
        />
      )}

      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'image', setIsImageModalOpen)}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}

      {isVideoModalOpen && (
        <VideoModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'video', setIsVideoModalOpen)}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}

      {isCodeModalOpen && (
        <CodeModal
          initialData={editingElement}
          onSave={(data) => handleSaveElement(data, 'code', setIsCodeModalOpen)}
          onClose={() => setIsCodeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SlideEditor;
