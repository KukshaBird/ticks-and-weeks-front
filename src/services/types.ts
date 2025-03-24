export interface IClient<T> {
  fetchAll(): Promise<T[]>;

  saveAll(data: T[]): Promise<void>;
}

export interface CRUDClient<Create, Retrieve, Update>
  extends IClient<Retrieve>,
    MayCreate<Create, Retrieve>,
    MayDelete,
    MayEdit<Update, Retrieve> {}

export interface MayRead<T> {
  fetchAll(): Promise<T[]>;
}

export interface MayCreate<CreateData, ReturnType> {
  create(data: CreateData): Promise<ReturnType>;
}

export interface MayDelete<ReturnType = void> {
  delete(id: string): Promise<ReturnType>;
}

export interface MayEdit<EditType, ReturnType> {
  edit(data: EditType): Promise<ReturnType>;
}

export interface MayPurgeAll {
  purge(): Promise<void>;
}
