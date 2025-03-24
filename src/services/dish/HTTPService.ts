import { BaseDish, IDish, IEditDish } from '../../models/types.ts';
import { IDishService } from './index.ts';
import { Client } from '../../client/Client.ts';

class HTTPDishService implements IDishService {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async fetchAll(): Promise<IDish[]> {
    return await this.client.madeRequest<IDish[]>();
  }

  public async saveAll(data: IDish[]): Promise<void> {
    // TODO: Refactor to save one;
    console.log('tried to save all. Haha');
    console.log(data);
    console.log("All data can't be dave");
  }

  public async create(data: BaseDish): Promise<IDish> {
    return this.client.madeRequest<IDish>('/', { method: 'POST', data });
  }

  public async delete(id: string): Promise<void> {
    await this.client.madeRequest(id);
    return;
  }

  public async edit(data: IEditDish): Promise<IDish> {
    const { id, ...restData } = data;
    return await this.client.madeRequest<IDish>(id, { method: 'PATCH', data: restData });
  }

  public async purge(): Promise<void> {
    // TODO: Add functionality on back. Then here.
    return;
  }
}

export default HTTPDishService;
