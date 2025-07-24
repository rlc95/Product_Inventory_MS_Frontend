import axios from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories', {
      withCredentials: true, // only if you're using Sanctum
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.response?.data || error.message);
    throw error;
  }
};
