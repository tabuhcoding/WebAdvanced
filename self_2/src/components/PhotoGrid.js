import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PhotoGrid.css';

const PhotoGrid = ({ photos }) => {
  const navigate = useNavigate();

  const handlePhotoClick = (photo) => {
    navigate(`/photos/${photo.id}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="col-6 col-md-4 col-lg-3 mb-4"
            onClick={() => handlePhotoClick(photo)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card">
              <img
                src={photo.urls.thumb}
                className="card-img-top"
                alt={photo.alt_description}
              />
              <div className="card-body">
                <p className="card-text text-center">{photo.user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
