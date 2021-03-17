/**
 * @format
 * @Description: 上下文管理器
 * @Autho: luckybo
 * @Date:2019/9/3 10:51
 */

// import { IContextMgr } from './ContextMgr.d';
export interface IContextMgr {
  setCurrentForm(name: string): void;

  removeCurrentForm(): void;

  getCurrentItemsName(): string;

  getCurrentItemName(): string;

  getCommonFields(): string[];

  getCurrentListDataName(): string;

  /**
   * 设置上下文内容
   * @param name
   * @param value
   */
  setContext(name: string, value: any): void;

  /**
   * 根据属性名获取上下文内容
   * @param name
   * @returns {*}
   */
  getContextByName(name): any;

  /**
   * 根据属性名清除上下文内容
   * @param name
   */
  removeContextByName(name): void;

  /**
   * 获取上下文全部内容
   * @returns {{__currentItem: {}, __currentItems: Array}|*}
   */
  getContext(): any;

  /**
   * 获取当前展示的数据集
   * @returns {*}
   */
  getCurrentListData(): any;

  /**
   * 获取当前上下文
   * @returns {*}
   */
  getCurrentItem(): any;

  /**
   * 获取当前上下文数组
   * @returns {*}
   */
  getCurrentItems(): any;
}

/**
 * 上下文管理
 * __currentItem ： {} 单选
 *  __currentItems : [] 多选
 */
class ContextMgr implements IContextMgr {
  context = {
    __currentItem: {},
    __currentItems: [],
    __activeForm: undefined as any //todo设置为Antd Form
  };

  setCurrentForm(name: string) {
    this.context.__activeForm = this.getContextByName(name);
  }

  removeCurrentForm() {
    this.context.__activeForm = undefined;
  }

  // DEFAULT ********************************************************************** //
  // 一些默认的属性名

  getCurrentItemsName() {
    return '__currentItems';
  }

  getCurrentItemName() {
    return '__currentItem';
  }

  getCommonFields() {
    return ['__currentItem', '__currentItems'];
  }

  getCurrentListDataName() {
    return '__currentListData';
  }

  // ********************************************************************* DEFAULT //

  /**
   * 设置上下文内容
   * @param name
   * @param value
   */
  setContext(name: string, value: any) {
    this.context[name] = value;
  }

  /**
   * 根据属性名获取上下文内容
   * @param name
   * @returns {*}
   */
  getContextByName(name) {
    return this.context[name];
  }

  /**
   * 根据属性名清除上下文内容
   * @param name
   */
  removeContextByName(name) {
    delete this.context[name];
  }

  /**
   * 获取上下文全部内容
   * @returns {{__currentItem: {}, __currentItems: Array}|*}
   */
  getContext() {
    return this.context;
  }

  /**
   * 获取当前展示的数据集
   * @returns {*}
   */
  getCurrentListData() {
    return this.context[this.getCurrentListDataName()];
  }

  /**
   * 获取当前上下文
   * @returns {*}
   */
  getCurrentItem() {
    return this.context[this.getCurrentItemName()];
  }

  /**
   * 获取当前上下文数组
   * @returns {*}
   */
  getCurrentItems() {
    return this.context[this.getCurrentItemsName()];
  }
}
export default new ContextMgr();
