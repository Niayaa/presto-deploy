import React, { useState } from 'react';
import TextModal from './textModal';

const ElementEditor = ({ elements, setElements }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const openTextModal = (element = null) => {
    setEditingElement(element);
    setIsModalOpen(true);
  };

  const handleSaveText = (data) => {
    if (editingElement) {
      setElements(elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el));
    } else {
      setElements([...elements, { ...data, id: Date.now(), type: 'text' }]);
    }
    setIsModalOpen(false);
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
            fontSize: `${el.fontSize}em`,
            color: el.color,
            border: '1px solid #ccc',
            padding: '5px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onDoubleClick={() => openTextModal(el)}
          onContextMenu={(e) => {
            e.preventDefault();
            deleteElement(el.id);
          }}
        >
          {el.text}
        </div>
      ))}
      {isModalOpen && (
        <TextModal
          initialData={editingElement}
          onSave={handleSaveText}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ElementEditor;
