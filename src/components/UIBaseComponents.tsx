/** @format */

import React, { ReactElement } from 'react';
export interface UIBaseProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}
class UIBaseComponent<T = any> extends React.Component<T & UIBaseProps> {
  private queryArg = {};
  public getQueryData(name?: string) {
    return name ? this.queryArg[name] : this.queryArg;
  }

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

  public componentWillMount(): void {
    this.setQuery();
    for (let key in this.props) {
      if (!this.props.hasOwnProperty(key)) {
        continue;
      }
      let s = this.props[key];
      if (key.endsWith('Store') && s.setQuery) {
        s.setQuery();
      }
    }
  }

  public componentDidMount() {
    this.init(this.props);
  }

  public componentWillReceiveProps(nextProps) {
    // 注意这里会导致除了Store以外的所有props全部用简单值
    if (JSON.stringify(this.excludeStore(nextProps)) === JSON.stringify(this.excludeStore(this.props))) {
      return;
    }
    this.init(nextProps);
  }

  public init(props) {
    for (let key in this.props) {
      if (!this.props.hasOwnProperty(key)) {
        continue;
      }
      let s = this.props[key];
      if (key.endsWith('Store') && s.load) {
        s.load(props);
      }
    }
  }

  public excludeStore(obj) {
    let _obj = {};
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      if (key == 'children') {
        continue;
      }

      if (key.endsWith('Store')) {
        continue;
      } else {
        _obj[key] = obj[key];
      }
    }
    return _obj;
  }

  public componentWillUnmount() {
    this.clear();
  }

  public clear() {
    for (let key in this.props) {
      if (!this.props.hasOwnProperty(key)) {
        continue;
      }
      let s = this.props[key];
      if (key.endsWith('Store') && s.unLoad) {
        s.unLoad(this.props);
      }
    }
  }
}

export default UIBaseComponent;

/**
 * 为UIBaseComponents.props绑定一个Store
 */
export function InjectStore(store): (store: any) => ReactElement<any> {
  return Component =>
    // todo 类型丢失
    // @ts-ignore
    class InjectSomeStore extends React.Component {
      public render() {
        return <Component Store={store} {...this.props} />;
      }
    };
}
