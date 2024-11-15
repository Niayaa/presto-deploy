import React, { useState, useEffect } from 'react';
import Sidebar from '../slides/sideBar';
import Slide from '../slides/slide';
import TextModal from '../slides/textModal';
import ImageModal from '../slides/imageModal';
import VideoModal from '../slides/videoModal';
import CodeModal from '../slides/codeModal';
import BackgroundModal from '../slides/backgroundModal';

const SlideEditor = ({ presentationId }) => {
  const [store, setStore] = useState({ presentations: [] });
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
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
      const updatedPresentations = store.presentations.map((p) =>
        p.id === Number(presentationId) ? presentation : p
      );

      const updatedStore = { ...store, presentations: updatedPresentations };

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
    const newSlides = [...presentation.slides, { id: Date.now(), elements: [] }];
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

  const openPreview = () => {
    const previewWindow = window.open('', '_blank');
    const previewContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
          }
          .slide-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            background-color: #f4f4f9;
          }
          .slide {
            width: 90%;
            height: 80%;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          .controls {
            position: fixed;
            bottom: 20px;
            width: 100%;
            text-align: center;
          }
          .controls button {
            margin: 0 10px;
            padding: 10px 20px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div id="app"></div>
        <script>
          let currentSlideIndex = 0;
          const slides = ${JSON.stringify(presentation.slides)};

          function renderSlide(index) {
            const app = document.getElementById('app');
            app.innerHTML = '';
            const slideContainer = document.createElement('div');
            slideContainer.className = 'slide-container';

            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = slides[index].elements
              .map(el => el.type === 'text' ? '<div>' + el.text + '</div>' : '')
              .join('');

            slideContainer.appendChild(slide);
            app.appendChild(slideContainer);

            const controls = document.createElement('div');
            controls.className = 'controls';

            const prevButton = document.createElement('button');
            prevButton.innerText = 'Previous';
            prevButton.disabled = index === 0;
            prevButton.onclick = () => renderSlide(index - 1);
            controls.appendChild(prevButton);

            const nextButton = document.createElement('button');
            nextButton.innerText = 'Next';
            nextButton.disabled = index === slides.length - 1;
            nextButton.onclick = () => renderSlide(index + 1);
            controls.appendChild(nextButton);

            const slideNumber = document.createElement('span');
            slideNumber.innerText = \`Slide \${index + 1} of \${slides.length}\`;
            controls.appendChild(slideNumber);

            document.body.appendChild(controls);
          }

          renderSlide(currentSlideIndex);
        </script>
      </body>
      </html>
    `;
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
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
      <button onClick={openPreview}>Preview</button>
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

      {isBackgroundModalOpen && (
        <BackgroundModal
          currentBackground={presentation.background || {}}
          onSave={(newBackground) => {
            const updatedSlides = [...presentation.slides];
            updatedSlides[currentSlideIndex].background = newBackground;
            setPresentation((prev) => ({ ...prev, slides: updatedSlides }));
          }}
          onClose={() => setIsBackgroundModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SlideEditor;
