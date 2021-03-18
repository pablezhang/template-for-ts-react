/**
 * @format
 * @Description: 搜索表单数据模型
 * @Autho: luckybo
 * @Date:2019/8/19 10:41
 */

export default interface ISearchStore {
  /** 搜索表单存储数据 */
  searchFormData: object;
  /** 更新搜索条件 */
  updateStore: (obj: object) => void;

  /** 清除搜索条件 */
  clear(): void;
}
