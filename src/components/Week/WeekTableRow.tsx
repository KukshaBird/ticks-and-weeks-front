import React, { JSX } from 'react';
import { Cell, Row } from '../UI/Table';

interface WeekTableRowProps {
  row: (string | number | JSX.Element)[];
}

export default function WeekTableRow({ row }: WeekTableRowProps) {
  return (
    <Row>
      {row.map(
        (cell, index): React.ReactElement => (
          <Cell key={`cell-${index}`} cell={cell} colSpan={2} />
        )
      )}
    </Row>
  );
}
