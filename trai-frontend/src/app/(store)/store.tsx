import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './slices/credentials';
import itemReducer from './slices/item';

export const store = configureStore({
  reducer: {
    credentials : credentialsReducer,
    item : itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
