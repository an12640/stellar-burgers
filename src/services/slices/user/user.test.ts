import { UserState } from '@slices';
import { TUser } from '@utils-types';
import reducer, {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './user';
import { TLoginData, TRegisterData } from '@api';

describe('Тесты редьюсеров слайса user', () => {
  const userMock: TUser = {
    email: 'user@gmail.com',
    name: 'testuser'
  };

  const authResponseMock = {
    success: true,
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    user: userMock
  };

  const registerData: TRegisterData = {
    email: 'user@gmail.com',
    password: 'password',
    name: 'testuser'
  };

  const loginData: TLoginData = {
    email: 'user@gmail.com',
    password: 'password'
  };

  const initialState: UserState = {
    user: null,
    isAuthenticated: false
  };

  test('registerUser.pending', () => {
    const nextState = reducer(
      initialState,
      registerUser.pending('pending', registerData)
    );

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBeNull();
  });

  test('registerUser.rejected', () => {
    const nextState = reducer(
      initialState,
      registerUser.rejected(null, 'rejected', registerData)
    );

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBeNull();
  });

  test('registerUser.fulfilled', () => {
    const nextState = reducer(
      initialState,
      registerUser.fulfilled(authResponseMock, 'fulfilled', registerData)
    );

    expect(nextState.user).toEqual(userMock);
    expect(nextState.isAuthenticated).toBe(true);
  });

  test('loginUser.pending', () => {
    const nextState = reducer(
      initialState,
      loginUser.pending('pending', loginData)
    );

    expect(nextState.user).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
  });

  test('loginUser.rejected', () => {
    const nextState = reducer(
      initialState,
      loginUser.rejected(null, 'rejected', loginData)
    );

    expect(nextState.user).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
  });

  test('loginUser.fulfilled', () => {
    const nextState = reducer(
      initialState,
      loginUser.fulfilled(authResponseMock, 'fulfilled', loginData)
    );

    expect(nextState.user).toEqual(userMock);
    expect(nextState.isAuthenticated).toBe(true);
  });

  test('fetchUser.pending', () => {
    const nextState = reducer(initialState, fetchUser.pending('pending'));

    expect(nextState.isAuthenticated).toBe(false);
  });

  test('fetchUser.rejected', () => {
    const nextState = reducer(
      initialState,
      fetchUser.rejected(null, 'rejected')
    );

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBeNull();
  });

  test('fetchUser.fulfilled', () => {
    const nextState = reducer(
      initialState,
      fetchUser.fulfilled(userMock, 'fulfilled')
    );

    expect(nextState.user).toEqual(userMock);
    expect(nextState.isAuthenticated).toBe(true);
  });

  test('updateUser.fulfilled', () => {
    const stateWithUser: UserState = {
      user: userMock,
      isAuthenticated: true
    };

    const updatedUser = {
      email: 'user@gmail.com',
      name: 'username1'
    };

    const nextState = reducer(
      stateWithUser,
      updateUser.fulfilled({ success: true, user: updatedUser }, 'fulfilled', {
        name: 'username1'
      })
    );

    expect(nextState.user).toEqual(updatedUser);
    expect(nextState.isAuthenticated).toBe(true);
  });

  test('logoutUser.pending', () => {
    const stateWithUser: UserState = {
      user: userMock,
      isAuthenticated: true
    };

    const nextState = reducer(stateWithUser, logoutUser.pending('pending'));

    expect(nextState.isAuthenticated).toBe(false);
  });

  test('logoutUser.rejected', () => {
    const stateWithUser: UserState = {
      user: userMock,
      isAuthenticated: true
    };

    const nextState = reducer(
      stateWithUser,
      logoutUser.rejected(null, 'rejected')
    );

    expect(nextState.isAuthenticated).toBe(true);
  });

  test('logoutUser.fulfilled', () => {
    const stateWithUser: UserState = {
      user: userMock,
      isAuthenticated: true
    };

    const nextState = reducer(
      stateWithUser,
      logoutUser.fulfilled(undefined, 'fulfilled')
    );

    expect(nextState.user).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
  });
});
