/**
 * @format
 * 文件名:IRootStore.ts
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: 根store提供路由处理
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 *
 */

declare type RouterStore = any;
import IUiStore from './IUiStore';

interface IRootStore extends IUiStore {
  /**
   * 取得参数
   * @param name
   * @returns {any}
   */
  getArgs(name?: string): any;
}

export default IRootStore;
