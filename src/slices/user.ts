import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../services/store';
import { registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../utils/cookie';

export type UserState = {
  // request: boolean;
  // error: string | null;
  // response: TUser | null;
  // registerData: TRegisterData | null;
  user: TUser | null;
  // userOrders: TOrder[];
  // isAuthChecked: boolean;
  isAuthenticated: boolean;
  // loginUserRequest: boolean;
};

export const initialState: UserState = {
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
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      // state.error = action.error.message as string;
      console.log(action.error);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
  }
});

export const { userLogout } = userSlice.actions;

export const getUserState = (state: RootState): UserState => state.user;

export default userSlice.reducer;
