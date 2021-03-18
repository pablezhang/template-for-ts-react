/**
 * @format
 * @Description: 基础分页模型
 * @Autho: luckybo
 * @Date:2019/8/16 11:17
 */

import { action, observable, runInAction } from 'mobx';
import BaseStore from './BaseStore/BaseStore';
import IPagingStore from './IPagingStore';

export default class PagingStore extends BaseStore implements IPagingStore {
  public static initPageSize = 20;
  public static initPageNum = 1;
  public static initTotal = 0;
  public static className = 'defaultPagingStore';
  public _name = 'defaultPagingStore';

  @observable public pageSize = PagingStore.initPageSize;
  @observable public pageNum = PagingStore.initPageNum;
  @observable public total = PagingStore.initTotal;

  @action public updateStore(dataMap) {
    super.updateStore(dataMap);
  }

  /**
   * 通常用于重置，但是不会重置pageSize
   */
  @action public reset(): void {
    this.pageNum = PagingStore.initPageNum;
    this.pageSize = PagingStore.initPageSize;
    this.total = PagingStore.initTotal;
  }
}
