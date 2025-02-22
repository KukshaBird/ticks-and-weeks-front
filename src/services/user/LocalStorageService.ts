import { IService } from '../types.ts';
import { BaseUser, EditUser, IUser } from '../../models/types.ts';
import { IUserService } from './index.ts';

export class LocalStorageUserService implements IService<IUser>, IUserService {
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
