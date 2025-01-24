import { ReactElement, useRef } from 'react';
import { UserForm } from './UserForm.tsx';

import Button from '../UI/Button.tsx';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import { CreateUser as CreateUserProps, EditUser as IEditUser } from '../../models/types.ts';
import UserManager from '../../managers/UserManager.ts';
import User from '../../models/User.ts';

interface Props {
  onSubmit: () => void;
  user: User;
}

export function EditUser({ onSubmit, user }: Props): ReactElement {
  const modal = useRef<ModalDisplayHandle>(null);

  const handleSubmit = (userData: CreateUserProps) => {
    const prepared: IEditUser = {
      id: user.id,
      name: userData.name,
      balance: {
        ...user.balance,
        was: userData.startBalance ?? user.balance.was,
        added: userData.addedBalance ?? user.balance.added,
      },
      benefit: Boolean(userData.benefit),
    };

    UserManager.editUser(prepared).then(() => {
      onSubmit();
    });
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
    <td>
      <Button className={'btn-primary'} onClick={handleOpenModal}>
        Edit
      </Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        <UserForm onClose={handleCloseModel} onSubmit={handleSubmit} defaults={user} />
      </Modal>
    </td>
  );
}
