import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SlideEditor from './slideEditor';
import EditTitleModal from './editTitleModel';
import { usePresentations } from './presentationContext';
import './dashboard.css';

const EditorPage = () => {
  const { presentationId } = useParams();
  const { getPresentationById, deletePresentation, updatePresentationTitle } = usePresentations();
  const navigate = useNavigate();
  const presentation = getPresentationById(presentationId);
  const [title, setTitle] = useState(presentation?.name || 'Untitled Presentation');
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

  useEffect(() => {
    if (presentation) {
      setTitle(presentation.name); 
    }
  }, [presentation]);


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this presentation?")) {
      deletePresentation(presentationId);
      navigate('/');
    }
  };

  const handleTitleSave = (newTitle) => {
    setTitle(newTitle);
    updatePresentationTitle(presentationId, newTitle); 
    setIsTitleModalOpen(false);
  };

  if (!presentation) {
    return <div>Presentation not found.</div>;
  }

  return (
    <div className="editor-page">
      <h2>{title}</h2>
      <button onClick={() => setIsTitleModalOpen(true)}>Edit Title</button>
      <button onClick={() => navigate('/dashboard')}>Back</button>
      <button onClick={handleDelete}>Delete Presentation</button>

     <SlideEditor presentation={presentation} />

      {isTitleModalOpen && (
        <EditTitleModal
          initialTitle={title}
          onSave={handleTitleSave}
          onClose={() => setIsTitleModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EditorPage;
