import React from 'react';
import { IDish, IEditDish } from '../../models/types.ts';
import Form from '../UI/Form.tsx';
import Input from '../UI/Input.tsx';

interface FormProps {
  onClose: () => void;
  onSubmit: (data: IEditDish) => void;
  data: IDish;
}

export function DishPriceForm({ onClose, onSubmit, data }: FormProps) {
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
      ...data,
      name: fsData.name ?? data.name,
      price: Number.parseInt(fsData.price) ?? data.price,
    });

    event.currentTarget.reset();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Form handleSubmit={handleSubmit} className={'max-w-md mx-auto bg-sky-100 pb-4'} title={'Edit Prices'}>
      <Input label={'Name'} name={'name'} defaultValue={data.name} />
      <Input label={'Price'} name={'price'} defaultValue={data.price} />
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
