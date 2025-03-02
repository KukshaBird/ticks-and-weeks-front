import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlise.ts';
import dishesReducer from './dishesSlise.ts';

const weekStore = configureStore({
  reducer: {
    users: usersReducer,
    dishes: dishesReducer,
  },
});

export default weekStore;

export type RootState = ReturnType<typeof weekStore.getState>;
export type AppDispatch = typeof weekStore.dispatch;
