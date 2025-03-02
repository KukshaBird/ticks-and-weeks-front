import { ReactElement, useRef } from 'react';
import { setDishes } from '../../store/dishesSlise.ts';
import { DishPriceForm } from './DishPriceForm.tsx';
import { IDish, IEditDish } from '../../models/types.ts';
import DishManager from '../../managers/DishManager.ts';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';
import EditIcon from '../UI/icons/EditIcon.tsx';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';

interface EditDishesProps {
  dishes: IDish[];
}

export default function EditDishes({ dishes }: EditDishesProps): ReactElement {
  const modal = useRef<ModalDisplayHandle>(null);
  const dispatch = useWeekDispatch();

  const handleCloseModel = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  const handleOpenModal = () => {
    if (modal.current) {
      modal.current.open();
    }
  };

  const onSubmit = (data: IEditDish) => {
    // TODO: Mode to actions
    DishManager.edit(data).then((dish) => {
      dispatch(
        setDishes({
          dishes: dishes.some((d) => d.id === dish.id)
            ? dishes.map((d) => (d.id === dish.id ? dish.toObject() : d))
            : [...dishes, dish.toObject()],
        })
      );
    });
  };

  return (
    <div className={'content-center'}>
      <Button className={'bg-cyan-700 p-1.5 rounded'} onClick={handleOpenModal}>
        <EditIcon className="w-4 h-4" />
      </Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        {dishes.map((dish) => (
          <DishPriceForm key={dish.id} onClose={handleCloseModel} onSubmit={onSubmit} data={dish} />
        ))}
      </Modal>
    </div>
  );
}
