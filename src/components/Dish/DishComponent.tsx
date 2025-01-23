import { ReactElement } from 'react';
import Dish from '../../models/Dish.ts';

interface DishProps {
  dish: Dish;
}

export default function DishComponent({ dish }: DishProps): ReactElement {
  return (
    <div className={'flex justify-start p1 m2 border-2 border-b-amber-900'}>
      <p>
        {dish.name.toUpperCase()}: {dish.price}
      </p>
    </div>
  );
}
