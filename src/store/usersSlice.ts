import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { BaseUser, EditUser, IUser } from '../models/types.ts';
import UserManager from '../managers/UserManager.ts';

interface UsersState {
  users: IUser[];
  pendingUpdates: Record<string, IUser>;
}

const initialState: UsersState = {
  users: [],
  pendingUpdates: {},
};

// Thunks
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const users = await UserManager.getAll();
  return users.map((user) => user.toObject());
});

export const createUserAsync = createAsyncThunk('users/create', async (userData: BaseUser) => {
  const newUser = await UserManager.createUser(userData);
  return newUser.toObject();
});

export const updateUserAsync = createAsyncThunk('users/update', async (userData: EditUser) => {
  const updatedUser = await UserManager.editUser(userData);
  return updatedUser.toObject();
});

export const deleteUserAsync = createAsyncThunk('users/delete', async (id: string) => {
  await UserManager.deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      state.users = action.payload.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        state.pendingUpdates = {};
      })
      .addCase(createUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        const userData = action.meta.arg;
        const userIndex = state.users.findIndex((user) => user.id === userData.id);
        if (userIndex > -1) {
          const currentUser = state.users[userIndex];
          state.pendingUpdates[userData.id] = {
            ...currentUser,
            name: userData.name ?? currentUser.name,
            benefit: userData.benefit ?? currentUser.benefit,
            active: userData.active ?? currentUser.active,
            balance: userData.balance 
              ? {
                  ...currentUser.balance,
                  was: userData.balance.was,
                  added: userData.balance.added,
                }
              : currentUser.balance,
            payments: userData.payments ?? currentUser.payments,
          };
        }
      })
      .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex > -1) {
          state.users[userIndex] = action.payload;
        }
        delete state.pendingUpdates[action.payload.id];
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        if (action.meta.arg.id) {
          delete state.pendingUpdates[action.meta.arg.id];
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setUsers } = userSlice.actions;

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (usersState) => ({
    users: usersState.users,
    pendingUpdates: usersState.pendingUpdates,
  })
);

export default userSlice.reducer;
