import Dish from '../../models/Dish.ts';
import DishComponent from './DishComponent.tsx';

interface DishListProps {
  dishes: Dish[];
}

export default function DishList({ dishes }: DishListProps) {
  return (
    <div>
      <ul>
        {dishes.map((dish: Dish) => (
          <li key={dish.id}>
            <DishComponent dish={dish} />
          </li>
        ))}
      </ul>
    </div>
  );
}
