import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoById } from '../utils/unsplash-api';
import '../style/PhotoDetail.css';

const PhotoDetail = () => {
  const { id } = useParams(); // Get the photo ID from the route
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch photo details when component is mounted
  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch (err) {
        setError('Failed to load photo details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading photo details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img
              src={photo.urls.regular}
              className="card-img-top"
              alt={photo.alt_description}
            />
            <div className="card-body">
              <h2 className="card-title">{photo.description || 'Untitled'}</h2>
              <p className="card-text">
                <strong>Author:</strong> {photo.user.name}
              </p>
              <p className="card-text">
                <strong>Description:</strong>{' '}
                {photo.alt_description || 'No description available'}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/photos')}
              >
                Back to Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
