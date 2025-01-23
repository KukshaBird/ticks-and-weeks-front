import { BaseUser, IUser } from '../models/types.ts';

export interface IService<T> {
  fetchAll(): Promise<T[]>;

  saveAll(data: T[]): Promise<void>;
}

export interface MayCreateService<T> {
  create(data: T): Promise<void>;
}

export interface MayDeleteService {
  delete(id: string): Promise<void>;
}

export interface IUserService extends IService<IUser>, MayCreateService<BaseUser>, MayDeleteService {}

class LocalStorageUserService implements IService<IUser>, IUserService {
  public fetchAll(): Promise<IUser[]> {
    const fetchedUsers = localStorage.getItem('users');
    if (fetchedUsers != null) {
      return JSON.parse(fetchedUsers);
    } else {
      return Promise.resolve([]);
    }
  }

  public saveAll(data: IUser[]): Promise<void> {
    localStorage.setItem('users', JSON.stringify(data));
    return Promise.resolve();
  }

  public async create(data: BaseUser): Promise<void> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    const shapedUser = this.shapeUser(data);

    return await this.saveAll([...fetchedUsers, shapedUser]);
  }

  public async delete(id: string): Promise<void> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (fetchedUsers != null) {
      const filteredUsers = fetchedUsers.filter((user) => user.id !== id);
      await this.saveAll(filteredUsers);
    }
  }

  /**
   *
   * @param data
   * @private
   * @return IUser
   * @description Add UUID as ID. This should handle server in real Service;
   */
  private shapeUser(data: BaseUser): IUser {
    const uuid: string = crypto.randomUUID();
    return {
      ...data,
      id: uuid,
    };
  }
}

export class UserService {
  constructor(private service: IUserService) {}

  public async fetchAll(): Promise<IUser[]> {
    return await this.service.fetchAll();
  }

  public async saveAll(data: IUser[]): Promise<void> {
    await this.service.saveAll(data);
    return Promise.resolve();
  }

  public async create(data: BaseUser): Promise<void> {
    await this.service.create(data);
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}

export default new UserService(new LocalStorageUserService());
