import { BaseDish, IDish, IEditDish } from '../../models/types.ts';
import { CRUDClient, MayPurgeAll } from './../types.ts';
import { BaseService } from '../BaseService.ts';
import { DISH_URL } from '../constants.ts';
import HTTPDishClient from './HTTPDishClient.ts';
import { RESTClient } from '../../client/RESTClient.ts';

export type IDishService = CRUDClient<BaseDish, IDish, IEditDish> & MayPurgeAll;

export class DishService extends BaseService<IDish, IEditDish, BaseDish> {
  protected client: IDishService = new HTTPDishClient(new RESTClient(DISH_URL));

  public async purge(): Promise<void> {
    await this.client.purge();
  }
}

export default new DishService();
