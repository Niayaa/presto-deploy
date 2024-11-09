import React, { useState } from 'react';
import PresentationCard from './presentation/presentationCard';
import NewPresentationModal from './presentation/newPresentation';
import './dashboard.css';

function Dashboard() {
    const [presentations, setPresentations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const addPresentation = (title) => {
      const newPresentation = {
        id: presentations.length + 1,
        title,
        description: '',
        thumbnail: '',
        slides: ['Empty Slide'],
      };
      setPresentations([...presentations, newPresentation]);
      setIsModalOpen(false);
    };
  
    const deletePresentation = (id) => {
      setPresentations(presentations.filter(p => p.id !== id));
    };
  
    return (
      <div className="dashboard">
        <button onClick={() => setIsModalOpen(true)}>New Presentation</button>
        
        {isModalOpen && (
          <NewPresentationModal onClose={() => setIsModalOpen(false)} onCreate={addPresentation} />
        )}
  
        <div className="presentations-grid">
          {presentations.map(p => (
            <PresentationCard
              key={p.id}
              presentation={p}
              onDelete={() => deletePresentation(p.id)}
            />
          ))}
        </div>
      </div>
    );
}

export default Dashboard;
