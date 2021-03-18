/**
 * 管理界面基础类，继承BaseStore的。
 * 功能范围：
 * 1、搜索类
 * 2、分页Total属性、 分页pageSize pageNum
 * 3、Server类
 *
 * @format
 */

import { findKey, forOwn, isEmpty, map, forEach, every } from 'lodash';
import { action, computed, intercept, observable, runInAction, toJS } from 'mobx';
import BaseStore from './BaseStore/BaseStore';
import IBaseMgrStore from './IBaseMgrStore';
import IPagingStore from './IPagingStore';
import ISearchStore from './ISearchStore';
import IService from './IService';
import PagingStore from './PagingStore';
import SearchStore from './SearchStore';

export default abstract class BaseMgrStore<T, U extends IService<T> = IService<T>> extends BaseStore
  implements IBaseMgrStore<T> {
  private queryArg = {};

  public getQueryData(name?: string) {
    return name ? this.queryArg[name] : this.queryArg;
  }

  protected _name: string = 'BaseMgrStore';

  /**
   * 储存query数据
   */
  private setQuery() {
    let queryStr = decodeURIComponent(window.location.href.split('?')[1]);
    let queryArray = queryStr ? queryStr.split('&') : [];
    if (queryArray.length) {
      queryArray.map(item => {
        let keyAndValue = item.split('=');
        if (keyAndValue.length !== 2) {
          console.warn('query参数不合法');
        } else {
          this.queryArg[keyAndValue[0]] = keyAndValue[1];
        }
      });
    }
  }

  @observable
  public loading = false;

  /**
   * 这里做一个代理，转换不同场景里的key
   */
  @computed
  public get customParams() {
    let obj = {};
    // tslint:disable-next-line:no-this-assignment
    let This = this;
    Object.keys(This.mapParams).forEach(key => {
      let realKey = This.mapParams[key];
      obj[key] = This[realKey] || this.interceptorStore[realKey];
    });
    return obj;
  }

  @computed
  public get dataSource() {
    return this._dataSource;
  }

  /* PagingStore部分 */

  /* 对外暴露当前页 */
  @computed
  public get pageNum() {
    return this.pagingStore.pageNum;
  }

  /* 对外暴露分页尺寸 */
  @computed
  public get pageSize() {
    return this.pagingStore.pageSize;
  }

  /* 对外暴露总数量 */
  @computed
  public get total() {
    return this.pagingStore.total;
  }

  /* 每个基础管理模型的三个核心模块 */
  protected service: U;
  public searchStore: ISearchStore;
  public pagingStore: IPagingStore;
  public interceptorStore: any;

  /**
   * 输入项，存在多项条件时以url.query的方式加密与解析
   */
  @observable public parentId = '';

  /* 是否正在修改某项表单 */
  @observable public formDisabled = true;

  /* 往往也是输出项，通常对应子级的输入条件 */
  /** todo 将selectedKey标记为 protected，因为不是所有的selectedKey都能作为输出条件*/
  @observable public selectedKey = '';
  @observable public selectedItem: T = {} as any;

  /**
   * 用以从基类中格式化对象给Service类使用,
   * 例如 指定parentId转化为orgnizationId ，在另一个使用场景中 指定parentId转为 employeeId给 不用的Service类使用
   */
  protected mapParams: object = {};

  /* 输出项 */
  @observable protected _dataSource: T[] = [];

  public constructor(
    service: U,
    searchStore?: ISearchStore,
    pagingStore?: IPagingStore,
    mapParams?: object,
    interceptorStore?
  ) {
    super();
    this.service = service;
    this.searchStore = searchStore || new SearchStore();
    this.pagingStore = pagingStore || new PagingStore();
    this.mapParams = mapParams || {};
    /* 每次发起任何请求前都会注入参数的拦截去 */
    this.interceptorStore = interceptorStore || {};
  }

  /**
   * 卸载时销毁全部上下文
   * @param argst
   */
  @action
  public unLoad(argst) {
    this.onClear(argst);
    this.updateStore({
      selectKey: '',
      selectedItem: {}, // todo 把这些状态放回派生类中去
      parentId: '',
      // searchStore: {},
      // pagingStore: {},
      maParams: {},
      // interceptorStore: {}, todo 这里不能被卸载掉
      _dataSource: [],
      formDisabled: true
    });
    this.init();
    this.searchStore.clear();
    this.queryArg = {};
    this.pagingStore.reset();
  }

  @action
  public init() {}

  // 适用于同一个接口的搜索情况
  @action
  public onSearch(obj = {}) {
    this.onLoad({ parentId: this.parentId, ...obj });
  }

  @action
  public onSelect({ selectedKey, selectedItem }: { selectedKey: string; selectedItem?: T }): void {
    this.updateStore({ selectedKey, selectedItem });
  }

  /* 分页器：页码、尺寸改变事件 */
  @action
  public async onPageChange(pageNum, pageSize, formData = {}) {
    this.onLoad(this.getAssociated({ parentId: this.parentId, pageNum, pageSize, ...formData }));
  }

  /**
   * 批量添加
   * @param newItems
   * @param addParentId
   * @param restParam
   * @param successCallback
   * @param failCallback
   */
  @action
  public async batchAdd(
    { newItems, addParentId, ...restParam }: { newItems: T[]; addParentId?; [path: string]: any },
    successCallback?,
    failCallback?
  ) {
    let count = 0;
    let resultList = [];

    forEach(newItems, async (newItem, index) => {
      if (isEmpty(newItem)) {
        console.error(this._name + '缺少' + 'addItem: ', newItem);
        return;
      }
      const response = await this.service.add({
        newItem,
        addParentId,
        ...restParam,
        ...this.getAssociated({ parentId: this.parentId })
      });
      if (response.resultCode === '0') {
        resultList.push(response);
      } else {
      }
      count++;
      if (count === newItems.length && every(resultList, item => !!item.resultCode && item.resultCode === '0')) {
        successCallback && successCallback();
        this.onLoad(this.getAssociated({ parentId: this.parentId }));
      }
    });
  }

  @action
  public async batchDelete(
    { deleteKey, deleteItems, ...restParam }: { deleteItems: T[]; deleteKey?: string | number; [path: string]: any },
    successCallback?,
    failCallback?
  ) {
    let count = 0;

    forEach(deleteItems, async (deleteItem, index) => {
      if (isEmpty(deleteItem)) {
        console.error(this._name + '缺少' + 'addItem: ', deleteItem);
        return;
      }
      const response = await this.service.delete({
        deleteKey,
        deleteItem,
        ...restParam,
        ...this.getAssociated({ parentId: this.parentId })
      });

      count++;
      if (count === deleteItems.length) {
        successCallback && successCallback();
        this.onLoad(this.getAssociated({ parentId: this.parentId }));
      }
    });
  }

  @action
  public async add(
    { newItem, addParentId, ...restParam }: { newItem: any; addParentId?; [path: string]: any },
    successCallback?,
    failCallback?
  ) {
    if (isEmpty(newItem)) {
      console.error(this._name + '缺少' + 'addItem: ', newItem);
      return;
      // return {resultMsg: this._name + "缺少" + "addItem: ", newItem}
    }
    const { data, resultCode, resultMsg, ...restData } = await this.service.add({
      newItem,
      addParentId,
      ...restParam,
      ...this.getAssociated({ parentId: this.parentId })
    });
    // tslint:disable-next-line:triple-equals
    if (resultCode == '0') {
      await this.onLoad(this.getAssociated({ parentId: this.parentId }));
      successCallback && successCallback({ data, resultCode, resultMsg });
      return;
      // return {data, resultCode, resultMsg, restData}
    }

    failCallback && failCallback({ data, resultCode, resultMsg });
  }

  @action
  public async delete(
    { deleteKey, deleteItem, ...restParam }: { deleteKey: string | number; deleteItem?: any; [path: string]: any },
    successCallback?,
    failCallback?
  ) {
    if (!deleteKey) {
      console.error(this._name + '缺少' + 'deleteId, item: ', deleteKey);
      return;
    }
    const { data, resultCode, resultMsg, ...restData } = await this.service.delete({
      deleteKey,
      deleteItem,
      ...restParam,
      ...this.getAssociated({ parentId: this.parentId })
    });
    if (resultCode === '0') {
      successCallback && successCallback({ data, resultCode, resultMsg });
      this.onLoad(this.getAssociated({ parentId: this.parentId }));
      return;
      // return {data, resultCode, resultMsg, restData}
    }

    failCallback && failCallback({ data, resultCode, resultMsg });
  }

  /**
   * 用途: 在update调用时保持某些状态不清除
   * 派生类需要重写该方法才能生效，
   */
  public getMemoryWhenUpdate() {
    return {};
  }

  @action
  public update = async (
    { updateKey, updateItem, ...restParam }: { updateKey; updateItem?; [path: string]: any },
    successCallback?,
    failCallback?
  ) => {
    if (!updateKey) {
      console.error(this._name + '缺少' + 'updateKey, item: ', updateKey);
      return;
    }
    if (!updateItem) {
      console.error(this._name + '缺少' + 'updateItem, item: ', updateItem);
      return;
    }
    const { data, resultCode, resultMsg } = await this.service.update({
      updateKey,
      updateItem,
      ...restParam,
      ...this.getAssociated({ parentId: this.parentId })
    });
    // tslint:disable-next-line:triple-equals
    if (resultCode == '0') {
      await this.onLoad(this.getAssociated({ parentId: this.parentId, ...this.getMemoryWhenUpdate() }));
      // 注意这里需要在刷新成功后执行回调函数

      successCallback && successCallback({ data, resultCode, resultMsg });
      return;
    }

    failCallback && failCallback({ data, resultCode, resultMsg });
  };

  @action
  public async onLoad(arg) {
    this.onClear(arg);
    if (!arg.parentId && arg.parentId !== false) {
      return;
    }
    runInAction(() => {
      this.loading = true;
    });
    this.updateStore({ parentId: arg.parentId });
    if (Object.prototype.toString.call(arg.parentId) === '[object Object]') {
      if (isEmpty(arg.parentId)) {
        console.warn('parentId不能为空');
        return;
      }

      const asyncInput = findKey(toJS(arg.parentId), item => !item); // 注意这里不能出现0，即0不能作为输入条件
      if (asyncInput) {
        console.log(`等待异步条件${asyncInput}`);
        return;
      }
      this.updateStore(toJS(arg.parentId));
    }
    await this.processLoad(arg);
    runInAction(() => {
      this.loading = false;
    });
  }

  @action
  protected async processLoad(arg) {
    const { data = {} as any, resultCode = '' as string } =
      (await this.service.query({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.getAssociated(arg)
      })) || {};
    if (resultCode === '0') {
      const { total, pageSize, pageNum } = data;
      this.processData(data);
      this.pagingStore.updateStore({ total, pageSize, pageNum });
    }
  }

  /**
   * 派生类通过重写该方法，来处理不同后台接口返回数据结构不一致问题
   * @param data
   */
  @action
  protected processData(data) {
    const { list = [], pageSize, pageNum, total } = data || ({} as any);
    runInAction(() => {
      this._dataSource = list || [];
      this.pagingStore.updateStore({ pageSize, pageNum, total });
    });
  }

  @action
  public updateStore(dataMap) {
    let This = this;
    runInAction(() => {
      forOwn(dataMap, (value, key) => {
        // if(!This[key]){
        //   console.warn(`找不到 this.${key} in ${This._name}`)
        //   return
        // }
        This[key] = value;
      });
    });
  }

  /**
   * 如果arg
   * @param arg
   */
  protected getAssociated(arg: { [path: string]: any }): object {
    // 初始化时arg可能为undefined
    if (!arg) {
      return {};
    }

    if (this.parentIsMultiple(arg.parentId)) {
      return {
        ...this.getQueryData(),
        ...this.convertSearchFormData(this.searchStore.searchFormData),
        ...arg,
        ...arg.parentId,
        pageNum: arg.pageNum || this.pagingStore.pageNum,
        pageSize: arg.pageSize || this.pagingStore.pageSize,
        ...this.customParams
      };
    }

    return {
      ...this.getQueryData(),
      ...this.convertSearchFormData(this.searchStore.searchFormData),
      ...arg,
      parentId: this.parentId,
      pageNum: arg.pageNum || this.pagingStore.pageNum,
      pageSize: arg.pageSize || this.pagingStore.pageSize,
      ...this.customParams
    };
  }

  /**
   * 让子类自定义转换查询表单的数据
   * @param formData
   */
  protected convertSearchFormData(formData): object {
    return formData;
  }

  /**
   * 通常输入条件为简单型数据字符串，存在另外一种情况存在多个输入条件，此时parent为object
   * @param parent
   */
  private parentIsMultiple(parentId): boolean {
    if (!parentId) return false;
    if (isEmpty(parentId)) return false;
    if (Object.prototype.toString.call(parentId) === '[object Object]') return true;
  }
}
