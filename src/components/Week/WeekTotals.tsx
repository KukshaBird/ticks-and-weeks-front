import { WeekRow } from './types.ts';
import { Cell } from '../UI/Table';

interface WeekTotalsProps {
  row: WeekRow;
}

export default function WeekTotals({ row }: WeekTotalsProps) {
  return (
    <tfoot>
      <tr className={'border-t-2 border-t-teal-900'}>
        <td />
        <td />
        <td />
        <th scope="row">Total</th>
        {row.map((cell, index) => (
          <Cell key={`cell-${index}`} cell={cell} />
        ))}
      </tr>
    </tfoot>
  );
}
