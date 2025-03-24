import { CRUDClient } from './types.ts';

export abstract class BaseService<IType, EditType, BaseType> {
  protected abstract client: CRUDClient<BaseType, IType, EditType>;

  public async fetchAll(): Promise<IType[]> {
    return await this.client.fetchAll();
  }

  public async saveAll(data: IType[]): Promise<void> {
    await this.client.saveAll(data);
  }

  public async create(data: BaseType): Promise<IType> {
    return await this.client.create(data);
  }

  public async delete(id: string): Promise<void> {
    await this.client.delete(id);
  }

  public async edit(data: EditType): Promise<IType> {
    return await this.client.edit(data);
  }
}
