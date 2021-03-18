/**
 * @format
 * @Description: 基础Service类，所有的Service类必须要实现该接口
 * @Autho: luckybo
 * @Date:2019/8/19 10:42
 */

export default interface IService<T> {
  query<U = T>({ ...restParam }): Promise<U>;
  add?({ newItem, addParentId }: { newItem: T; addParentId?: string | number }): Promise<any>;

  delete?({ deleteKey, deleteItem }: { deleteKey: string | number; deleteItem?: T }): Promise<any>;

  update?({ updateKey, updateItem }: { updateKey: string | number; updateItem?: T }): Promise<any>;
}
