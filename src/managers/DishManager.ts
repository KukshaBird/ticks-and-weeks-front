import Dish from '../models/Dish.ts';
import DishService, { IDishService } from '../services/dish';
import { BaseDish, IDish, IEditDish } from '../models/types.ts';

export interface IDishManager {
  getAll(): Promise<Dish[]>;

  saveAll(dishes: Dish[]): Promise<void>;

  findDish(name: string, dishes: Dish[]): Dish | undefined;
}

class DishManager implements IDishManager {
  constructor(private dishService: IDishService) {}

  public findDish(name: string, dishes: Dish[]): Dish | undefined {
    return dishes.find((dish) => dish.name === name);
  }

  public async getAll(): Promise<Dish[]> {
    const dishesData = await this.dishService.fetchAll();
    return this.createModels(dishesData);
  }

  public async saveAll(dishes: Dish[]): Promise<void> {
    return this.dishService.saveAll(dishes);
  }

  public async create(userData: BaseDish): Promise<Dish> {
    const newDish = await this.dishService.create(userData);
    return this.createModel(newDish);
  }

  public async delete(dishId: string): Promise<void> {
    return await this.dishService.delete(dishId);
  }

  public async edit(data: IEditDish): Promise<Dish> {
    const updated = await this.dishService.edit(data);
    return this.createModel(updated);
  }

  public createModels(dishes: IDish[]): Dish[] {
    return dishes.map((dish: IDish) => this.createModel(dish));
  }

  private createModel(dish: IDish): Dish {
    return Dish.fromJSON(dish);
  }

  public async purge(): Promise<void> {
    await this.dishService.purge();
  }
}

export default new DishManager(DishService);
