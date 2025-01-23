import Dish from '../../models/Dish.ts';
import DishComponent from './DishComponent.tsx';
import EditDishes from './EditDishes.tsx';

interface DishListProps {
  dishes: Dish[];
  reRender: () => void;
}

export default function DishList({ dishes, reRender }: DishListProps) {
  return (
    <div>
      <ul>
        {dishes.map((dish: Dish) => (
          <li key={dish.id}>
            <DishComponent dish={dish} />
          </li>
        ))}
      </ul>
      <EditDishes dishes={dishes} reRender={reRender} />
    </div>
  );
}
