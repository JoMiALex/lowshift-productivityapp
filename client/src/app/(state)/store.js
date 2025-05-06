import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // Authentication reducer
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore Redux Persist actions
      },
    }),
  //devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
// export default store;

//The following code can be used for reffernece when getting user id from the redux state
// import { useSelector } from "react-redux";

// const user = useSelector((state: any) => state.auth.user);
// const userid = user.uid;