import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './slices/credentials';
import itemReducer from './slices/item';
import itemListReducer from './slices/itemList';

export const store = configureStore({
  reducer: {
    credentials : credentialsReducer,
    item : itemReducer,
    itemList : itemListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
