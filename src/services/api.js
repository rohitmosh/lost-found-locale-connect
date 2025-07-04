import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data && response.data.success && response.data.data && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },
  
  login: async (credentials) => {
    console.log('Login attempt with:', credentials);
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response);
      
      if (response.data && response.data.success && response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data;
      } else {
        console.error('Login response missing token or user data:', response.data);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Login error in service:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await api.put('/auth/me', userData);
    return response.data;
  },
  
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  }
};

// Lost items services
export const lostItemService = {
  getAllLostItems: async (params) => {
    const response = await api.get('/lost-items', { params });
    return response.data;
  },
  
  getLostItemById: async (id) => {
    const response = await api.get(`/lost-items/${id}`);
    return response.data;
  },
  
  createLostItem: async (itemData) => {
    const response = await api.post('/lost-items', itemData);
    return response.data;
  },
  
  updateLostItem: async (id, itemData) => {
    const response = await api.put(`/lost-items/${id}`, itemData);
    return response.data;
  },
  
  deleteLostItem: async (id) => {
    const response = await api.delete(`/lost-items/${id}`);
    return response.data;
  }
};

// Found items services
export const foundItemService = {
  getAllFoundItems: async (params) => {
    const response = await api.get('/found-items', { params });
    return response.data;
  },
  
  getFoundItemById: async (id) => {
    const response = await api.get(`/found-items/${id}`);
    return response.data;
  },
  
  createFoundItem: async (itemData) => {
    const response = await api.post('/found-items', itemData);
    return response.data;
  },
  
  updateFoundItem: async (id, itemData) => {
    const response = await api.put(`/found-items/${id}`, itemData);
    return response.data;
  },
  
  deleteFoundItem: async (id) => {
    const response = await api.delete(`/found-items/${id}`);
    return response.data;
  }
};

export default api; 