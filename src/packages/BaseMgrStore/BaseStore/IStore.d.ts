/**
 * 文件名:IStore.ts
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: 其础store,所有store必须继承它
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 *
 * @format
 */

import IRootStore from './IRootStore';
interface IStore {
  /**
   * 根节点
   * @returns {IRootStore}
   */
  getRoot(): IRootStore;

  /**
   * 父节点
   * @returns {IStore}
   */
  getParent(): IStore;

  /**
   * 装载数据,不要直接重载load 重载onLoad异步需调用callback
   */

  load(args, callback?);

  unLoad(args);

  /**
   * store的名字
   */
  name: string;

  /**
   * 登记子store
   * @param {string} name
   * @param {IStore} store
   * @returns {IStore}
   */
  register(store: IStore): IStore;

  /**
   * 取得子store
   * @param {string} name
   * @returns {IStore}
   */
  get(name: string): IStore;

  /**
   * 注销子store
   * @param name
   */
  unRegister(name);
}

export default IStore;
