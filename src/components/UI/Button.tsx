import React, { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  className?: string;
}

export default function Button({ children, className, ...restProps }: ButtonProps): React.ReactElement {
  return (
    <button type="button" className={`${className ? className : ''}`} {...restProps}>
      {children}
    </button>
  );
}
