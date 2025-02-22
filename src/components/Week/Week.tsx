import { useCallback, useContext, useEffect, useState } from 'react';
import WeekTable from './WeekTable.tsx';
import { CreateUser } from '../User/CreateUser.tsx';

import User from '../../models/User.ts';

import UserManager from '../../managers/UserManager.ts';
import DishList from '../Dish/DishList.tsx';
import DishManager from '../../managers/DishManager.ts';
import WeekTitle from './WeekTitle.tsx';
import ResetTable from './ResetTable.tsx';
import { WeekContext } from '../../store/store.ts';

export function Week() {
  const { users, dishes, setUsers, setDishes } = useContext(WeekContext);
  const [reRender, setReRender] = useState(false);

  const fetchUsersCb = useCallback(async () => UserManager.getAll(), []);
  const fetchDishesCb = useCallback(async () => DishManager.getAll(), []);
  const saveUsersCb = useCallback(async (users: User[]) => UserManager.saveAll(users), []);

  const reRenderDrill = () => setReRender((prevProps) => !prevProps);

  useEffect(() => {
    async function fetchDishes(): Promise<void> {
      const dishes = await fetchDishesCb();
      setDishes(dishes);
    }

    fetchDishes().then();
  }, [fetchDishesCb, setDishes]);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const users = await fetchUsersCb();
      setUsers(UserManager.sort(users));
    }

    fetchUsers().then();
  }, [fetchUsersCb, reRender, setUsers]);

  useEffect(() => {
    if (users.length) {
      async function saveUsers(users: User[]) {
        await saveUsersCb(users);
      }

      saveUsers(users).then();
    }
  }, [users, saveUsersCb]);

  return (
    <>
      <WeekTitle />
      <div className={'flex items-center justify-end w-full h-6'}>
        <DishList dishes={dishes} reRender={() => setReRender((prevProps) => !prevProps)} />
        <CreateUser onSubmit={() => setReRender((prevProps) => !prevProps)} />
        <ResetTable />
      </div>
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable data={users} prices={dishes} setNewData={setUsers} reRender={reRenderDrill} />
      </div>
    </>
  );
}
