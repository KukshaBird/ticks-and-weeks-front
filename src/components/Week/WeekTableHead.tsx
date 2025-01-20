import { Cell, Row, TableHead } from '../UI/Table';

interface WeekTableHeadProps {
  columns: string[];
}

export default function WeekTableHead({ columns }: WeekTableHeadProps) {
  return (
    <TableHead>
      <Row>
        {columns.map((columnName) => (
          <Cell key={columnName} cell={columnName} head />
        ))}
      </Row>
    </TableHead>
  );
}
