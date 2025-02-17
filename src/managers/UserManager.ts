import User from '../models/User.ts';
import UserService, { IUserService } from '../services/user.service.ts';
import { BaseUser, EditUser, IUser, WeekDaysTotals } from '../models/types.ts';
import DishManager, { IDishManager } from './DishManager.ts';

interface IUserManager {
  getAll(): Promise<User[]>;

  saveAll(users: User[]): Promise<void>;
}

class UserManager implements IUserManager {
  constructor(
    private userService: IUserService,
    private dishManager: IDishManager
  ) {}

  public async getAll(): Promise<User[]> {
    const usersData = await this.userService.fetchAll();
    return this.createUserModels(usersData);
  }

  public async saveAll(users: User[]): Promise<void> {
    return this.userService.saveAll(users);
  }

  public async createUser(userData: BaseUser): Promise<void> {
    await this.userService.create(userData);
  }

  public async deleteUser(userId: string): Promise<void> {
    return await this.userService.delete(userId);
  }

  public async editUser(data: EditUser): Promise<void> {
    await this.userService.edit(data);
  }

  public createUserModels(users: IUser[]): User[] {
    return users.map((user: IUser) => this.createUserModel(user));
  }

  private createUserModel(user: IUser): User {
    return User.fromJSON(user);
  }

  public sort(users: User[]): User[] {
    const sorted = [...users];
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  public async dishPerDay(): Promise<WeekDaysTotals> {
    const dishes = await this.dishManager.getAll();
    const data: {
      [key: string]: {
        users: string[];
        count: number;
        total: number;
      };
    } = {};
    const users = await this.userService.fetchAll();
    const lunchDish = this.dishManager.findDish('lunch', dishes);
    if (!lunchDish) {
      throw new Error('Lunch Dish not found!');
    }
    for (const user of users) {
      user.payments.forEach((payment) => {
        if (!payment.lunch) {
          return;
        }
        if (payment.day in data) {
          data[payment.day].users.push(user.name);
          data[payment.day].count++;
          data[payment.day].total += lunchDish.price;
        } else {
          data[payment.day] = {
            users: [user.name],
            count: 1,
            total: lunchDish.price,
          };
        }
      });
    }

    return data;
  }
}

export default new UserManager(UserService, DishManager);
