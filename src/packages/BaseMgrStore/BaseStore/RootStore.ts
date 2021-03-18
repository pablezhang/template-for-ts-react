/**
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: 根store，对应路径操作
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 *
 * @format
 */

import IRootStore from './IRootStore';
import IUiStore from './IUiStore';
import UiBaseStore from './UiBaseStore';
class RootStore extends UiBaseStore implements IRootStore, IUiStore {
  public static className = 'root';

  // @observable _pathname;
  // _search:string;
  public _args: any = {};

  protected _name = RootStore.className;
  public constructor() {
    super();
  }

  // public set pathname(value) {
  //     this._pathname = value;
  // }
  public getArgs(name?: string) {
    return name ? this._args[name] : this._args;
  }
}
export default RootStore;
