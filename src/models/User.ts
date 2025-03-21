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

  public toObject(): IUser {
    return Object.assign({}, this);
  }
}

export default User;
