import User from '../models/User.ts';
import UserService, { IUserService } from '../services/user.service.ts';
import { BaseUser, IUser } from '../models/types.ts';

interface IUserManager {
  getAll(): Promise<User[]>;

  saveAll(users: User[]): Promise<void>;
}

class UserManager implements IUserManager {
  constructor(private userService: IUserService) {}

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

  public createUserModels(users: IUser[]): User[] {
    return users.map((user: IUser) => this.createUserModel(user));
  }

  private createUserModel(user: IUser): User {
    return User.fromJSON(user);
  }
}

export default new UserManager(UserService);
