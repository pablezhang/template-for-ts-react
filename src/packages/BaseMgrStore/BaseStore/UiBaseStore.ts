/**
 * 文件名:BaseStore.ts
 * 创建时间:2018/09/12
 * 创建者:luckybo
 * 功能: 其础uistore,所有store必须继承它
 * Copyright (c) 2018,luckybo0027@gmail.comAll Rights Reserved.
 *
 * @format
 */

import { action, computed, observable } from 'mobx';
import BaseStore from './BaseStore';
import IUiStore from './IUiStore';
abstract class UiBaseStore extends BaseStore implements IUiStore {
  @observable public collapse = false;
  @observable public height;
  @observable public loading = false;
  @observable public visible = true;
  @observable public width;
  @observable public x = 0;
  @observable public y = 0;
  protected abstract _name: string;

  @action public setSize(width, height) {
    this.width = width;
    this.height = height;
  }
}

export default UiBaseStore;
