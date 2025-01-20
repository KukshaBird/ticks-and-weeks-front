import WeekTable from './WeekTable.tsx';
import { WeekData, WeekDay } from './types.ts';
import DUMP_WEEK_DATA from './dumpData.ts';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';
import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const FULL_COLUMNS = ['#', 'Name', 'Was', 'Added', ...DAYS, 'Spent', 'Left'];
const INIT_DAY_DATA = {
  lunch: false,
  breakfast: false,
};

export function Week() {
  const dumpData: WeekData[] = [...DUMP_WEEK_DATA];

  const [data, setData] = React.useState<WeekData[]>([...dumpData]);

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
        spent: weekData.balance.removed, // TODO: Calculate here from days;
        left: weekData.balance.now,
      },
    };

    return [...Object.values(startData), ...days, ...Object.values(endData)];
  });

  return (
    <>
      <h3 className="h-full py-2 flex justify-center w-auto text-stone-600 text-xl font-bold">Week</h3>
      <div className="mb-2.5 min-h-96 p-8">
        <WeekTable rows={rows} columns={FULL_COLUMNS} />
      </div>
    </>
  );
}
