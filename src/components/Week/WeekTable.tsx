import WeekTableHead from './WeekTableHead.tsx';
import WeekTableBody from './WeekTableBody.tsx';
import { Table } from '../UI/Table';
import { JSX } from 'react';

interface WeekTableProps {
  rows: (string | number | JSX.Element)[][];
  columns: string[];
}

export default function WeekTable({ rows, columns }: WeekTableProps) {
  return (
    <Table>
      <WeekTableHead columns={columns} />
      <WeekTableBody rows={rows} />
    </Table>
  );
}
