import { ReactElement, useContext, useRef } from 'react';
import Dish from '../../models/Dish.ts';
import { DishPriceForm } from './DishPriceForm.tsx';
import { IEditDish } from '../../models/types.ts';
import DishManager from '../../managers/DishManager.ts';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';
import EditIcon from '../UI/icons/EditIcon.tsx';
import { WeekContext } from '../../store/store.ts';

interface EditDishesProps {
  dishes: Dish[];
}

export default function EditDishes({ dishes }: EditDishesProps): ReactElement {
  const { setDishes } = useContext(WeekContext);
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
    DishManager.edit(data).then((dish) => {
      setDishes((prevState) => {
        return prevState.some((d) => d.id === dish.id)
          ? prevState.map((d) => (d.id === dish.id ? dish : d))
          : [...prevState, dish];
      });
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
