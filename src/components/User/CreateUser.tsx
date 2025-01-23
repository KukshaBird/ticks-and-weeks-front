import { ReactElement, useRef } from 'react';
import { UserForm } from './UserForm.tsx';

import Button from '../UI/Button.tsx';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import UserManager from '../../managers/UserManager.ts';
import { BaseUser, CreateUser as CreateUserProps } from '../../models/types.ts';

interface Props {
  onSubmit: () => void;
}

export function CreateUser({ onSubmit }: Props): ReactElement {
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
        added: 0,
      },
    };
    UserManager.createUser(baseUser).then(() => {
      onSubmit();
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
      <Button onClick={handleOpenModal}>Create User</Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        <UserForm onClose={handleCloseModel} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}
