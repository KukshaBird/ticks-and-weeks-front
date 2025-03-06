import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './weekStore.ts';
import { IUser } from '../models/types.ts';
import { createUserAsync, deleteUserAsync, fetchUsers, updateUserAsync } from './thunks/userThunks.ts';

interface UsersState {
  users: IUser[];
  pendingUpdates: Record<string, IUser>;
  error: string | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  pendingUpdates: {},
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      state.users = action.payload.users;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.pendingUpdates = {};
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Failed to fetch users';
      })
      // Create user
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Failed to create user';
      })
      // Update user
      .addCase(updateUserAsync.pending, (state, action) => {
        state.error = null;
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
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex > -1) {
          state.users[userIndex] = action.payload;
        }
        delete state.pendingUpdates[action.payload.id];
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? 'Failed to update user';
        if (action.meta.arg.id) {
          delete state.pendingUpdates[action.meta.arg.id];
        }
      })
      // Delete user
      .addCase(deleteUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.payload?.message ?? 'Failed to delete user';
      });
  },
});

export const { setUsers, clearError } = userSlice.actions;

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (usersState) => ({
    users: usersState.users,
    pendingUpdates: usersState.pendingUpdates,
    error: usersState.error,
    isLoading: usersState.isLoading,
  })
);

export { fetchUsers, createUserAsync, updateUserAsync, deleteUserAsync };
export default userSlice.reducer;
