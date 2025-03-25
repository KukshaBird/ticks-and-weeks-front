import { PUPILS_URL } from '../../constants.ts';
import { BaseUser, IUser, Payment } from '../../../models/types.ts';
import HTTPUserClient, { APICreateUser, APIUser } from '../HTTPUserClient.ts';
import { RESTClient } from '../../../client/RESTClient.ts';
import { IUserService } from '../index.ts';

/**
 * UserHTTPServiceAdaptor acts as an adapter between the internal user data format
 * and the API format. It handles transformations in both directions and
 * communicates with the HTTP client to perform CRUD operations.
 */
export class UserHTTPServiceAdaptor implements IUserService {
  private client = new HTTPUserClient(new RESTClient(PUPILS_URL));

  async saveAll() {
    return;
  }

  async edit(user: IUser): Promise<IUser> {
    const adapted = this.userToApi(user);
    const apiUser = await this.client.edit(adapted);
    return this.apiToUser(apiUser);
  }

  async delete(id: string) {
    await this.client.delete(id);
    return;
  }

  async fetchAll() {
    const data = await this.client.fetchAll();

    return data.map((user) => this.apiToUser(user));
  }

  async create(data: BaseUser): Promise<IUser> {
    const adapted = this.createUserToApi(data);

    const apiUser = await this.client.create(adapted);
    return this.apiToUser(apiUser);
  }

  async purge() {
    await this.client.purge();
  }

  private handlePayments(orders: APIUser['orders']): IUser['payments'] {
    if (!orders.length) {
      return [];
    }
    const paymentDict: {
      [key: string]: {
        breakfast: boolean;
        lunch: boolean;
        [key: string]: boolean;
      };
    } = {};
    orders.forEach((order) => {
      if (!paymentDict[order.day]) {
        paymentDict[order.day] = {
          breakfast: order.name.toLowerCase() === 'breakfast',
          lunch: order.name.toLowerCase() === 'lunch',
        };
      } else {
        paymentDict[order.day][order.name.toLowerCase()] = true;
      }
    });
    return Object.entries(paymentDict).map(([day, mils]: [string, { breakfast: boolean; lunch: boolean }]) => ({
      day,
      ...mils,
    })) as Payment[];
  }

  private handleOrders(payments: IUser['payments']): APIUser['orders'] {
    if (!payments) {
      return [];
    }
    return payments.flatMap(({ day, breakfast, lunch }) => {
      const orders = [];
      if (breakfast) {
        orders.push({ day, name: 'breakfast' });
      }
      if (lunch) {
        orders.push({ day, name: 'lunch' });
      }
      return orders;
    });
  }

  private apiToUser(user: APIUser): IUser {
    return {
      ...user,
      payments: this.handlePayments(user.orders),
      active: true, // All users active users;
      balance: {
        ...user.balance,
        removed: 0,
        now: 0,
      },
    };
  }

  private transformData<T extends BaseUser>(user: T): Omit<APIUser, 'id'> {
    const { payments, balance, ...restData } = user;

    return {
      ...restData,
      orders: this.handleOrders(payments),
      benefit: restData.benefit === true,
      balance: {
        was: balance.was,
        added: balance.added,
      },
    };
  }

  private createUserToApi(user: BaseUser): APICreateUser {
    return this.transformData(user);
  }

  private userToApi(data: IUser): APIUser {
    const { id, ...restData } = data;
    const apiData = this.transformData(restData);

    return { id, ...apiData };
  }
}
