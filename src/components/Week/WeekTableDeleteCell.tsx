import { ComponentProps, ReactElement } from 'react';
import Button from '../UI/Button.tsx';
import DeleteIcon from '../UI/icons/DeleteIcon.tsx';
import { Cell } from '../UI/Table';

interface DeleteCellProps extends ComponentProps<'button'> {
  id: string;
  onDelete: (id: string) => void;
}

export default function WeekTableDeleteCell({ id, onDelete, ...props }: DeleteCellProps): ReactElement {
  return (
    <Cell
      cell={
        <td>
          <Button
            onClick={() => onDelete(id)}
            className={
              'p-2 bg-gray-200 text-gray-600 rounded-full shadow hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all'
            }
            {...props}
          >
            <DeleteIcon className="w-4 h-4" />
          </Button>
        </td>
      }
    />
  );
}
