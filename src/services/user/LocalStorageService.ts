import { IService } from '../types.ts';
import { BaseUser, EditUser, IUser } from '../../models/types.ts';
import { IUserService } from './index.ts';

export class LocalStorageUserService implements IService<IUser>, IUserService {
  private STORAGE_KEY: string = 'users';

  private sortUsers(users: IUser[]): IUser[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  public fetchAll(): Promise<IUser[]> {
    const fetchedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (fetchedUsers != null) {
      const users = JSON.parse(fetchedUsers);
      return Promise.resolve(this.sortUsers(users));
    } else {
      return Promise.resolve([]);
    }
  }

  public saveAll(data: IUser[]): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.sortUsers(data)));
    return Promise.resolve();
  }

  public async create(data: BaseUser): Promise<IUser> {
    const fetchedUsers: IUser[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const shapedUser = this.shapeUser(data);
    const sortedUsers = this.sortUsers([...fetchedUsers, shapedUser]);
    await this.saveAll(sortedUsers);
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
        payments: data.payments ?? oldUser.payments,
      };
      fetchedUsers.splice(userIndex, 1, updatedUser);

      const sortedUsers = this.sortUsers(fetchedUsers);
      await this.saveAll(sortedUsers);

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
