import { IDish } from './types.ts';

class Dish implements IDish {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}

  public static fromJSON(data: IDish): Dish {
    return new Dish(data.id, data.name, data.price);
  }
}

export default Dish;
