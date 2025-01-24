import { ReactElement } from 'react';
import Dish from '../../models/Dish.ts';

interface DishProps {
  dish: Dish;
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
