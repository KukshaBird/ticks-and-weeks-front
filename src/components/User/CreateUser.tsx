import { ReactElement, useRef } from 'react';
import { UserForm } from './UserForm.tsx';
import { createUser } from '../../store/usersSlise.ts';

import Button from '../UI/Button.tsx';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import UserManager from '../../managers/UserManager.ts';
import { BaseUser, CreateUser as CreateUserProps } from '../../models/types.ts';
import User from '../../models/User.ts';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';

export function CreateUser(): ReactElement {
  const dispatch = useWeekDispatch();
  const modal = useRef<ModalDisplayHandle>(null);

  const handleClickCrate = (userData: CreateUserProps) => {
    const baseUser: BaseUser = {
      name: userData.name,
      benefit: userData.benefit,
      active: true,
      payments: [],
      balance: {
        was: userData.startBalance || 0,
        now: 0,
        removed: 0,
        added: userData.addedBalance || 0,
      },
    };
    UserManager.createUser(baseUser).then((newUser: User) => {
      dispatch(createUser(newUser.toObject()));
    });
  };

  const handleSubmit = (userData: CreateUserProps) => {
    handleClickCrate(userData);
  };

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

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={
          'mr-4 w-8 h-8 content-center bg-gradient-to-b from-gray-700 to-gray-800 text-white font-semibold rounded-full shadow-md hover:bg-gradient-to-b hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300'
        }
      >
        <span className="fill-teal-500">+</span>
      </Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        <UserForm onClose={handleCloseModel} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}
