import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseDish, IDish, IEditDish } from '../../models/types.ts';
import DishManager from '../../managers/DishManager.ts';

// Define return types
type ThunkApiConfig = {
  rejectValue: { message: string };
};

export const fetchDishes = createAsyncThunk<
  IDish[],
  void,
  ThunkApiConfig
>('dishes/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const dishes = await DishManager.getAll();
    return dishes.map(dish => dish.toObject());
  } catch (error) {
    return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to fetch dishes' });
  }
});

export const createDishAsync = createAsyncThunk<
  IDish,
  BaseDish,
  ThunkApiConfig
>('dishes/create', async (dishData, { rejectWithValue }) => {
  try {
    const newDish = await DishManager.create(dishData);
    return newDish.toObject();
  } catch (error) {
    return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to create dish' });
  }
});

export const updateDishAsync = createAsyncThunk<
  IDish,
  IEditDish,
  ThunkApiConfig
>('dishes/update', async (dishData, { rejectWithValue }) => {
  try {
    const updatedDish = await DishManager.edit(dishData);
    return updatedDish.toObject();
  } catch (error) {
    return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to update dish' });
  }
});

export const deleteDishAsync = createAsyncThunk<
  string,
  string,
  ThunkApiConfig
>('dishes/delete', async (id, { rejectWithValue }) => {
  try {
    await DishManager.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to delete dish' });
  }
}); 