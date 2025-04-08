import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //devTools: process.env.NODE_ENV !== 'production',
});