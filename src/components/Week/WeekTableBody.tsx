import WeekTableRow from './WeekTableRow.tsx';
import { TableBody } from '../UI/Table';

import { WeekRow } from './types.ts';

interface WeekTableBodyProps {
  rows: WeekRow[];
}

export default function WeekTableBody({ rows }: WeekTableBodyProps) {
  return (
    <TableBody>
      {rows.map((row, index) => (
        <WeekTableRow key={`tr-${index}`} row={row} />
      ))}
    </TableBody>
  );
}
