/**
 * @format
 * @Description: 基础业务模型中搜索表单
 * @Autho: luckybo
 * @Date:2019/8/19 10:32
 */

import ISearch from './ISearchStore';

export default class SearchStore implements ISearch {
  public searchFormData = {};
  public updateStore(obj: object = {}): void {
    this.searchFormData = { ...obj };
  }

  public clear() {
    this.searchFormData = {};
  }
}
