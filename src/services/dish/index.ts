import LocalStorageDishService from './LocalStorageService.ts';

import { BaseDish, IDish, IEditDish } from '../../models/types.ts';
import { CRUDService, MayPurgeAll } from './../types.ts';
import { BaseService } from '../BaseService.ts';

export type IDishService = CRUDService<BaseDish, IDish, IEditDish> & MayPurgeAll;

export class DishService extends BaseService<IDish, IEditDish, BaseDish> {
  protected service: IDishService = new LocalStorageDishService();

  public async purge(): Promise<void> {
    await this.service.purge();
  }
}

export default new DishService();
