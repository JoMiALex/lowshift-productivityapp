import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    // Authentication reducer
    auth: authReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //devTools: process.env.NODE_ENV !== 'production',
});

export default store;
//export type RootState = ReturnType<typeof store.getState>;