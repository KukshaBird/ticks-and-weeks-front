import React, { JSX } from 'react';
import User from '../../models/User.ts';

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Payment = {
  day: WeekDay;
  lunch: boolean;
  breakfast: boolean;
};

export interface WeekData {
  balance: {
    was: number;
    now: number;
    added: number;
    removed: number;
  };
  id: string;
  name: string;
  benefit: boolean;
  active: boolean;
  payments: Payment[];
}

export type SetUserState = React.Dispatch<React.SetStateAction<User[]>>;
export type WeekCell = string | number | JSX.Element;
export type WeekRow = WeekCell[];
