import { WeekDay } from '../components/Week/types.ts';

export type Payment = {
  day: WeekDay;
  lunch: boolean;
  breakfast: boolean;
};

export type Balance = {
  was: number;
  now: number;
  added: number;
  removed: number;
};

export interface BaseUser {
  name: string;
  benefit?: boolean;
  active: boolean;
  balance: Balance;
  payments: Payment[];
}

export interface CreateUser {
  name: string;
  benefit?: boolean;
  startBalance?: number;
}

export interface IUser extends BaseUser {
  id: string;
}
