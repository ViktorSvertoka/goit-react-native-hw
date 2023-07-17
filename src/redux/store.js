import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';

export const store = configureStore({
  reducer: { [authSlice.name]: authSlice.reducer },
});
