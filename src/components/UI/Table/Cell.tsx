import React, { ComponentProps } from 'react';

interface CellProps extends ComponentProps<'td'> {
  cell: string | number | React.JSX.Element;
  head?: boolean;
}

export function Cell({ cell, head = false }: CellProps): React.JSX.Element {
  const CellTag = head ? 'th' : 'td';

  if (typeof cell === 'string' || typeof cell === 'number') {
    return <CellTag className="mx-2 w-full h-full text-center">{cell}</CellTag>;
  } else if (React.isValidElement(cell)) {
    return cell;
  } else {
    return <CellTag className="mx-2 w-full h-full">N/A</CellTag>;
  }
}
