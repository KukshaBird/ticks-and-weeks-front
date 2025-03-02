import DishComponent from './DishComponent.tsx';
import EditDishes from './EditDishes.tsx';
import { IDish } from '../../models/types.ts';

interface DishListProps {
  dishes: IDish[];
}

export default function DishList({ dishes }: DishListProps) {
  return (
    <div className={'ml-4 flex justify-start content-center w-full gap-4'}>
      <ul className={'flex items-center justify-start gap-2'}>
        <li className="font-bold text-gray-700 m-2">Dishes:</li>
        {dishes.map((dish: IDish) => (
          <li key={dish.id} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" title={dish.name}></div>
            <DishComponent dish={dish} />
          </li>
        ))}
      </ul>
      <EditDishes dishes={dishes} />
    </div>
  );
}
