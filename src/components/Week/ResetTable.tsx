import React, { useRef } from 'react';
import Button from '../UI/Button.tsx';
import UserManager from '../../managers/UserManager.ts';
import DishManager from '../../managers/DishManager.ts';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import ConfirmationWarning from '../UI/ConfirmationWarning.tsx';
import { setUsers } from '../../store/usersSlise.ts';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';

export default function ResetTable(): React.ReactElement {
  const modal = useRef<ModalDisplayHandle>(null);
  const dispatch = useWeekDispatch();

  const handleCloseModal = () => {
    if (modal.current) {
      modal.current.close();
    }
  };

  const handleOpenModal = () => {
    if (modal.current) {
      modal.current.open();
    }
  };

  const handlePurge = () => {
    const purgeWeekData = async (): Promise<void> => {
      await UserManager.purge();
      await DishManager.purge();
      dispatch(setUsers({ users: [] }));
    };
    purgeWeekData().then();
  };

  const paragraphClasses = 'font-medium text-center m-1';
  return (
    <>
      <Modal ref={modal} onClose={handleCloseModal}>
        <ConfirmationWarning title={'Delete ALL'} onSubmit={handlePurge} onClose={handleCloseModal}>
          <p className={paragraphClasses}>Are you sure you want to delete ALL week data?</p>
          <p className={paragraphClasses}>This will not be possible to restore.</p>
        </ConfirmationWarning>
      </Modal>
      <Button className={'bg-amber-800 text-white font-bold py-1 px-1 rounded mr-2'} onClick={handleOpenModal}>
        Reset Table
      </Button>
    </>
  );
}
