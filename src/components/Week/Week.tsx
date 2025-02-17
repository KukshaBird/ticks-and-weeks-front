import React, { useCallback, useEffect, useState } from 'react';
import WeekTable from './WeekTable.tsx';
import { CreateUser } from '../User/CreateUser.tsx';

import User from '../../models/User.ts';

import UserManager from '../../managers/UserManager.ts';
import DishList from '../Dish/DishList.tsx';
import Dish from '../../models/Dish.ts';
import DishManager from '../../managers/DishManager.ts';
import WeekTitle from './WeekTitle.tsx';

export function Week() {
  const [data, setData] = React.useState<User[]>([]);
  const [dishes, setDishes] = React.useState<Dish[]>([]);
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
  }, [fetchDishesCb]);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const users = await fetchUsersCb();
      setData(UserManager.sort(users));
    }

    fetchUsers().then();
  }, [fetchUsersCb, reRender]);

  useEffect(() => {
    if (data.length) {
      async function saveUsers(users: User[]) {
        await saveUsersCb(users);
      }

      saveUsers(data).then();
    }
  }, [data, saveUsersCb]);

  return (
    <>
      <WeekTitle />
      <div className={'flex items-center justify-end w-full h-6'}>
        <DishList dishes={dishes} reRender={() => setReRender((prevProps) => !prevProps)} />
        <CreateUser onSubmit={() => setReRender((prevProps) => !prevProps)} />
      </div>
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable data={data} setNewData={setData} reRender={reRenderDrill} />
      </div>
    </>
  );
}
