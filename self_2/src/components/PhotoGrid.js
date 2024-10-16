import React from 'react';

const PhotoGrid = ({ photos, lastPhotoElementRef }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {photos.map((photo, index) => {
          // If this is the last photo, attach the ref to it
          if (photos.length === index + 1) {
            return (
              <div
                key={photo.id}
                className="col-6 col-md-4 col-lg-3 mb-4"
                ref={lastPhotoElementRef}
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
            );
          } else {
            return (
              <div key={photo.id} className="col-6 col-md-4 col-lg-3 mb-4">
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
            );
          }
        })}
      </div>
    </div>
  );
};

export default PhotoGrid;
