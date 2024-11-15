import React, { useState,useEffect } from 'react';
import NewPresentationModal from './newPresentation';
import PresentationCard from './presentationCard';
import './dashboard.css';

const Dashboard = () => {
  const [presentations, setPresentations] = useState(() => {
    const savedPresentations = localStorage.getItem('presentations');
    return savedPresentations ? JSON.parse(savedPresentations) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('presentations', JSON.stringify(presentations));
  }, [presentations]);


  const handleCreatePresentation = (name) => {
    const newPresentation = {
      id: Date.now(),
      name,
      slides: [{ id: Date.now(), content: '' }],
      description: '',
      thumbnail: null,
    };
    setPresentations([...presentations, newPresentation]);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <aside>
        <button onClick={() => setIsModalOpen(true)}>New Presentation</button>
      </aside>
      <div className="presentation-list">
        {presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} />
        ))}
      </div>
      {isModalOpen && (
        <NewPresentationModal onCreate={handleCreatePresentation} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
