import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchPhotos } from './utils/unsplash-api';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';
import './style/CustomApp.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const observer = useRef();

  const loadPhotos = async (pageNum) => {
    setLoading(true);
    setError(null); 
    try {
      const data = await fetchPhotos(pageNum);
      if (data.length === 0) {
        setHasMorePhotos(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      }
    } catch (err) {
      setError('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos(page);
  }, [page]);

  const lastPhotoElementRef = useCallback((node) => {
    if (loading || !hasMorePhotos) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePhotos) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMorePhotos]);

  return (
    <Router>
      <Routes>
        <Route
          path="/photos"
          element={
            <PhotoGrid
              photos={photos}
              lastPhotoElementRef={lastPhotoElementRef}
            />
          }
        />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="/" element={<Navigate to="/photos" />} />
      </Routes>

      {/* Loading Spinner */}
      {loading && hasMorePhotos && (
        <div className="spinner-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* End of Photos Message */}
      {!hasMorePhotos && (
        <div className="end-message">
          <p>No more photos to load.</p>
        </div>
      )}
    </Router>
  );
};

export default App;
