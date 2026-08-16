import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers(page, limit, search);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'users/fetchUserStats',
  async (fetch, { rejectWithValue }) => {
    try {
      const response = await userService.getUserStats();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser(id);
      return { id, ...response };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  users: [],
  selectedUser: null,
  stats: {
    totalUsers: 0,
    uniqueCompanies: 0,
    newUsers: 0
  },
  loading: {
    list: false,
    details: false,
    stats: false,
    mutation: false
  },
  error: {
    list: null,
    details: null,
    stats: null,
    mutation: null
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  search: ''
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearMutationError: (state) => {
      state.error.mutation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.list = false;
        state.users = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload || { message: 'Failed to fetch users' };
      })

      .addCase(fetchUserStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload || { message: 'Failed to fetch statistics' };
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading.details = true;
        state.error.details = null;
        state.selectedUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.selectedUser = action.payload.data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading.details = false;
        state.error.details = action.payload || { message: 'Failed to fetch user details' };
      })

      .addCase(createUser.pending, (state) => {
        state.loading.mutation = true;
        state.error.mutation = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.mutation = false;
        state.users = [action.payload.data, ...state.users].slice(0, state.pagination.limit);
        state.pagination.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.mutation = false;
        state.error.mutation = action.payload || { message: 'Failed to create user' };
      })

      .addCase(updateUser.pending, (state) => {
        state.loading.mutation = true;
        state.error.mutation = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.mutation = false;
        const updated = action.payload.data;
        state.users = state.users.map((u) => (u._id === updated._id ? updated : u));
        if (state.selectedUser && state.selectedUser._id === updated._id) {
          state.selectedUser = updated;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.mutation = false;
        state.error.mutation = action.payload || { message: 'Failed to update user' };
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading.mutation = true;
        state.error.mutation = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.mutation = false;
        const id = action.payload.id;
        state.users = state.users.filter((u) => u._id !== id);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
        if (state.selectedUser && state.selectedUser._id === id) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.mutation = false;
        state.error.mutation = action.payload || { message: 'Failed to delete user' };
      });
  }
});

export const { setSearch, clearSelectedUser, clearMutationError } = userSlice.actions;
export default userSlice.reducer;
