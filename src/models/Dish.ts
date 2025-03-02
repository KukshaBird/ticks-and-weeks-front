import { IDish } from './types.ts';

export class Dish implements IDish {
  constructor(
    public id: string,
    public name: string,
    public price: number
  ) {}

  public static fromJSON(data: IDish): Dish {
    return new Dish(data.id, data.name, data.price);
  }

  public toObject(): IDish {
    return Object.assign({}, this);
  }
}

export default Dish;
