import { ComponentProps } from 'react';

interface TableBodyProps extends ComponentProps<'tbody'> {
  className?: string;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}
