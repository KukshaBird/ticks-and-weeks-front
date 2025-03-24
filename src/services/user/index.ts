import { BaseUser, EditUser, IUser } from '../../models/types.ts';
import { BaseService } from '../BaseService.ts';
import { UserHTTPServiceAdaptor } from './adapters/UserHTTPServiceAdapter.ts';
import { CRUDClient, MayPurgeAll } from '../types.ts';

export type IUserService = CRUDClient<BaseUser, IUser, EditUser> & MayPurgeAll;

class UserService extends BaseService<IUser, EditUser, BaseUser> implements IUserService {
  protected client = new UserHTTPServiceAdaptor();

  async fetchAll(): Promise<IUser[]> {
    return super.fetchAll();
  }

  public async purge(): Promise<void> {
    await this.client.purge();
  }
}

export default new UserService();
