import React, { useState } from 'react';
import TextModal from './textModal';
import ImageModal from './imageModal';

const ElementEditor = ({ elements, setElements }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const openTextModal = (element = null) => {
    setEditingElement(element);
    setIsTextModalOpen(true);
  };

  const openImageModal = (element = null) => {
    setEditingElement(element);
    setIsImageModalOpen(true);
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
            fontSize: el.type === 'text' ? `${el.fontSize}em` : 'inherit',
            color: el.type === 'text' ? el.color : 'inherit',
            border: el.type === 'text' ? '1px solid #ccc' : 'none',
            padding: '5px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onDoubleClick={() => el.type === 'text' ? openTextModal(el) : openImageModal(el)}
          onContextMenu={(e) => {
            e.preventDefault();
            deleteElement(el.id);
          }}
        >
          {el.type === 'text' ? (
            el.text
          ) : (
            <img src={el.src} alt={el.alt || 'Image'} style={{ width: '100%', height: '100%' }} />
          )}
        </div>
      ))}
      
      {/* Text Modal */}
      {isTextModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={handleSaveText}
          onClose={() => setIsTextModalOpen(false)}
        />
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <ImageModal
          initialData={editingElement}
          onSave={handleSaveImage}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ElementEditor;
