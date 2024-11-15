import React, { useState, useEffect } from 'react';
import NewPresentationModal from './newPresentation';
import PresentationCard from './presentationCard';
import './dashboard.css';

const Dashboard = () => {
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch presentations from the backend
  const fetchPresentations = async () => {
    try {
      const token = localStorage.getItem('token'); 
      console.log('presentation token',token);
  
      const response = await fetch('http://localhost:5005/store', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token// Include the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch presentations: ${response.status} ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      if (data.store && data.store.presentations) {
        setPresentations(data.store.presentations);
        console.log('store data received here',data.store);
      }
    } catch (error) {
      console.error("Error fetching presentations:", error);
    }
  };
  

  const savePresentations = async (updatedPresentations) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      const response = await fetch('http://localhost:5005/store', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          store: {
            presentations: updatedPresentations,
          },
        }),
      });
  
      if (!response.ok) {
        console.error(`Failed to save presentations to backend: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error saving presentations:", error);
    }
  };

//initialize for fetching
  useEffect(() => {
    fetchPresentations();
  }, []);

  useEffect(() => {
    savePresentations(presentations);
  }, [presentations]);

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
