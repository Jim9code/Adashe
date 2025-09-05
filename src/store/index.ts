/**
 * Redux Store Configuration
 * Central state management for Adashe app
 */

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import groupSlice from './slices/groupSlice';
import walletSlice from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    groups: groupSlice,
    wallet: walletSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
