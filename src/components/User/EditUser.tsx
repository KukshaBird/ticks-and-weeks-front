import { ReactElement, useRef } from 'react';
import { UserForm } from './UserForm.tsx';
import { updateUserAsync } from '../../store/usersSlice.ts';
import Button from '../UI/Button.tsx';
import EditIcon from '../UI/icons/EditIcon.tsx';
import { Modal, ModalDisplayHandle } from '../UI/Modal.tsx';
import { CreateUser as CreateUserProps, EditUser as IEditUser, IUser } from '../../models/types.ts';
import { useWeekDispatch } from '../../hooks/stateHooks.ts';

interface Props {
  user: IUser;
}

export function EditUser({ user }: Props): ReactElement {
  const modal = useRef<ModalDisplayHandle>(null);
  const dispatch = useWeekDispatch();

  const handleSubmit = (userData: CreateUserProps) => {
    const editedUser: IEditUser = {
      id: user.id,
      name: userData.name,
      benefit: Boolean(userData.benefit),
      balance: {
        was: userData.startBalance ?? user.balance.was,
        added: userData.addedBalance ?? user.balance.added,
      },
    };

    dispatch(updateUserAsync(editedUser));
    handleCloseModal();
  };

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
      <Modal onClose={handleCloseModal} ref={modal}>
        <UserForm onClose={handleCloseModal} onSubmit={handleSubmit} defaults={user} />
      </Modal>
    </td>
  );
}
