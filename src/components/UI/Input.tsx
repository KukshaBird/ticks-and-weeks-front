import React, { ComponentProps } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  label: string;
  name: string;
  className?: string;
}

export default function Input({ label, name, className, ...props }: InputProps): React.JSX.Element {
  return (
    <div className={`flex gap-2 my-1.5 ${className}`}>
      <label className={'w-1/3 ml-3 block text-gray-700 font-medium'} htmlFor={'benefit'}>
        {label}
      </label>
      <input id={name} className={'w-2/3 mr-2 border rounded'} name={name} {...props} />
    </div>
  );
}
