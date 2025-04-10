import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUser, EditUser, IUser } from '../../models/types.ts';
import UserManager from '../../managers/UserManager.ts';

// Define return types
type ThunkApiConfig = {
  rejectValue: { message: string };
};

export const fetchUsers = createAsyncThunk<IUser[], void, ThunkApiConfig>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const users = await UserManager.getAll();
      return users.map((user) => user.toObject());
    } catch (error) {
      return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to fetch users' });
    }
  }
);

export const createUserAsync = createAsyncThunk<IUser, BaseUser, ThunkApiConfig>(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = await UserManager.createUser(userData);
      return newUser.toObject();
    } catch (error) {
      return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to create user' });
    }
  }
);

export const updateUserAsync = createAsyncThunk<IUser, EditUser, ThunkApiConfig>(
  'users/update',
  async (userData, { rejectWithValue }) => {
    try {
      const updatedUser = await UserManager.editUser(userData);
      return updatedUser.toObject();
    } catch (error) {
      console.error(error);
      return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to update user' });
    }
  }
);

export const deleteUserAsync = createAsyncThunk<string, string, ThunkApiConfig>(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await UserManager.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue({ message: error instanceof Error ? error.message : 'Failed to delete user' });
    }
  }
);
