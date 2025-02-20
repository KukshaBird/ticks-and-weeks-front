import WeekTableHead from './WeekTableHead.tsx';
import WeekTableBody from './WeekTableBody.tsx';
import { Table } from '../UI/Table';
import { DAYS, FULL_COLUMNS, INIT_DAY_DATA } from './constants.ts';
import WeekTotals from './WeekTotals.tsx';
import UserManager from '../../managers/UserManager.ts';
import WeekTableDeleteCell from './WeekTableDeleteCell.tsx';
import { EditUser } from '../User/EditUser.tsx';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';
import User from '../../models/User.ts';

import { WeekDay } from '../../models/types.ts';
import { SetUserState, WeekRow } from './types.ts';
import { fillTotals } from './utils.ts';
import Dish from '../../models/Dish.ts';

interface WeekTableProps {
  data: User[];
  prices: Dish[];
  reRender: () => void;
  setNewData: SetUserState;
}

export default function WeekTable({ data, prices, reRender, setNewData }: WeekTableProps) {
  const handleToggle = (
    { id, dayName }: { id: string; dayName: string },
    payment: {
      lunch: boolean;
      breakfast: boolean;
    }
  ) => {
    const newData: User[] = [...data];

    const weekDataIndex = newData.findIndex((user) => user.id === id);

    if (weekDataIndex === -1) return;

    const payments = newData[weekDataIndex].payments;
    const paymentIndex = payments.findIndex((day) => day.day === dayName);

    if (paymentIndex !== -1) {
      payments[paymentIndex] = { ...payments[paymentIndex], ...payment };
    } else {
      payments.push({ day: dayName as WeekDay, ...payment });
    }

    setNewData(newData);
  };

  const handleDeleteUser = (id: string) => {
    UserManager.deleteUser(id).then(() => {
      setNewData((prevData) => {
        const newData = [...prevData];
        return newData.filter((user) => user.id !== id);
      });
    });
  };

  const totals: number[] = [
    data.reduce((acc, user) => acc + user.balance.was, 0),
    data.reduce((acc, user) => acc + user.balance.added, 0),
  ];

  const rows: WeekRow[] = data.map((user, index) => {
    const filledDays = DAYS.map(
      (dayName) =>
        getWeekDay(
          dayName as WeekDay,
          user.payments.map((p) => ({
            ...p,
            benefit: user.benefit,
            active: user.active,
          }))
        ) || {
          ...INIT_DAY_DATA,
          day: dayName,
          benefit: user.benefit,
          active: user.active,
        }
    );

    fillTotals(totals, filledDays, data, prices);

    const { startData, days, endData } = {
      startData: {
        deleteButton: <WeekTableDeleteCell id={user.id} onDelete={handleDeleteUser} />,
        edit: <EditUser onSubmit={reRender} user={user} />,
        order: index + 1,
        name: user.name,
        was: user.balance.was,
        added: user.balance.added,
      },
      days: filledDays.map((day) => (
        <WeekTableCell
          data={day}
          onClick={handleToggle.bind(null, {
            id: user.id,
            dayName: day.day,
          })}
        />
      )),
      endData: {
        spent: user.balanceSpent(prices),
        left: user.balanceLeft(prices),
      },
    };

    return [...Object.values(startData), ...days, ...Object.values(endData)];
  });

  totals.push(
    data.reduce((acc, user) => acc + user.balanceSpent(prices), 0),
    data.reduce((acc, user) => acc + user.balanceLeft(prices), 0)
  );

  return (
    <Table>
      <WeekTableHead columns={FULL_COLUMNS} />
      <WeekTableBody rows={rows} />
      <WeekTotals row={totals} />
    </Table>
  );
}
