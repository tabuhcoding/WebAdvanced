import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoById } from '../utils/unsplash-api';
import '../style/CustomPhotoDetail.css'; // Đổi tên file CSS

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch (err) {
        setError('Sorry, we couldn’t load the photo. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!photo) {
    return <div className="not-found">Photo not found</div>;
  }

  return (
    <div className="photo-detail-container">
      <div className="photo-card">
        <img
          src={photo.urls.regular}
          className="photo-image"
          alt={photo.alt_description || 'Image'}
        />
        <div className="photo-info">
          <h2 className="photo-title">{photo.description || 'Untitled'}</h2>
          <p>
            <strong>Photographer:</strong> {photo.user.name}
          </p>
          <p>
            <strong>Description:</strong> {photo.alt_description || 'No description available.'}
          </p>
          <button className="back-button" onClick={() => navigate('/photos')}>
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
