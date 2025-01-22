import Input from '../UI/Input.tsx';
import React from 'react';
import { CreateUser } from '../../models/types.ts';

interface FormProps {
  onClose: () => void;
  onSubmit: (data: CreateUser) => void;
}

export function UserForm({ onClose, onSubmit }: FormProps) {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);
    const fsData: Record<string, string> = {};

    fd.forEach((value, key) => {
      if (typeof value === 'string') {
        fsData[key] = value;
      }
    });

    onSubmit({
      name: fsData.name || '',
      startBalance: Number.parseInt(fsData.startBalance) || undefined,
      benefit: fsData.benefit === 'on',
    });
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className={'max-w-md mx-auto bg-sky-100 pb-4'}>
      <h2 className={'text-xl font-bold text-center accent-gray-700 p-4'}>Add User</h2>
      <div>
        <Input label={'User Name'} name={'name'} />
        <Input label={'Free Lunch'} name={'benefit'} type="checkbox" />
        <Input label={'Balance'} name={'startBalance'} type="number" />
      </div>
      <div className="flex justify-end space-x-4 mt-4 mx-4">
        <button type={'button'} className="btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button type={'submit'} className="btn-primary" onClick={handleClose}>
          Confirm
        </button>
      </div>
    </form>
  );
}
