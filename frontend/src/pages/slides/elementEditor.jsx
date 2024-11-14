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
  const [selectedElement, setSelectedElement] = useState(null);
  const [resizingElement, setResizingElement] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, corner: '' });

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

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const handleDragStart = (event, element) => {
    setDraggingElement(element);
    setSelectedElement(element);
    setDragStart({
      x: event.clientX,
      y: event.clientY,
      offsetX: element.x,
      offsetY: element.y,
    });
    event.stopPropagation();
  };

  const handleDragMove = (event) => {
    if (!draggingElement) return;

    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;

    const newX = dragStart.offsetX + (dx / window.innerWidth) * 100;
    const newY = dragStart.offsetY + (dy / window.innerHeight) * 100;

    const constrainedX = Math.max(0, Math.min(newX, 100 - draggingElement.width));
    const constrainedY = Math.max(0, Math.min(newY, 100 - draggingElement.height));

    setElements(elements.map(el => 
      el.id === draggingElement.id
        ? { ...el, x: constrainedX, y: constrainedY }
        : el
    ));
  };

  const handleDragEnd = () => {
    setDraggingElement(null);
  };

  // Resizing logic without aspect ratio constraint
  const handleResizeStart = (event, element, corner) => {
    event.stopPropagation();
    setResizingElement(element);
    setResizeStart({
      x: event.clientX,
      y: event.clientY,
      width: element.width,
      height: element.height,
      corner
    });
  };

  const handleResizeMove = (event) => {
    if (!resizingElement) return;

    const dx = event.clientX - resizeStart.x;
    const dy = event.clientY - resizeStart.y;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;

    // Adjust width and height independently based on the corner being dragged
    if (resizeStart.corner.includes('left')) {
      newWidth = resizeStart.width - dx;
    } else if (resizeStart.corner.includes('right')) {
      newWidth = resizeStart.width + dx;
    }

    if (resizeStart.corner.includes('top')) {
      newHeight = resizeStart.height - dy;
    } else if (resizeStart.corner.includes('bottom')) {
      newHeight = resizeStart.height + dy;
    }

    // Constrain the dimensions within slide bounds and minimum size
    const slideWidth = 100;
    const slideHeight = 100;
    newWidth = Math.max(1, Math.min(newWidth, slideWidth - resizingElement.x));
    newHeight = Math.max(1, Math.min(newHeight, slideHeight - resizingElement.y));

    setElements(elements.map(el =>
      el.id === resizingElement.id
        ? { ...el, width: newWidth, height: newHeight }
        : el
    ));
  };

  const handleResizeEnd = () => {
    setResizingElement(null);
  };

  // Apply syntax highlighting whenever code elements change
  useEffect(() => {
    elements.forEach((el) => {
      if (el.type === 'code') {
        const codeBlock = document.getElementById(`code-${el.id}`);
        if (codeBlock) {
          hljs.highlightElement(codeBlock);
        }
      }
    });
  }, [elements]);

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseMove={(e) => { handleDragMove(e); handleResizeMove(e); }}
      onMouseUp={() => { handleDragEnd(); handleResizeEnd(); }}
    >
      {elements.map(el => (
        <div
          key={el.id}
          style={{
            position: 'absolute',
            top: `${el.y}%`,
            left: `${el.x}%`,
            width: `${el.width}%`,
            height: `${el.height}%`,
            cursor: selectedElement?.id === el.id ? 'auto' : 'pointer',
            border: '1px solid #ccc',
            fontSize: el.type === 'text' ? `${el.fontSize}em` : 'inherit',
            color: el.type === 'text' ? el.color : 'inherit',
            overflow: 'hidden'
          }}
          onClick={() => setSelectedElement(el)}
          onDoubleClick={() => openModal(el, el.type)}
          onContextMenu={(e) => {
            e.preventDefault();
            deleteElement(el.id);
          }}
          onMouseDown={(event) => handleDragStart(event, el)}
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

          {selectedElement?.id === el.id && (
            <>
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',
                    [corner.split('-')[0]]: '-5px',
                    [corner.split('-')[1]]: '-5px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                    cursor: `${corner}-resize`
                  }}
                  onMouseDown={(event) => handleResizeStart(event, el, corner)}
                />
              ))}
            </>
          )}
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
