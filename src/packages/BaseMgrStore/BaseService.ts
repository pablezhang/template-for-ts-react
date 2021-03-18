/** @format */

import IService from './IService';

export default abstract class BaseService<T> implements IService<T> {
  public abstract add({ newItem, addParentId }: { newItem: T; addParentId?: string }): Promise<any>;

  public abstract delete({ deleteKey, deleteItem }: { deleteKey: string; deleteItem: T }): Promise<any>;

  public abstract query(params: object): Promise<any>;

  public abstract update({ updateKey, updateItem }: { updateKey: string; updateItem: T }): Promise<any>;
}
