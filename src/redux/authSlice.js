import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
  avatarImage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      avatarImage: payload.avatarImage,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
