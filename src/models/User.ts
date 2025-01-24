import { Balance, IUser, Payment } from './types.ts';

//TODO: Use Dish models;
const LUNCH = 95;
const BREAKFAST = 75;

class User implements IUser {
  constructor(
    public id: string,
    public name: string,
    public benefit: boolean,
    public active: boolean,
    public payments: Payment[],
    public balance: Balance
  ) {}

  public static fromJSON(data: IUser): User {
    return new User(data.id, data.name, Boolean(data.benefit), data.active, data.payments, data.balance);
  }

  public balanceLeft(): number {
    return this.balance.was - this.balanceSpent();
  }

  public balanceSpent(): number {
    return this.payments.reduce((acc, payment) => {
      const lunchRent = payment.lunch ? LUNCH : 0;
      const breakfastRent = payment.breakfast ? BREAKFAST : 0;
      return acc + lunchRent + breakfastRent;
    }, 0);
  }
}

export default User;
