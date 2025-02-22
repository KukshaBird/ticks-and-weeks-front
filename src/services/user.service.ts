import { BaseUser, EditUser, IUser } from '../models/types.ts';
import { IService, MayCreateService, MayDeleteService, MayEditService, MayPurgeAll } from './types.ts';

export interface IUserService
  extends IService<IUser>,
    MayCreateService<BaseUser>,
    MayDeleteService,
    MayEditService<EditUser, IUser>,
    MayPurgeAll {}

class LocalStorageUserService implements IService<IUser>, IUserService {
  private STORAGE_KEY: string = 'users';

  public fetchAll(): Promise<IUser[]> {
    const fetchedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (fetchedUsers != null) {
      return JSON.parse(fetchedUsers);
    } else {
      return Promise.resolve([]);
    }
  }

  public saveAll(data: IUser[]): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return Promise.resolve();
  }

  public async create(data: BaseUser): Promise<IUser> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const shapedUser = this.shapeUser(data);
    await this.saveAll([...fetchedUsers, shapedUser]);
    return shapedUser;
  }

  public async delete(id: string): Promise<void> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (fetchedUsers != null) {
      const filteredUsers = fetchedUsers.filter((user) => user.id !== id);
      await this.saveAll(filteredUsers);
    }
  }

  public async edit(data: EditUser): Promise<IUser> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const userIndex = fetchedUsers.findIndex((user) => user.id === data.id);
    if (userIndex != -1) {
      const oldUser = { ...fetchedUsers[userIndex] };
      const updatedUser = {
        ...oldUser,
        name: data.name || oldUser.name,
        active: data.active ?? oldUser.active,
        benefit: data.benefit ?? oldUser.benefit,
        balance: data.balance
          ? {
              ...oldUser.balance,
              was: data.balance.was,
              added: data.balance.added,
            }
          : oldUser.balance,
      };
      fetchedUsers.splice(userIndex, 1, updatedUser);

      await this.saveAll(fetchedUsers);

      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  }

  public async purge(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
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

  public async create(data: BaseUser): Promise<IUser> {
    return await this.service.create(data);
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }

  public async edit(data: EditUser): Promise<IUser> {
    return await this.service.edit(data);
  }

  public async purge(): Promise<void> {
    await this.service.purge();
  }
}

export default new UserService(new LocalStorageUserService());
