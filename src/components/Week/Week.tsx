import React, { useCallback, useEffect } from 'react';
import WeekTable from './WeekTable.tsx';
import WeekTableCell from './WeekTableCell.tsx';
import { CreateUser } from '../User/CreateUser.tsx';

import User from '../../models/User.ts';
import { getWeekDay } from './util.ts';

import UserManager from '../../managers/UserManager.ts';
import { WeekDay } from './types.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const FULL_COLUMNS = ['#', 'Name', 'Was', 'Added', ...DAYS, 'Spent', 'Left'];
const INIT_DAY_DATA = {
  lunch: false,
  breakfast: false,
};

export function Week() {
  const [data, setData] = React.useState<User[]>([]);

  const handleToggle = (
    { id, dayName }: { id: string; dayName: string },
    payment: {
      lunch: boolean;
      breakfast: boolean;
    }
  ) => {
    const newData = [...data];

    const weekDataIndex = newData.findIndex((user) => user.id === id);

    if (weekDataIndex === -1) return;

    const payments = newData[weekDataIndex].payments;
    const paymentIndex = payments.findIndex((day) => day.day === dayName);

    if (paymentIndex !== -1) {
      payments[paymentIndex] = { ...payments[paymentIndex], ...payment };
    } else {
      payments.push({ day: dayName as WeekDay, ...payment });
    }

    setData(newData);
  };

  const fetchUsersCb = useCallback(async () => UserManager.getAll(), []);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const users = await fetchUsersCb();
      setData(users);
    }

    fetchUsers().then();
  }, [fetchUsersCb]);

  const rows = data.map((weekData, index) => {
    const { startData, days, endData } = {
      startData: {
        order: index + 1,
        name: weekData.name,
        was: weekData.balance.was,
        added: weekData.balance.added,
      },
      days: DAYS.map(
        (dayName) =>
          getWeekDay(
            dayName as WeekDay,
            weekData.payments.map((p) => ({
              ...p,
              benefit: weekData.benefit,
              active: weekData.active,
            }))
          ) || {
            ...INIT_DAY_DATA,
            day: dayName,
            benefit: weekData.benefit,
            active: weekData.active,
          }
      ).map((day) => (
        <WeekTableCell data={day} onClick={handleToggle.bind(null, { id: weekData.id, dayName: day.day })} />
      )),
      endData: {
        spent: weekData.balanceSpent(),
        left: weekData.balanceLeft(),
      },
    };

    return [...Object.values(startData), ...days, ...Object.values(endData)];
  });

  useEffect(() => {
    return () => {
      if (data.length) {
        UserManager.saveAll(data).then(() => {});
      }
    };
  }, [data]);

  return (
    <>
      <h3 className="h-full py-2 flex justify-center w-auto text-stone-600 text-xl font-bold">Week</h3>
      <CreateUser />
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable rows={rows} columns={FULL_COLUMNS} />
      </div>
    </>
  );
}
