import React, { ComponentProps } from 'react';

interface FormProps extends ComponentProps<'form'> {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
}

export default function Form({ title, handleSubmit, children, ...props }: FormProps) {
  return (
    <form onSubmit={handleSubmit} className={'max-w-md mx-auto bg-sky-100 pb-4'} {...props}>
      <h2 className={'text-xl font-bold text-center accent-gray-700 p-4'}>{title}</h2>
      {children}
    </form>
  );
}
