import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchPhotos } from './utils/unsplash-api';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // For pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To handle errors
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const observer = useRef(); // Reference for the observer element

  // Fetch photos from Unsplash API
  const loadPhotos = async (pageNum) => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      const data = await fetchPhotos(pageNum);
      if (data.length === 0) {
        setHasMorePhotos(false); // No more photos to load
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); // Append new photos
      }
    } catch (err) {
      setError('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch photos on component mount and when the page number changes
  useEffect(() => {
    loadPhotos(page);
  }, [page]);

  // Infinite Scroll: Set up observer to load more when the last photo is in view
  const lastPhotoElementRef = useCallback((node) => {
    if (loading || !hasMorePhotos) return; // Check if there are more photos to load
  
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePhotos) {
        setPage((prevPage) => prevPage + 1); // Load next page when last photo is visible
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
              lastPhotoElementRef={lastPhotoElementRef} // Pass the ref to the last photo element
            />
          }
        />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="/" element={<Navigate to="/photos" />} />
      </Routes>

      {/* Loading Spinner */}
      {loading && hasMorePhotos && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && hasMorePhotos && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* No More Photos Message */}
      {!hasMorePhotos && (
        <div className="text-center mt-4">
          <p>No more photos to load.</p>
        </div>
      )}
    </Router>
  );
};

export default App;
