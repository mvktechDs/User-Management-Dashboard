import api from './api';

const userService = {
  getUsers: (page = 1, limit = 10, search = '') => {
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (search) params.search = search;
    
    return api.get('/users/getUsers', { params });
  },

  getUserStats: () => {
    return api.get('/users/getUserStats');
  },

  getUserById: (id) => {
    return api.get(`/users/getUserById/${id}`);
  },

  createUser: (userData) => {
    return api.post('/users/createUser', userData);
  },

  updateUser: (id, userData) => {
    return api.put(`/users/updateUser/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/users/deleteUser/${id}`);
  }
};

export default userService;
