export interface IService<T> {
  fetchAll(): Promise<T[]>;

  saveAll(data: T[]): Promise<void>;
}

export interface MayReadService<T> {
  fetchAll(): Promise<T[]>;
}

export interface MayCreateService<T> {
  create(data: T): Promise<T & { id: string }>;
}

export interface MayDeleteService {
  delete(id: string): Promise<void>;
}

export interface MayEditService<T> {
  edit(data: T): Promise<void>;
}

export interface MayPurgeAll {
  purge(): Promise<void>;
}
