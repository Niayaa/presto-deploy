import React, { useState } from 'react';
import "./dashboard.css"

function Dashboard() {
  const [presentations, setPresentations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresentationName, setNewPresentationName] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setNewPresentationName(''); 
  };

  const createPresentation = () => {
    if (newPresentationName.trim() === '') return; 

    setPresentations([
      ...presentations,
      { name: newPresentationName, slides: ['Empty Slide'] }
    ]);


    closeModal();
  };

  return (
    <div className="dashboard">
      <h1>My Presentations</h1>

      {/* New Presentation Button */}
      <button onClick={openModal} className="new-presentation-button">
        New Presentation
      </button>

      {/* Modal for Creating a New Presentation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Presentation</h2>
            <input
              type="text"
              placeholder="Enter presentation name"
              value={newPresentationName}
              onChange={(e) => setNewPresentationName(e.target.value)}
            />
            <button onClick={createPresentation}>Create</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Display Presentations */}
      <div className="presentations-list">
        {presentations.map((presentation, index) => (
          <div key={index} className="presentation-item">
            <h3>{presentation.name}</h3>
            <p>{presentation.slides[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
