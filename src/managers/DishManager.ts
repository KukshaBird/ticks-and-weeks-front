import Dish from '../models/Dish.ts';
import DishService, { IDishService } from '../services/dish.service.ts';
import { BaseDish, IDish, IEditDish } from '../models/types.ts';

export interface IDishManager {
  getAll(): Promise<Dish[]>;

  saveAll(dishes: Dish[]): Promise<void>;

  findDish(name: string, dishes: Dish[]): Dish | undefined;
}

class DishManager implements IDishManager {
  constructor(private userService: IDishService) {}

  public findDish(name: string, dishes: Dish[]): Dish | undefined {
    return dishes.find((dish) => dish.name === name);
  }

  public async getAll(): Promise<Dish[]> {
    const dishesData = await this.userService.fetchAll();
    return this.createModels(dishesData);
  }

  public async saveAll(dishes: Dish[]): Promise<void> {
    return this.userService.saveAll(dishes);
  }

  public async create(userData: BaseDish): Promise<void> {
    await this.userService.create(userData);
  }

  public async delete(dishId: string): Promise<void> {
    return await this.userService.delete(dishId);
  }

  public async edit(data: IEditDish): Promise<void> {
    await this.userService.edit(data);
  }

  public createModels(dishes: IDish[]): Dish[] {
    return dishes.map((dish: IDish) => this.createModel(dish));
  }

  private createModel(dish: IDish): Dish {
    return Dish.fromJSON(dish);
  }
}

export default new DishManager(DishService);
