import React, { ComponentProps } from 'react';

interface RowProps extends ComponentProps<'tr'> {
  className?: string;
}

export function Row({ children }: RowProps): React.JSX.Element {
  return <tr className="text-center">{children}</tr>;
}
