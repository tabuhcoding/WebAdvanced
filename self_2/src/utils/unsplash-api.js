import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';

// Create an instance of axios with base URL and headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
  },
});

// Fetch a list of photos (for the grid view)
export const fetchPhotos = async (page = 1) => {
  try {
    const response = await api.get('/photos', {
      params: { page, per_page: 10 }, // Fetch 10 photos per page
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

// Fetch photo details by ID
export const fetchPhotoById = async (id) => {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};
