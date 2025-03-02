import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { IUser } from '../models/types.ts';

interface UsersState {
  users: IUser[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      state.users = action.payload.users;
    },
    createUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex > -1) {
        state.users[userIndex] = action.payload;
      }
    },
  },
});

export const { setUsers, deleteUser, createUser, updateUser } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
