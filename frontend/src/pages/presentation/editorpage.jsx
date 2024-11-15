import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SlideEditor from './slideEditor';
import EditTitleModal from './editTitleModel';
import './dashboard.css';

const EditorPage = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [title, setTitle] = useState('Untitled Presentation');
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);


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
          const foundPresentation = data.store.presentations.find(p => p.id === Number(presentationId));
          if (foundPresentation) {
            setPresentation(foundPresentation);
            setTitle(foundPresentation.name);
          } else {
            console.warn('Presentation not found');
          }
        } else {
          console.error('Failed to fetch presentations');
        }
      } catch (error) {
        console.error("Error fetching presentation:", error);
      }
    };

    fetchPresentation();
  }, [presentationId]);


  const updatePresentationTitle = async (newTitle) => {
    try {
      const updatedPresentation = { ...presentation, name: newTitle };
      const updatedPresentations = [...(presentation ? [updatedPresentation] : [])];

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5005/store`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ store: { presentations: updatedPresentations } }),
      });

      if (response.ok) {
        setPresentation(updatedPresentation);
      } else {
        console.error('Failed to update presentation title');
      }
    } catch (error) {
      console.error("Error updating presentation title:", error);
    }
  };


  const handleTitleSave = (newTitle) => {
    setTitle(newTitle);
    updatePresentationTitle(newTitle);
    setIsTitleModalOpen(false);
  };


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this presentation?")) {
      try {
        const updatedPresentations = (presentation ? [] : []); 

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5005/store`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ store: { presentations: updatedPresentations } }),
        });

        if (response.ok) {
          navigate('/');
        } else {
          console.error('Failed to delete presentation');
        }
      } catch (error) {
        console.error("Error deleting presentation:", error);
      }
    }
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
