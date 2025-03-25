import { IDishService } from './index.ts';
import { RESTClient } from '../../client/RESTClient.ts';

export interface APIDish {
  id: string;
  name: string;
  day: string;
  price: number;
}

export interface APIEditDish extends Partial<APIDish> {
  id: string;
}

export type APIBaseDish = Omit<APIDish, 'id'>;

/**
 * HTTPDishClient should serve and operate only with API data structure.
 */
class HTTPDishClient implements IDishService {
  private readonly client: RESTClient;

  constructor(client: RESTClient) {
    this.client = client;
  }

  public async fetchAll(): Promise<APIDish[]> {
    return await this.client.madeRequest<APIDish[]>();
  }

  public async saveAll(data: APIDish[]): Promise<void> {
    // TODO: Refactor to save one;
    console.log('tried to save all. Haha');
    console.log(data);
    console.log("All data can't be dave");
  }

  public async create(data: APIBaseDish): Promise<APIDish> {
    return this.client.madeRequest<APIDish>('/', { method: 'POST', data });
  }

  public async delete(id: string): Promise<void> {
    await this.client.madeRequest(id);
    return;
  }

  public async edit(data: APIEditDish): Promise<APIDish> {
    const { id, ...restData } = data;
    return await this.client.madeRequest<APIDish>(id, { method: 'PATCH', data: restData });
  }

  public async purge(): Promise<void> {
    // TODO: Add functionality on back. Then here.
    return;
  }
}

export default HTTPDishClient;
