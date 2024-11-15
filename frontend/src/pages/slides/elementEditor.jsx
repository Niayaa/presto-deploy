import React, { useState } from 'react';
import TextModal from './textModal';
import ImageModal from './imageModal';
import VideoModal from './videoModal';
import CodeModal from './codeModal';

const ElementEditor = ({ elements, setElements }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const openModal = (element, type) => {
    setEditingElement(element);
    if (type === 'text') setIsTextModalOpen(true);
    else if (type === 'image') setIsImageModalOpen(true);
    else if (type === 'video') setIsVideoModalOpen(true);
    else if (type === 'code') setIsCodeModalOpen(true);
  };

  const handleSave = (data, type) => {
    const updatedElements = elements.map(el => 
      el.id === editingElement.id ? { ...el, ...data, type } : el
    );
    setElements(updatedElements);
    closeModal();
  };

  const closeModal = () => {
    setIsTextModalOpen(false);
    setIsImageModalOpen(false);
    setIsVideoModalOpen(false);
    setIsCodeModalOpen(false);
    setEditingElement(null);
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
            fontSize: el.type === 'text' ? `${el.fontSize}em` : 'inherit',
            color: el.type === 'text' ? el.color : 'inherit',
            fontFamily: el.type === 'text' ? el.fontFamily : 'inherit',
            overflow: 'hidden',
            border: '1px solid #ccc',
          }}
          onDoubleClick={() => openModal(el, el.type)}
        >
          {el.type === 'text' && el.text}
        </div>
      ))}

      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={(data) => handleSave(data, 'text')}
          onClose={closeModal}
        />
      )}
      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={(data) => handleSave(data, 'image')}
          onClose={closeModal}
        />
      )}
      {isVideoModalOpen && (
        <VideoModal
          initialData={editingElement}
          onSave={(data) => handleSave(data, 'video')}
          onClose={closeModal}
        />
      )}
      {isCodeModalOpen && (
        <CodeModal
          initialData={editingElement}
          onSave={(data) => handleSave(data, 'code')}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ElementEditor;
