import { RESTClient } from '../../client/RESTClient.ts';

export interface APIUser {
  id: string;
  name: string;
  benefit: boolean;
  balance: {
    was: number;
    added: number;
  };
  orders: {
    day: string;
    name: string;
  }[];
}

export interface APIEditUser extends Partial<APIUser> {
  id: string;
}

export type APICreateUser = Omit<APIUser, 'id'>;

class HTTPUserClient {
  private readonly client: RESTClient;

  constructor(client: RESTClient) {
    this.client = client;
  }

  public async fetchAll(): Promise<APIUser[]> {
    return await this.client.madeRequest<APIUser[]>();
  }

  public async saveAll(data: APIUser[]): Promise<void> {
    // TODO: Refactor to save one;
    console.log(data);
    return;
  }

  public async create(data: APICreateUser) {
    return this.client.create<APIUser>(data);
  }

  public async delete(id: string): Promise<void> {
    await this.client.delete(id);
    return;
  }

  public async edit(data: APIEditUser): Promise<APIUser> {
    const { id, ...restData } = data;
    return await this.client.edit<APIUser>(id, restData);
  }

  public async purge(): Promise<void> {
    return this.client.madeRequest<void>('/purge', { method: 'GET' });
  }
}

export default HTTPUserClient;
