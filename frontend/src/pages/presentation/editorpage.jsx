import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SlideEditor from './slideEditor';
import EditTitleModal from './editTitleModel';
import './dashboard.css';

const EditorPage = () => {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Untitled Presentation');
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      navigate('/');
    }
  };

  return (
    <div className="editor-page">
      <h2>{title}</h2>
      <button onClick={() => setIsTitleModalOpen(true)}>Edit Title</button>
      <button onClick={() => navigate('/dashboard')}>Back</button>
      <button onClick={handleDelete}>Delete Presentation</button>

      <SlideEditor />

      {isTitleModalOpen && <EditTitleModal onSave={setTitle} onClose={() => setIsTitleModalOpen(false)} />}
    </div>
  );
};

export default EditorPage;
