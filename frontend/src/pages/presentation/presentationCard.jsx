import React from 'react';
import { useNavigate } from 'react-router-dom';

function PresentationCard({ presentation, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="presentation-card" style={{ width: '200px', height: '100px' }}>
      <div onClick={() => navigate(`/presentation/${presentation.id}`)}>
        <h3>{presentation.title}</h3>
        <div className="thumbnail">
          {presentation.thumbnail ? (
            <img src={presentation.thumbnail} alt="thumbnail" />
          ) : (
            <div className="empty-thumbnail">[Empty]</div>
          )}
        </div>
        <p>{presentation.description || 'No description'}</p>
        <p>{presentation.slides.length} slides</p>
      </div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default PresentationCard;
