import { useEffect } from 'react';
import WeekTable from './WeekTable.tsx';
import { CreateUser } from '../User/CreateUser.tsx';
import DishList from '../Dish/DishList.tsx';
import WeekTitle from './WeekTitle.tsx';
import ResetTable from './ResetTable.tsx';
import { useWeekDispatch, useWeekSelector } from '../../hooks/stateHooks.ts';
import { fetchUsers, selectUsers } from '../../store/usersSlice.ts';
import { fetchDishes, selectDishes } from '../../store/dishesSlice.ts';

export function Week() {
  const { users } = useWeekSelector(selectUsers);
  const { dishes } = useWeekSelector(selectDishes);
  const dispatch = useWeekDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <WeekTitle />
      <div className={'flex items-center justify-end w-full h-6'}>
        <DishList dishes={dishes} />
        <CreateUser />
        <ResetTable />
      </div>
      <div className="mb-2.5 min-h-96 p-8">{dishes.length ? <WeekTable users={users} prices={dishes} /> : null}</div>
    </>
  );
}
