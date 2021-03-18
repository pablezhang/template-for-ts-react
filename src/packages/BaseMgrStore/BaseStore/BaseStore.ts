/**
 * @format
 * 文件名:BaseStore.ts
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: 其础store,所有store必须继承它
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 */

import { forOwn } from 'lodash';
import { action } from 'mobx';
import IRootStore from './IRootStore';
import IStore from './IStore';

abstract class BaseStore implements IStore {
  public get name() {
    return this._name;
  }

  public set name(name) {
    this._name = name;
  }

  protected abstract _name: string;
  private storeNames = {};

  private root: IRootStore;
  private parent: IStore;

  @action
  public load(argst, callback?) {
    let args = argst;

    this.onClear(args);
    if (this.onLoad) {
      this.onLoad(args, () => {
        // for(let name in this.storeNames)
        // {
        //     this[name].load(args);
        // }
        callback && callback();
      });
    }
  }

  @action
  public unLoad(argst) {
    this.onClear(argst);
  }

  public getRoot(): IRootStore {
    return this.root;
  }

  public getParent(): IStore {
    return this.parent;
  }

  public get(name: string): IStore {
    return this[name];
  }

  /**
   * 登记store
   * @param name
   * @param action
   */
  public register(store: IStore): IStore {
    (store as any).parent = this;
    (store as any).root = this.root;
    let name = store.name;
    this.storeNames[name] = name;
    if (this.parent && (this as any) != this.root) {
      let parentStore = this.parent;
      if ((parentStore as any) != this.root) {
        this.root[parentStore.name + '_' + this.name + '_' + name] = store;
      } else {
        this.root[this.name + '_' + name] = store;
      }
    }
    this[name] = store;
    return store;
  }

  public unRegister(name) {
    this.storeNames[name] = null;
    if (this[name]) {
      (this[name] as any).parent = this;
      (this[name] as any).root = this;
    }
    this[name] = null;
  }

  public updateStore(dataMap) {
    forOwn(dataMap, (value, key) => {
      this[key] = value;
    });
  }

  @action
  protected onClear(args) {}

  @action
  protected onLoad(args, callback) {}

  protected setRoot(root) {
    this.root = root;
  }

  protected setParent(parent) {
    this.parent = parent;
  }
}

export default BaseStore;
