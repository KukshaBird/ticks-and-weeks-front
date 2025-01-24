export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

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

export interface EditUser {
  id: string;
  name?: string;
  benefit?: boolean;
  active?: boolean;
  balance?: Omit<Balance, 'now' | 'removed' | 'added'>;
}

export interface BaseDish {
  name: string;
  price: number;
}

export interface IDish extends BaseDish {
  id: string;
}

export interface IEditDish extends Partial<IDish> {
  id: string;
}

export interface IDeleteDish extends Pick<IDish, 'id'> {}

export interface ICreateDish extends Omit<IDish, 'id'> {}
