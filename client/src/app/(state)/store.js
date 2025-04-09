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

//The following code can be used for reffernece when getting user id from the redux state
// import { useSelector } from "react-redux";

// const user = useSelector((state: any) => state.auth.user);
// const userid = user.uid;