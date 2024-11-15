import React, { useState, useEffect } from 'react';
import NewPresentationModal from './newPresentation';
import PresentationCard from './presentationCard';
import './dashboard.css';

const Dashboard = () => {
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch presentations from the backend on component mount
  const fetchPresentations = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:5005/store', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.store && data.store.presentations) {
          setPresentations(data.store.presentations);
          console.log('Store data received:', data.store);
        }
      } else {
        console.error(`Failed to fetch presentations: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching presentations:", error);
    }
  };

  // Save updated presentations to the backend
  const savePresentations = async (updatedPresentations) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5005/store', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          store: {
            presentations: updatedPresentations,
          },
        }),
      });
  
      if (!response.ok) {
        console.error(`Failed to save presentations to backend: ${response.status} ${response.statusText}`);
      } else {
        console.log('Presentations saved successfully');
      }
    } catch (error) {
      console.error("Error saving presentations:", error);
    }
  };

  // Fetch presentations when component mounts
  useEffect(() => {
    fetchPresentations();
  }, []);

  // Function to handle creating a new presentation
  const handleCreatePresentation = (name) => {
    const newPresentation = {
      id: Date.now(),
      name,
      slides: [{ id: Date.now(), content: '' }],
      description: '',
      thumbnail: null,
    };
    const updatedPresentations = [...presentations, newPresentation];
    setPresentations(updatedPresentations);
    savePresentations(updatedPresentations); // Save only when a new presentation is added
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
        <NewPresentationModal 
          onCreate={handleCreatePresentation} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;

