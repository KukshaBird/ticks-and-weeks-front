import { useEffect } from 'react';
import WeekTable from './WeekTable.tsx';
import { CreateUser } from '../User/CreateUser.tsx';
import DishList from '../Dish/DishList.tsx';
import DishManager from '../../managers/DishManager.ts';
import WeekTitle from './WeekTitle.tsx';
import ResetTable from './ResetTable.tsx';
import { useWeekDispatch, useWeekSelector } from '../../hooks/stateHooks.ts';
import { selectUsers, fetchUsers } from '../../store/usersSlice.ts';
import { selectDishes, setDishes } from '../../store/dishesSlice.ts';

export function Week() {
  const { users } = useWeekSelector(selectUsers);
  const { dishes } = useWeekSelector(selectDishes);
  const dispatch = useWeekDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    async function fetchDishes(): Promise<void> {
      const dishes = await DishManager.getAll();
      dispatch(setDishes({ dishes: dishes.map((dish) => dish.toObject()) }));
    }

    fetchDishes().then();
  }, [dispatch]);

  return (
    <>
      <WeekTitle />
      <div className={'flex items-center justify-end w-full h-6'}>
        <DishList dishes={dishes} />
        <CreateUser />
        <ResetTable />
      </div>
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable data={users} prices={dishes} />
      </div>
    </>
  );
}
