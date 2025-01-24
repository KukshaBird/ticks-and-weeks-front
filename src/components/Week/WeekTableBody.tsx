import WeekTableRow from './WeekTableRow.tsx';
import { TableBody } from '../UI/Table';
import { SetUserState, WeekRow } from './types.ts';
import User from '../../models/User.ts';
import WeekTableDeleteCell from './WeekTableDeleteCell.tsx';
import { EditUser } from '../User/EditUser.tsx';
import { getWeekDay } from './util.ts';
import WeekTableCell from './WeekTableCell.tsx';
import UserManager from '../../managers/UserManager.ts';
import { DAYS, INIT_DAY_DATA } from './constants.ts';
import { WeekDay } from '../../models/types.ts';

interface WeekTableBodyProps {
  data: User[];
  setNewData: SetUserState;
  reRender: () => void;
}

export default function WeekTableBody({ data, setNewData, reRender }: WeekTableBodyProps) {
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

  const rows: WeekRow[] = data.map((weekData, index) => {
    const { startData, days, endData } = {
      startData: {
        deleteButton: <WeekTableDeleteCell id={weekData.id} onDelete={handleDeleteUser} />,
        edit: <EditUser onSubmit={reRender} user={weekData} />,
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

  return (
    <TableBody>
      {rows.map((row, index) => (
        <WeekTableRow key={`tr-${index}`} row={row} />
      ))}
    </TableBody>
  );
}
