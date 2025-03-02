import { ReactElement } from 'react';
import { IDish } from '../../models/types.ts';

interface DishProps {
  dish: IDish;
}

export default function DishComponent({ dish }: DishProps): ReactElement {
  return (
    <div>
      <p>
        <span className={'tracking-wide'}>{dish.name.toUpperCase()}</span>:{' '}
        <span className={'font-bold'}>{dish.price}</span>
      </p>
    </div>
  );
}
