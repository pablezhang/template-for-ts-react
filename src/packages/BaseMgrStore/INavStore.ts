/** @format */

import IBaseMgrStore from './IBaseMgrStore';

export default interface INavStore<T> extends IBaseMgrStore<T> {
  dataMap: any;
}
