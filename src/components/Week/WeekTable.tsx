import WeekTableHead from './WeekTableHead.tsx';
import WeekTableBody from './WeekTableBody.tsx';
import { Table } from '../UI/Table';
import { DAYS, FULL_COLUMNS, INIT_DAY_DATA } from './constants.ts';
import WeekTotals from './WeekTotals.tsx';
import WeekTableDeleteCell from './WeekTableDeleteCell.tsx';
import { EditUser } from '../User/EditUser.tsx';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';
import { IDish, IUser, WeekDay } from '../../models/types.ts';
import { WeekRow } from './types.ts';
import { fillTotals, userBalanceLeft, userBalanceSpent } from './utils.ts';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';
import { deleteUserAsync, updateUserAsync } from '../../store/usersSlice.ts';

interface WeekTableProps {
  users: IUser[];
  prices: IDish[];
}

export default function WeekTable({ users, prices }: WeekTableProps) {
  const dispatch = useWeekDispatch();

  const handleToggle = (
    { id, dayName }: { id: string; dayName: string },
    payment: { lunch: boolean; breakfast: boolean }
  ) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const updatedUser = {
      ...user,
      payments: [...user.payments],
    };

    const paymentIndex = updatedUser.payments.findIndex((day) => day.day === dayName);
    if (paymentIndex !== -1) {
      updatedUser.payments[paymentIndex] = { ...updatedUser.payments[paymentIndex], ...payment };
    } else {
      updatedUser.payments.push({ day: dayName as WeekDay, ...payment });
    }

    dispatch(updateUserAsync(updatedUser));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUserAsync(id));
  };

  const totals: number[] = [
    users.reduce((acc, user) => acc + user.balance.was, 0),
    users.reduce((acc, user) => acc + user.balance.added, 0),
  ];

  const rows: WeekRow[] = users.map((user, index) => {
    const filledDays = DAYS.map(
      (dayName) =>
        getWeekDay(
          dayName as WeekDay,
          user.payments.map((p) => ({
            ...p,
            benefit: user.benefit || false,
            active: user.active,
          }))
        ) || {
          ...INIT_DAY_DATA,
          day: dayName,
          benefit: user.benefit || false,
          active: user.active,
        }
    );

    fillTotals(totals, filledDays, users, prices);

    const { startData, days, endData } = {
      startData: {
        deleteButton: <WeekTableDeleteCell id={user.id} onDelete={handleDeleteUser} />,
        edit: <EditUser user={user} />,
        order: index + 1,
        name: <td>{user.name}</td>,
        was: user.balance.was,
        added: user.balance.added,
      },
      days: filledDays.map((day) => (
        <WeekTableCell
          key={`${user.id}-${day.day}`}
          data={day}
          onClick={(payment) => handleToggle({ id: user.id, dayName: day.day }, payment)}
        />
      )),
      endData: {
        spent: userBalanceSpent(user, prices),
        left: userBalanceLeft(user, prices),
      },
    };

    return [...Object.values(startData), ...days, ...Object.values(endData)];
  });

  totals.push(
    users.reduce((acc, user) => acc + userBalanceSpent(user, prices), 0),
    users.reduce((acc, user) => acc + userBalanceLeft(user, prices), 0)
  );

  return (
    <Table>
      <WeekTableHead columns={FULL_COLUMNS} />
      <WeekTableBody rows={rows} />
      <WeekTotals row={totals} />
    </Table>
  );
}
