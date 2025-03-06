import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { IDish } from '../models/types.ts';

interface DishesState {
  dishes: IDish[];
}

const initialState: DishesState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<DishesState>) => {
      state.dishes = action.payload.dishes;
    },
  },
});

export const { setDishes } = dishesSlice.actions;

export const selectDishes = (state: RootState) => state.dishes;

export default dishesSlice.reducer;
