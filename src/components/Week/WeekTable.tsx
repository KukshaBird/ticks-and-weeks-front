import WeekTableHead from './WeekTableHead.tsx';
import WeekTableBody from './WeekTableBody.tsx';
import { Table } from '../UI/Table';
import { DAYS, FULL_COLUMNS, INIT_DAY_DATA } from './constants.ts';
import WeekTotals from './WeekTotals.tsx';
import WeekTableDeleteCell from './WeekTableDeleteCell.tsx';
import { EditUser } from '../User/EditUser.tsx';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';
import User from '../../models/User.ts';
import { IDish, IUser, WeekDay } from '../../models/types.ts';
import { WeekRow } from './types.ts';
import { fillTotals } from './utils.ts';
import { useWeekDispatch, useWeekSelector } from '../../hooks/stateHooks.ts';
import { updateUserAsync, deleteUserAsync } from '../../store/usersSlice.ts';
import { selectUsers } from '../../store/usersSlice.ts';

interface WeekTableProps {
  data: IUser[];
  prices: IDish[];
}

export default function WeekTable({ data, prices }: WeekTableProps) {
  const dispatch = useWeekDispatch();
  const { users, pendingUpdates } = useWeekSelector(selectUsers);
  const mappedUsers = data.map((user: IUser) => 
    pendingUpdates[user.id] 
      ? User.fromJSON(pendingUpdates[user.id])
      : User.fromJSON(user)
  );

  const handleToggle = (
    { id, dayName }: { id: string; dayName: string },
    payment: {
      lunch: boolean;
      breakfast: boolean;
    }
  ) => {
    const user = mappedUsers.find((u) => u.id === id);
    if (!user) return;

    const updatedUser = User.fromJSON({
      ...user.toObject(),
      payments: [...user.payments]
    });

    const paymentIndex = updatedUser.payments.findIndex((day) => day.day === dayName);
    if (paymentIndex !== -1) {
      updatedUser.payments[paymentIndex] = { ...updatedUser.payments[paymentIndex], ...payment };
    } else {
      updatedUser.payments.push({ day: dayName as WeekDay, ...payment });
    }

    dispatch(updateUserAsync(updatedUser.toObject()));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUserAsync(id));
  };

  const totals: number[] = [
    mappedUsers.reduce((acc, user) => acc + user.balance.was, 0),
    mappedUsers.reduce((acc, user) => acc + user.balance.added, 0),
  ];

  const rows: WeekRow[] = mappedUsers.map((user, index) => {
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

    fillTotals(totals, filledDays, mappedUsers, prices);

    const { startData, days, endData } = {
      startData: {
        deleteButton: <WeekTableDeleteCell id={user.id} onDelete={handleDeleteUser} />,
        edit: <EditUser user={user.toObject()} />,
        order: index + 1,
        name: user.name,
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
        spent: user.balanceSpent(prices),
        left: user.balanceLeft(prices),
      },
    };

    return [...Object.values(startData), ...days, ...Object.values(endData)];
  });

  totals.push(
    mappedUsers.reduce((acc, user) => acc + user.balanceSpent(prices), 0),
    mappedUsers.reduce((acc, user) => acc + user.balanceLeft(prices), 0)
  );

  return (
    <Table>
      <WeekTableHead columns={FULL_COLUMNS} />
      <WeekTableBody rows={rows} />
      <WeekTotals row={totals} />
    </Table>
  );
}
