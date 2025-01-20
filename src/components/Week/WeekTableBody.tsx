import { JSX } from 'react';
import WeekTableRow from './WeekTableRow.tsx';
import { TableBody } from '../UI/Table';

interface WeekTableBodyProps {
  rows: (string | number | JSX.Element)[][];
}

export default function WeekTableBody({ rows }: WeekTableBodyProps) {
  return (
    <TableBody>
      {rows.map((row) => (
        <WeekTableRow row={row} />
      ))}
    </TableBody>
  );
}
