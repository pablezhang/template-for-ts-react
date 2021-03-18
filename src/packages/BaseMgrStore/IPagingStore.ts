/**
 * @format
 * @Description: 分页器数据模型
 * @Autho: luckybo
 * @Date:2019/8/19 10:41
 */

export default interface IPagingStore {
  pageSize: number;

  pageNum: number;

  total: number;

  updateStore(obj: { pageSize: number; pageNum: number; total: number }): void;

  reset(): void;
}
