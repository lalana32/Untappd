import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import agent from '../data/agent';
import { User } from '../models/user';

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  status: 'idle',
};

export const userLogin = createAsyncThunk<User, FieldValues>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Auth.login(data);
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
