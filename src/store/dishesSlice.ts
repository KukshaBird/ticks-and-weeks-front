import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { IDish } from '../models/types.ts';
import { createDishAsync, deleteDishAsync, fetchDishes, updateDishAsync } from './thunks/dishThunks.ts';

interface DishesState {
  dishes: IDish[];
  pendingUpdates: Record<string, IDish>;
  error: string | null;
  isLoading: boolean;
}

const initialState: DishesState = {
  dishes: [],
  pendingUpdates: {},
  error: null,
  isLoading: false,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<DishesState>) => {
      state.dishes = action.payload.dishes;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dishes
      .addCase(fetchDishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishes = action.payload;
        state.pendingUpdates = {};
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Failed to fetch dishes';
      })
      // Create dish
      .addCase(createDishAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDishAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishes.push(action.payload);
      })
      .addCase(createDishAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Failed to create dish';
      })
      // Update dish
      .addCase(updateDishAsync.pending, (state, action) => {
        state.error = null;
        const dishData = action.meta.arg;
        const dishIndex = state.dishes.findIndex((dish) => dish.id === dishData.id);
        if (dishIndex > -1) {
          const currentDish = state.dishes[dishIndex];
          state.pendingUpdates[dishData.id] = {
            ...currentDish,
            name: dishData.name ?? currentDish.name,
            price: dishData.price ?? currentDish.price,
          };
        }
      })
      .addCase(updateDishAsync.fulfilled, (state, action) => {
        const dishIndex = state.dishes.findIndex((dish) => dish.id === action.payload.id);
        if (dishIndex > -1) {
          state.dishes[dishIndex] = action.payload;
        }
        delete state.pendingUpdates[action.payload.id];
      })
      .addCase(updateDishAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? 'Failed to update dish';
        if (action.meta.arg.id) {
          delete state.pendingUpdates[action.meta.arg.id];
        }
      })
      // Delete dish
      .addCase(deleteDishAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteDishAsync.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
      })
      .addCase(deleteDishAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? 'Failed to delete dish';
      });
  },
});

export const { setDishes, clearError } = dishesSlice.actions;

export const selectDishesState = (state: RootState) => state.dishes;

export const selectDishes = createSelector(
  selectDishesState,
  (dishesState) => ({
    dishes: dishesState.dishes,
    pendingUpdates: dishesState.pendingUpdates,
    error: dishesState.error,
    isLoading: dishesState.isLoading,
  })
);

export { fetchDishes, createDishAsync, updateDishAsync, deleteDishAsync };
export default dishesSlice.reducer;
