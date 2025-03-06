import { useCallback, useEffect } from 'react';
import WeekTable from './WeekTable.tsx';
import { CreateUser } from '../User/CreateUser.tsx';

import User from '../../models/User.ts';

import UserManager from '../../managers/UserManager.ts';
import DishList from '../Dish/DishList.tsx';
import DishManager from '../../managers/DishManager.ts';
import WeekTitle from './WeekTitle.tsx';
import ResetTable from './ResetTable.tsx';
import { useWeekDispatch, useWeekSelector } from '../../hooks/stateHooks.ts';
import { selectUsers, setUsers } from '../../store/usersSlice.ts';
import { selectDishes, setDishes } from '../../store/dishesSlice.ts';
import { IUser } from '../../models/types.ts';

export function Week() {
  const { users } = useWeekSelector(selectUsers);
  const { dishes } = useWeekSelector(selectDishes);
  const dispatch = useWeekDispatch();
  const fetchUsersCb = useCallback(async () => UserManager.getAll(), []);
  const fetchDishesCb = useCallback(async () => DishManager.getAll(), []);
  const saveUsersCb = useCallback(async (users: User[]) => UserManager.saveAll(users), []);

  useEffect(() => {
    async function fetchDishes(): Promise<void> {
      const dishes = await fetchDishesCb();
      dispatch(setDishes({ dishes: dishes.map((dish) => dish.toObject()) }));
    }

    fetchDishes().then();
  }, [fetchDishesCb, dispatch]);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const users = await fetchUsersCb();
      dispatch(setUsers({ users: UserManager.sort(users).map((user) => user.toObject()) }));
    }

    fetchUsers().then();
  }, [fetchUsersCb, dispatch]);

  useEffect(() => {
    if (users.length) {
      async function saveUsers(users: User[]) {
        await saveUsersCb(users);
      }

      saveUsers(users.map((user) => User.fromJSON(user))).then();
    }
  }, [users, saveUsersCb]);

  const handleSetNewData = (users: IUser[]): void => {
    dispatch(setUsers({ users }));
  };

  return (
    <>
      <WeekTitle />
      <div className={'flex items-center justify-end w-full h-6'}>
        <DishList dishes={dishes} />
        <CreateUser />
        <ResetTable />
      </div>
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable data={users} prices={dishes} setNewData={handleSetNewData} />
      </div>
    </>
  );
}
