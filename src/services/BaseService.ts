import { CRUDService } from './types.ts';

export abstract class BaseService<IType, EditType, BaseType> {
  protected abstract service: CRUDService<BaseType, IType, EditType>;

  public async fetchAll(): Promise<IType[]> {
    return await this.service.fetchAll();
  }

  public async saveAll(data: IType[]): Promise<void> {
    await this.service.saveAll(data);
  }

  public async create(data: BaseType): Promise<IType> {
    return await this.service.create(data);
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }

  public async edit(data: EditType): Promise<IType> {
    return await this.service.edit(data);
  }
}
