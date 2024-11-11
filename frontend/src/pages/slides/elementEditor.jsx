import React, { useState } from 'react';
import TextModal from './textModal';
import ImageModal from './imageModal';
import VideoModal from './videoModal';

const ElementEditor = ({ elements, setElements }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const openTextModal = (element = null) => {
    setEditingElement(element);
    setIsTextModalOpen(true);
  };

  const openImageModal = (element = null) => {
    setEditingElement(element);
    setIsImageModalOpen(true);
  };

  const openVideoModal = (element = null) => {
    setEditingElement(element);
    setIsVideoModalOpen(true);
  };

  const handleSaveText = (data) => {
    if (editingElement) {
      setElements(elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el));
    } else {
      setElements([...elements, { ...data, id: Date.now(), type: 'text' }]);
    }
    setIsTextModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveImage = (data) => {
    if (editingElement) {
      setElements(elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el));
    } else {
      setElements([...elements, { ...data, id: Date.now(), type: 'image' }]);
    }
    setIsImageModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveVideo = (data) => {
    if (editingElement) {
      setElements(elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el));
    } else {
      setElements([...elements, { ...data, id: Date.now(), type: 'video' }]);
    }
    setIsVideoModalOpen(false);
    setEditingElement(null);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {elements.map(el => (
        <div
        key={el.id}
        style={{
          position: 'absolute',
          top: `${el.y}%`,
          left: `${el.x}%`,
          width: `${el.width}%`,
          height: `${el.height}%`,
          cursor: 'pointer',
          border: el.type === 'text' ? '1px solid #ccc' : 'none',
          fontSize: el.type === 'text' ? `${el.fontSize}em` : 'inherit',
          color: el.type === 'text' ? el.color : 'inherit',
          overflow: 'hidden'
          }}
          onDoubleClick={() => {
            if (el.type === 'text') openTextModal(el);
            else if (el.type === 'image') openImageModal(el);
            else if (el.type === 'video') openVideoModal(el);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            deleteElement(el.id);
          }}
        >
          {el.type === 'text' && el.text}
          {el.type === 'image' && el.src && (
            <img src={el.src} alt={el.alt || 'Image'} style={{ width: '100%', height: '100%' }} />
          )}
          {el.type === 'video' && el.url && (
            <div style={{ width: '100%', height: '100%' }}>
              <iframe
                src={el.url}
                title={el.description || "Video"}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
              />
            </div>
          )}
        </div>
      ))}
      
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
    </div>
  );
};

export default ElementEditor;
