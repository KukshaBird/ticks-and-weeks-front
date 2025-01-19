import React, { ComponentProps } from 'react';

interface TableProps extends ComponentProps<'table'> {
  className?: string;
}

export function Table({ className, children }: TableProps): React.JSX.Element {
  return <table className={`table-fixed w-full ${className ? className : ''}`}>{children}</table>;
}
