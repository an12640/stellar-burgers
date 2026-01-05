import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import { getUserApi, registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';

export type UserState = {
  user: TUser | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false
};

export const registerUser = createAsyncThunk(
  'users/register',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      if (!response?.success) {
        return rejectWithValue(response);
      }
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  }
});

export const { userLogout } = userSlice.actions;

export const getUserState = (state: RootState): UserState => state.user;

export default userSlice.reducer;
