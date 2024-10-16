import React from 'react';
import '../style/CustomPhotoGrid.css'; // Đổi tên file CSS để phù hợp với phong cách mới
import { useNavigate } from 'react-router-dom';

const PhotoGrid = ({ photos, lastPhotoElementRef }) => {
  const navigate = useNavigate();

  const handlePhotoClick = (photo) => {
    navigate(`/photos/${photo.id}`);
  };
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => {
        const isLastPhoto = photos.length === index + 1;
        return (
          <div
            key={photo.id}
            className="photo-item"
            ref={isLastPhoto ? lastPhotoElementRef : null}
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-card">
              <img
                src={photo.urls.small}
                className="photo-img"
                alt={photo.alt_description || 'Photo'}
              />
              <div className="photo-info">
                <p>{photo.user.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
