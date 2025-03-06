import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice.ts';
import dishesReducer from './dishesSlice.ts';

const weekStore = configureStore({
  reducer: {
    users: usersReducer,
    dishes: dishesReducer,
  },
});

export default weekStore;

export type RootState = ReturnType<typeof weekStore.getState>;
export type AppDispatch = typeof weekStore.dispatch;
