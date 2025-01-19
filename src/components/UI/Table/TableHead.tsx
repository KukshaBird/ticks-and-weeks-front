import { ComponentProps } from 'react';

interface TableHeadProps extends ComponentProps<'thead'> {
  className?: string;
}

export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}
