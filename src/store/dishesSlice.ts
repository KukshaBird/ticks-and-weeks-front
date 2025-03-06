import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { BaseDish, IDish, IEditDish } from '../models/types.ts';
import DishManager from '../managers/DishManager.ts';

interface DishesState {
  dishes: IDish[];
  pendingUpdates: Record<string, IDish>;
}

const initialState: DishesState = {
  dishes: [],
  pendingUpdates: {},
};

// Thunks
export const fetchDishes = createAsyncThunk('dishes/fetchAll', async () => {
  const dishes = await DishManager.getAll();
  return dishes.map(dish => dish.toObject());
});

export const createDishAsync = createAsyncThunk('dishes/create', async (dishData: BaseDish) => {
  const newDish = await DishManager.create(dishData);
  return newDish.toObject();
});

export const updateDishAsync = createAsyncThunk('dishes/update', async (dishData: IEditDish) => {
  const updatedDish = await DishManager.edit(dishData);
  return updatedDish.toObject();
});

export const deleteDishAsync = createAsyncThunk('dishes/delete', async (id: string) => {
  await DishManager.delete(id);
  return id;
});

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<DishesState>) => {
      state.dishes = action.payload.dishes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<IDish[]>) => {
        state.dishes = action.payload;
        state.pendingUpdates = {};
      })
      .addCase(createDishAsync.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.dishes.push(action.payload);
      })
      .addCase(updateDishAsync.pending, (state, action) => {
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
      .addCase(updateDishAsync.fulfilled, (state, action: PayloadAction<IDish>) => {
        const dishIndex = state.dishes.findIndex((dish) => dish.id === action.payload.id);
        if (dishIndex > -1) {
          state.dishes[dishIndex] = action.payload;
        }
        delete state.pendingUpdates[action.payload.id];
      })
      .addCase(updateDishAsync.rejected, (state, action) => {
        if (action.meta.arg.id) {
          delete state.pendingUpdates[action.meta.arg.id];
        }
      })
      .addCase(deleteDishAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
      });
  },
});

export const { setDishes } = dishesSlice.actions;

export const selectDishesState = (state: RootState) => state.dishes;

export const selectDishes = createSelector(
  selectDishesState,
  (dishesState) => ({
    dishes: dishesState.dishes,
    pendingUpdates: dishesState.pendingUpdates,
  })
);

export default dishesSlice.reducer;
