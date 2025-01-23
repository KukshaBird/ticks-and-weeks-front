import { ReactElement, useRef } from 'react';
import Dish from '../../models/Dish.ts';
import { DishPriceForm } from './DishPriceForm.tsx';
import { IEditDish } from '../../models/types.ts';
import DishManager from '../../managers/DishManager.ts';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';

interface EditDishesProps {
  dishes: Dish[];
  reRender: () => void;
}

export default function EditDishes({ dishes, reRender }: EditDishesProps): ReactElement {
  const modal = useRef<ModalDisplayHandle>(null);

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
    DishManager.edit(data).then(() => {
      reRender();
    });
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Edit</Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        {dishes.map((dish) => (
          <DishPriceForm key={dish.id} onClose={handleCloseModel} onSubmit={onSubmit} data={dish} />
        ))}
      </Modal>
    </div>
  );
}
