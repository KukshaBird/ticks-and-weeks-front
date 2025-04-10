import Input from '../UI/Input.tsx';
import React from 'react';
import { CreateUser, IUser } from '../../models/types.ts';
import Form from '../UI/Form.tsx';

interface FormProps {
  onClose: () => void;
  onSubmit: (data: CreateUser) => void;
  defaults?: IUser;
}

const INIT_DATA: CreateUser = {
  name: '',
  benefit: true,
  startBalance: 0,
  addedBalance: 0,
};

export function UserForm({ onClose, onSubmit, defaults }: FormProps) {
  const defaultData = {
    name: defaults?.name || INIT_DATA.name,
    benefit: (defaults && defaults.benefit) ?? INIT_DATA.benefit,
    startBalance: defaults ? defaults.balance.was : INIT_DATA.startBalance,
    addedBalance: defaults ? defaults.balance.added : INIT_DATA.addedBalance,
  };

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
      benefit: fsData.benefit === 'on',
      startBalance: Number.parseInt(fsData.startBalance) || undefined,
      addedBalance: Number.parseInt(fsData.addedBalance) || undefined,
    });

    event.currentTarget.reset();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Form handleSubmit={handleSubmit} className={'max-w-md mx-auto bg-sky-100 pb-4'} title={'Add User'}>
      <div>
        <Input label={'User Name'} name={'name'} defaultValue={defaultData.name} />
        <Input label={'Free Lunch'} name={'benefit'} type="checkbox" defaultChecked={defaultData.benefit} />
        <Input label={'Start Balance'} name={'startBalance'} type="number" defaultValue={defaultData.startBalance} />
        <Input label={'Added Balance'} name={'addedBalance'} type="number" defaultValue={defaultData.addedBalance} />
      </div>
      <div className="flex justify-end space-x-4 mt-4 mx-4">
        <button type={'reset'} className="btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button type={'submit'} className="btn-primary" onClick={handleClose}>
          Confirm
        </button>
      </div>
    </Form>
  );
}
