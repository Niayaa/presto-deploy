import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const PresentationCard = ({ presentation }) => {
  const navigate = useNavigate();

  if (!presentation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="presentation-card" onClick={() => navigate(`/editor/${presentation.id}`)}>
      <div className="thumbnail">
        {presentation.thumbnail ? (
          <img src={presentation.thumbnail} alt={`${presentation.name} Thumbnail`} />
        ) : (
          <div className="placeholder">No Thumbnail</div>
        )}
      </div>
      <h3>{presentation.name || 'Untitled'}</h3>
      <p>{presentation.description || ''}</p>
      <p>Slides: {presentation.slides.length}</p>
    </div>
  );
};


export default PresentationCard;
