export interface IService<T> {
  fetchAll(): Promise<T[]>;

  saveAll(data: T[]): Promise<void>;
}

type WithID<T> = T & { id: string };

export interface MayReadService<T> {
  fetchAll(): Promise<T[]>;
}

export interface MayCreateService<T> {
  create(data: T): Promise<WithID<T>>;
}

export interface MayDeleteService {
  delete(id: string): Promise<void>;
}

export interface MayEditService<EditType, ReturnType> {
  edit(data: EditType): Promise<ReturnType>;
}

export interface MayPurgeAll {
  purge(): Promise<void>;
}
