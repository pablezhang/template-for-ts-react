/**
 * 文件名:IUIStore.ts
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: ui其础store,所有store必须继承它
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 *
 * @format
 */

import IStore from './IStore';
interface IUiStore extends IStore {
  x;
  y;
  width;
  height;
  /**
   * 装载中
   */
  loading;
  /**
   * 是否时数示
   */
  visible;

  /**
   * 折叠
   */
  collapse;
  setSize(width, height);
}

export default IUiStore;
