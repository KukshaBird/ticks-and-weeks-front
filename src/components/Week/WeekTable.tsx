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

import { IDish, IUser, WeekDay } from '../../models/types.ts';
import { SetUserState, WeekRow } from './types.ts';
import { fillTotals } from './utils.ts';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';
import { deleteUser } from '../../store/usersSlice.ts';

interface WeekTableProps {
  data: IUser[];
  prices: IDish[];
  setNewData: SetUserState;
}

export default function WeekTable({ data, prices, setNewData }: WeekTableProps) {
  const dispatch = useWeekDispatch();
  const users = data.map((user: IUser) => User.fromJSON(user));
  const handleToggle = (
    { id, dayName }: { id: string; dayName: string },
    payment: {
      lunch: boolean;
      breakfast: boolean;
    }
  ) => {
    const newData: User[] = [...users];

    const weekDataIndex = newData.findIndex((user) => user.id === id);

    if (weekDataIndex === -1) return;

    const payments = [...newData[weekDataIndex].payments];
    const paymentIndex = payments.findIndex((day) => day.day === dayName);

    if (paymentIndex !== -1) {
      payments[paymentIndex] = { ...payments[paymentIndex], ...payment };
    } else {
      payments.push({ day: dayName as WeekDay, ...payment });
    }
    newData[weekDataIndex].payments = payments;

    setNewData(newData.map((user) => user.toObject()));
  };

  const handleDeleteUser = (id: string) => {
    UserManager.deleteUser(id).then(() => {
      dispatch(deleteUser({ id }));
    });
  };

  const totals: number[] = [
    data.reduce((acc, user) => acc + user.balance.was, 0),
    data.reduce((acc, user) => acc + user.balance.added, 0),
  ];

  const rows: WeekRow[] = users.map((user, index) => {
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

    fillTotals(totals, filledDays, users, prices);

    const { startData, days, endData } = {
      startData: {
        deleteButton: <WeekTableDeleteCell id={user.id} onDelete={handleDeleteUser} />,
        edit: <EditUser user={user} />,
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
    users.reduce((acc, user) => acc + user.balanceSpent(prices), 0),
    users.reduce((acc, user) => acc + user.balanceLeft(prices), 0)
  );

  return (
    <Table>
      <WeekTableHead columns={FULL_COLUMNS} />
      <WeekTableBody rows={rows} />
      <WeekTotals row={totals} />
    </Table>
  );
}
