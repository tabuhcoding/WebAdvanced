import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
  },
});

export const fetchPhotos = async (page = 1) => {
  try {
    const response = await api.get('/photos', {
      params: { page, per_page: 10 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchPhotoById = async (id) => {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};
