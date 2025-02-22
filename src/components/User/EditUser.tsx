import { ReactElement, useContext, useRef } from 'react';
import { UserForm } from './UserForm.tsx';

import Button from '../UI/Button.tsx';
import EditIcon from '../UI/icons/EditIcon.tsx';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';

import { CreateUser as CreateUserProps, EditUser as IEditUser } from '../../models/types.ts';
import UserManager from '../../managers/UserManager.ts';
import User from '../../models/User.ts';
import { WeekContext } from '../../store/store.ts';

interface Props {
  user: User;
}

export function EditUser({ user }: Props): ReactElement {
  const { setUsers } = useContext(WeekContext);
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

    UserManager.editUser(prepared).then((user: User) => {
      setUsers((prevUsers) => {
        return prevUsers.some((u) => u.id === user.id)
          ? prevUsers.map((u) => (u.id === user.id ? user : u))
          : [...prevUsers, user];
      });
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
      <Button
        className={
          'p-2 bg-gray-200 text-gray-600 rounded-full shadow hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-all'
        }
        onClick={(event) => {
          handleOpenModal();
          event.currentTarget.blur();
        }}
      >
        <EditIcon className="w-4 h-4" />
      </Button>
      <Modal onClose={handleCloseModel} ref={modal}>
        <UserForm onClose={handleCloseModel} onSubmit={handleSubmit} defaults={user} />
      </Modal>
    </td>
  );
}
