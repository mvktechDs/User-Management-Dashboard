import api from './api';

const defaultUsers = [
  {
    _id: 'mock-1',
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    company: { name: 'Romaguera-Crona' },
    address: {
      street: 'Kulas Light',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: -37.3159, lng: 81.1496 }
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'mock-2',
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    company: { name: 'Deckow-Crist' },
    address: {
      street: 'Victor Plains',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: { lat: -43.9509, lng: -34.4618 }
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'mock-3',
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    company: { name: 'Romaguera-Jacobson' },
    address: {
      street: 'Douglas Extension',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: { lat: -68.6102, lng: -47.0653 }
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'mock-4',
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    company: { name: 'Robel-Corkery' },
    address: {
      street: 'Hoeger Mall',
      city: 'South Elvis',
      zipcode: '23505-1337',
      geo: { lat: 29.4572, lng: -164.2990 }
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'mock-5',
    name: 'Chelsey Dietrich',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    company: { name: 'Keebler LLC' },
    address: {
      street: 'Skiles Walks',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: { lat: -31.8129, lng: 62.5342 }
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const getLocalStorageUsers = () => {
  const users = localStorage.getItem('userhub_users');
  if (!users) {
    localStorage.setItem('userhub_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(users);
};

const saveLocalStorageUsers = (users) => {
  localStorage.setItem('userhub_users', JSON.stringify(users));
};

const isDemoMode = () => {
  return import.meta.env.VITE_USE_MOCK === 'true' || 
         window.location.hostname.includes('github.io') || 
         window.location.hostname.includes('vercel.app') || 
         window.location.hostname.includes('netlify.app');
};

const mockService = {
  getUsers: async (page = 1, limit = 10, search = '') => {
    let users = getLocalStorageUsers();

    if (search) {
      const query = search.toLowerCase();
      users = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query) || 
        (u.company?.name && u.company.name.toLowerCase().includes(query))
      );
    }

    // Sort by createdAt descending
    users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = users.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedUsers = users.slice(startIndex, startIndex + limit);

    return {
      success: true,
      message: 'Users fetched successfully',
      data: paginatedUsers,
      meta: {
        page,
        limit,
        total,
        totalPages
      }
    };
  },

  getUserStats: async () => {
    const users = getLocalStorageUsers();
    
    const uniqueCompanies = [...new Set(users.map(u => u.company?.name).filter(Boolean))].length;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = users.filter(u => new Date(u.createdAt) >= sevenDaysAgo).length;

    return {
      success: true,
      message: 'Stats fetched successfully',
      data: {
        totalUsers: users.length,
        uniqueCompanies,
        newUsers
      }
    };
  },

  getUserById: async (id) => {
    const users = getLocalStorageUsers();
    const user = users.find(u => u._id === id);
    if (!user) {
      throw { status: 404, message: 'User not found', code: 'USER_NOT_FOUND' };
    }
    return {
      success: true,
      message: 'User fetched successfully',
      data: user
    };
  },

  createUser: async (userData) => {
    const users = getLocalStorageUsers();
    
    // Validate email uniqueness
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw {
        status: 409,
        message: 'A user with that email already exists',
        code: 'DUPLICATE_KEY_ERROR',
        field: 'email'
      };
    }

    const newUser = {
      ...userData,
      _id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveLocalStorageUsers(users);

    return {
      success: true,
      message: 'User created successfully',
      data: newUser
    };
  },

  updateUser: async (id, userData) => {
    const users = getLocalStorageUsers();
    const index = users.findIndex(u => u._id === id);
    
    if (index === -1) {
      throw { status: 404, message: 'User not found', code: 'USER_NOT_FOUND' };
    }

    // Validate email uniqueness
    if (userData.email && users.some((u, i) => i !== index && u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw {
        status: 409,
        message: 'A user with that email already exists',
        code: 'DUPLICATE_KEY_ERROR',
        field: 'email'
      };
    }

    const updatedUser = {
      ...users[index],
      ...userData,
      company: {
        ...users[index].company,
        ...userData.company
      },
      address: {
        ...users[index].address,
        ...userData.address,
        geo: {
          ...users[index].address?.geo,
          ...userData.address?.geo
        }
      }
    };

    users[index] = updatedUser;
    saveLocalStorageUsers(users);

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    };
  },

  deleteUser: async (id) => {
    const users = getLocalStorageUsers();
    const filtered = users.filter(u => u._id !== id);
    
    if (users.length === filtered.length) {
      throw { status: 404, message: 'User not found', code: 'USER_NOT_FOUND' };
    }

    saveLocalStorageUsers(filtered);
    return {
      success: true,
      message: 'User deleted successfully'
    };
  }
};

const userService = {
  getUsers: (page = 1, limit = 10, search = '') => {
    if (isDemoMode()) return mockService.getUsers(page, limit, search);
    
    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (search) params.search = search;
    
    return api.get('/users/getUsers', { params });
  },

  getUserStats: () => {
    if (isDemoMode()) return mockService.getUserStats();
    return api.get('/users/getUserStats');
  },

  getUserById: (id) => {
    if (isDemoMode()) return mockService.getUserById(id);
    return api.get(`/users/getUserById/${id}`);
  },

  createUser: (userData) => {
    if (isDemoMode()) return mockService.createUser(userData);
    return api.post('/users/createUser', userData);
  },

  updateUser: (id, userData) => {
    if (isDemoMode()) return mockService.updateUser(id, userData);
    return api.put(`/users/updateUser/${id}`, userData);
  },

  deleteUser: (id) => {
    if (isDemoMode()) return mockService.deleteUser(id);
    return api.delete(`/users/deleteUser/${id}`);
  }
};

export default userService;
