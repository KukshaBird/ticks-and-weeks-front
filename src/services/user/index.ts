import { CRUDService, MayPurgeAll } from '../types.ts';
import { BaseUser, EditUser, IUser } from '../../models/types.ts';
import { LocalStorageUserService } from './LocalStorageService.ts';
import { BaseService } from '../BaseService.ts';

export type IUserService = CRUDService<BaseUser, IUser, EditUser> & MayPurgeAll;

class UserService extends BaseService<IUser, EditUser, BaseUser> {
  protected service: IUserService = new LocalStorageUserService();

  public async purge(): Promise<void> {
    await this.service.purge();
  }
}

export default new UserService();
