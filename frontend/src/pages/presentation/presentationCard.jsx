import React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const PresentationCard = ({ presentation }) => {
  const navigate = useNavigate();

  return (
    <div className="presentation-card" onClick={() => navigate(`/editor/${presentation.id}`)}>
      <div className="thumbnail">
        {presentation.thumbnail || <div className="placeholder">No Thumbnail</div>}
      </div>
      <h3>{presentation.name || 'Untitled'}</h3>
      <p>{presentation.description || ''}</p>
      <p>Slides: {presentation.slides.length}</p>
    </div>
  );
};

export default PresentationCard;
