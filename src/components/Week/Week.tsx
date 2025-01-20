import WeekTable from './WeekTable.tsx';
import { WeekData, WeekDay } from './types.ts';
import DUMP_WEEK_DATA from './dumpData.ts';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const FULL_COLUMNS = ['#', 'Name', 'Was', 'Added', ...DAYS, 'Spent', 'Left'];
const INIT_DAY_DATA = {
  lunch: false,
  breakfast: false,
};

export function Week() {
  const data: WeekData[] = [...DUMP_WEEK_DATA];

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
            benefit: weekData.benefit,
            active: weekData.active,
          }
      ).map((day) => {
        return day ? <WeekTableCell data={day} /> : <td className="mx-2 w-full h-full "></td>;
      }),
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
