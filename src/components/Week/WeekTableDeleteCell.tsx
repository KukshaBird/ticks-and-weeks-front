import { ComponentProps, ReactElement } from 'react';
import { Cell } from '../UI/Table';
import DeleteIcon from '../UI/icons/DeleteIcon.tsx';

interface DeleteCellProps extends ComponentProps<'button'> {
  id: string;
  onDelete: (id: string) => void;
}

export default function WeekTableDeleteCell({ id, onDelete, ...props }: DeleteCellProps): ReactElement {
  return (
    <Cell
      cell={
        <td>
          <button onClick={() => onDelete(id)} className={'p-3 bg-gray-400'} {...props}>
            <DeleteIcon className={'h-8 w-auto p-2'} />
          </button>
        </td>
      }
    />
  );
}
