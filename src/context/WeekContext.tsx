import React, { useState } from 'react';
import { WeekContext } from '../store/store.ts';
import User from '../models/User.ts';
import Dish from '../models/Dish.ts';

export default function WeekContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);

  const storeValue = {
    dishes,
    users,
    setUsers,
    setDishes,
  };

  return <WeekContext.Provider value={storeValue}>{children}</WeekContext.Provider>;
}
