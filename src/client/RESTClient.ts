import { Client, Payload } from './Client.ts';

/**
 * RESTClient is extended Client with CRUD standard methods.
 * It also provides access to base Client methods to create custom requests.
 */
export class RESTClient extends Client {
  public async fetchAll<T>(): Promise<T[]> {
    return await this.madeRequest<T[]>();
  }

  public async create<ResponseType = unknown>(data: Payload): Promise<ResponseType> {
    return this.madeRequest<ResponseType>('/', { method: 'POST', data: data });
  }

  public async delete<ResponseType = unknown>(id: string): Promise<ResponseType> {
    return await this.madeRequest(id, { method: 'DELETE' });
  }

  public async edit<ResponseType = unknown>(id: string, data: Payload): Promise<ResponseType> {
    return await this.madeRequest<ResponseType>(id, {
      method: 'PATCH',
      data: data,
    });
  }
}
