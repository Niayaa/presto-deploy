import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import TextModal from './textModal';
import ImageModal from './imageModal';
import VideoModal from './videoModal';
import CodeModal from './codeModal';

// Import highlight.js languages
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('c', c);

const ElementEditor = ({ elements, setElements }) => {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
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

  const openCodeModal = (element = null) => {
    setEditingElement(element);
    setIsCodeModalOpen(true);
  };

  const handleSaveText = (data) => {
    const newElement = editingElement
      ? elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el)
      : [...elements, { ...data, id: Date.now(), type: 'text' }];
    setElements(newElement);
    setIsTextModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveImage = (data) => {
    const newElement = editingElement
      ? elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el)
      : [...elements, { ...data, id: Date.now(), type: 'image' }];
    setElements(newElement);
    setIsImageModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveVideo = (data) => {
    const newElement = editingElement
      ? elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el)
      : [...elements, { ...data, id: Date.now(), type: 'video' }];
    setElements(newElement);
    setIsVideoModalOpen(false);
    setEditingElement(null);
  };

  const handleSaveCode = (data) => {
    const newElement = editingElement
      ? elements.map(el => el.id === editingElement.id ? { ...el, ...data } : el)
      : [...elements, { ...data, id: Date.now(), type: 'code' }];
    setElements(newElement);
    setIsCodeModalOpen(false);
    setEditingElement(null);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  // Apply syntax highlighting whenever code elements change
  useEffect(() => {
    elements.forEach((el) => {
      if (el.type === 'code') {
        const codeBlock = document.getElementById(`code-${el.id}`);
        if (codeBlock) {
          // Use auto-detection for syntax highlighting
          codeBlock.innerHTML = hljs.highlightAuto(el.code).value;
        }
      }
    });
  }, [elements]);

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
            border: el.type === 'text' || el.type === 'code' ? '1px solid #ccc' : 'none',
            fontSize: el.type === 'text' ? `${el.fontSize}em` : 'inherit',
            color: el.type === 'text' ? el.color : 'inherit',
            overflow: 'hidden'
          }}
          onDoubleClick={() => {
            if (el.type === 'text') openTextModal(el);
            else if (el.type === 'image') openImageModal(el);
            else if (el.type === 'video') openVideoModal(el);
            else if (el.type === 'code') openCodeModal(el);
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
          {el.type === 'code' && (
            <pre style={{
              fontSize: `${el.fontSize}em`,
              whiteSpace: 'pre-wrap',
              border: '1px solid #ddd',
              padding: '10px',
              background: '#f5f5f5'
            }}>
              <code id={`code-${el.id}`}>
                {el.code}
              </code>
            </pre>
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

export default ElementEditor;
