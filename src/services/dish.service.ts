import { BaseDish, IDish, IEditDish } from '../models/types.ts';
import { IService, MayCreateService, MayDeleteService, MayEditService, MayPurgeAll } from './types.ts';

export interface IDishService
  extends IService<IDish>,
    MayCreateService<BaseDish>,
    MayDeleteService,
    MayEditService<IEditDish>,
    MayPurgeAll {}

/**
 * This defaults should be implemented on the server side with the true DB would be implemented. Until that,
 * it remains here as a rudiment with a temporary local storage persistence module.
 */
const DEFAULT_PRISES = {
  LUNCH: 75,
  BREAKFAST: 95,
};
const DEFAULT_DISHES: BaseDish[] = [
  { name: 'lunch', price: DEFAULT_PRISES.LUNCH },
  { name: 'breakfast', price: DEFAULT_PRISES.BREAKFAST },
];

class LocalStorageDishService implements IService<IDish>, IDishService {
  private readonly STORAGE_KEY = 'dishes';

  constructor() {
    const isStorageExists = localStorage.getItem(this.STORAGE_KEY);
    if (!isStorageExists) {
      this.seedDefaults();
    }
  }

  public fetchAll(): Promise<IDish[]> {
    const fetched = localStorage.getItem(this.STORAGE_KEY);
    if (fetched != null) {
      return JSON.parse(fetched);
    } else {
      return Promise.resolve([]);
    }
  }

  public saveAll(data: IDish[]): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return Promise.resolve();
  }

  public async create(data: BaseDish): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const shapedItem = this.shapeItem(data);

    return await this.saveAll([...fetched, shapedItem]);
  }

  public async delete(id: string): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (fetched != null) {
      const filteredItems = fetched.filter((dish) => dish.id !== id);
      await this.saveAll(filteredItems);
    }
  }

  public async edit(data: IEditDish): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const itemIndex = fetched.findIndex((item) => item.id === data.id);
    if (itemIndex != -1) {
      const oldItem = { ...fetched[itemIndex] };
      fetched.splice(itemIndex, 1, {
        ...oldItem,
        name: data.name ?? oldItem.name,
        price: data.price ?? oldItem.price,
      });

      await this.saveAll(fetched);
    }
  }

  public async purge(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   *
   * @param data
   * @private
   * @return IDish
   * @description Add UUID as ID. This should handle server in real Service;
   */
  private shapeItem(data: BaseDish): IDish {
    const uuid: string = crypto.randomUUID();
    return {
      ...data,
      id: uuid,
    };
  }

  private seedDefaults(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEFAULT_DISHES));
  }
}

export class DishService {
  constructor(private service: IDishService) {}

  public async fetchAll(): Promise<IDish[]> {
    return await this.service.fetchAll();
  }

  public async saveAll(data: IDish[]): Promise<void> {
    await this.service.saveAll(data);
    return Promise.resolve();
  }

  public async create(data: BaseDish): Promise<void> {
    await this.service.create(data);
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }

  public async edit(data: IEditDish): Promise<void> {
    await this.service.edit(data);
  }

  public async purge(): Promise<void> {
    await this.service.purge();
  }
}

export default new DishService(new LocalStorageDishService());
