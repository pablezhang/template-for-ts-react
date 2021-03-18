/**
 * @format
 * @Description: 基础UI模型
 * @Autho: luckybo
 * @Date: 2019-06-27 18:53:37
 * @LastEditors: luckybo
 * @LastEditTime: 2019-06-30 21:59:59
 */

import IStore from './BaseStore/IStore';
export default interface IBaseMgrStore<T> extends IStore {
  updateStore(obj: any): void;
  /* 激活事件 */
  onSelect({ selectedKey, selectedItem }: { selectedKey: string; selectedItem: T }): void;

  /**
   * 新增一条数据
   * @param newItem 通常是object数据结构
   * @param addParentId 数据的pid，可能是当前selectedKey，也可能不是
   */
  add(
    { newItem: T, addParentId }: { newItem: T; addParentId?: string },
    successCallback?: Function,
    failCallback?: Function
  ): void;

  /**
   * 删除一条数据
   * @param {deleteKey, deleteItem}
   */
  delete(
    { deleteKey, deleteItem }: { deleteKey: string; deleteItem?: T },
    successCallback?: Function,
    failCallback?: Function
  ): void;

  /**
   * 更新一条数据
   * @param updateItem
   * @param updateKey
   */
  update(
    { updateItem, updateKey, arg }: { updateItem: T; updateKey: string; arg?: any },
    successCallback?: Function,
    failCallback?: Function
  ): void;
}
