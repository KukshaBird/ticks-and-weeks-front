import React from 'react';
import User from '../models/User.ts';
import Dish from '../models/Dish.ts';

type IWeekContext = {
  users: User[];
  dishes: Dish[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
};

export const initWeekStore: IWeekContext = {
  users: [],
  dishes: [],
  setUsers: () => {},
  setDishes: () => {},
};

export const WeekContext = React.createContext<IWeekContext>(initWeekStore);
