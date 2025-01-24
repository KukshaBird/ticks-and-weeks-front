import WeekTableHead from './WeekTableHead.tsx';
import WeekTableBody from './WeekTableBody.tsx';
import { Table } from '../UI/Table';
import User from '../../models/User.ts';
import { FULL_COLUMNS } from './constants.ts';
import { SetUserState } from './types.ts';

interface WeekTableProps {
  data: User[];
  reRender: () => void;
  setNewData: SetUserState;
}

export default function WeekTable({ data, reRender, setNewData }: WeekTableProps) {
  return (
    <Table>
      <WeekTableHead columns={FULL_COLUMNS} />
      <WeekTableBody data={data} reRender={reRender} setNewData={setNewData} />
    </Table>
  );
}
