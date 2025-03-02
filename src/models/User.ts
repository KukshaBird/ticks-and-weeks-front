import { Balance, IUser, Payment } from './types.ts';

export class User implements IUser {
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

  public balanceLeft(prices: { name: string; price: number }[]): number {
    return this.balance.was + this.balance.added - this.balanceSpent(prices);
  }

  public balanceSpent(prices: { name: string; price: number }[]): number {
    const lunchPrice = prices.find((price) => price.name === 'lunch');
    const breakfastPrice = prices.find((price) => price.name === 'breakfast');

    return this.payments.reduce((acc, payment) => {
      // benefit related only for morning breakfast
      const breakfastRent = !this.benefit && payment.breakfast && breakfastPrice ? breakfastPrice.price : 0;
      const lunchRent = payment.lunch && lunchPrice ? lunchPrice.price : 0;
      return acc + lunchRent + breakfastRent;
    }, 0);
  }

  public toObject(): IUser {
    return Object.assign({}, this);
  }
}

export default User;
