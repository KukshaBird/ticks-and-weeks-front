import { BaseDish, IDish, IEditDish } from '../models/types.ts';
import { IService, MayCreateService, MayDeleteService, MayEditService } from './types.ts';

export interface IDishService
  extends IService<IDish>,
    MayCreateService<BaseDish>,
    MayDeleteService,
    MayEditService<IEditDish> {}

class LocalStorageDishService implements IService<IDish>, IDishService {
  public fetchAll(): Promise<IDish[]> {
    const fetched = localStorage.getItem('dishes');
    if (fetched != null) {
      return JSON.parse(fetched);
    } else {
      return Promise.resolve([]);
    }
  }

  public saveAll(data: IDish[]): Promise<void> {
    localStorage.setItem('dishes', JSON.stringify(data));
    return Promise.resolve();
  }

  public async create(data: BaseDish): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem('dishes') || '[]');
    const shapedItem = this.shapeItem(data);

    return await this.saveAll([...fetched, shapedItem]);
  }

  public async delete(id: string): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem('dishes') || '[]');
    if (fetched != null) {
      const filteredItems = fetched.filter((dish) => dish.id !== id);
      await this.saveAll(filteredItems);
    }
  }

  public async edit(data: IEditDish): Promise<void> {
    const fetched: IDish[] = JSON.parse(localStorage.getItem('dishes') || '[]');
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
}

export default new DishService(new LocalStorageDishService());
