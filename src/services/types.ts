export interface IService<T> {
  fetchAll(): Promise<T[]>;

  saveAll(data: T[]): Promise<void>;
}

export interface CRUDService<Create, Retrieve, Update>
  extends IService<Retrieve>,
    MayCreateService<Create, Retrieve>,
    MayDeleteService,
    MayEditService<Update, Retrieve> {}

export interface MayReadService<T> {
  fetchAll(): Promise<T[]>;
}

export interface MayCreateService<CreateData, ReturnType> {
  create(data: CreateData): Promise<ReturnType>;
}

export interface MayDeleteService<ReturnType = void> {
  delete(id: string): Promise<ReturnType>;
}

export interface MayEditService<EditType, ReturnType> {
  edit(data: EditType): Promise<ReturnType>;
}

export interface MayPurgeAll {
  purge(): Promise<void>;
}
