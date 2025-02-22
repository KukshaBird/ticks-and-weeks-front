import React from 'react';
import Button from '../UI/Button.tsx';
import UserManager from '../../managers/UserManager.ts';
import DishManager from '../../managers/DishManager.ts';

export default function ResetTable(): React.ReactElement {
  const handleClick = () => {
    const purgeWeekData = async (): Promise<void> => {
      await UserManager.purge();
      await DishManager.purge();
    };
    purgeWeekData().then();
  };
  return (
    <Button className={'bg-amber-800 text-white font-bold py-1 px-1 rounded mr-2'} onClick={handleClick}>
      Reset Table
    </Button>
  );
}
