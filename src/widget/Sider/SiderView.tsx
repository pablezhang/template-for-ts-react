/**
 * @format
 * @Description: 侧边栏
 * @Autho: luckybo
 * @Date:2019/9/19 10:15
 */

import { UIBaseProps } from '../../components/UIBaseComponents';
import React, { Component } from 'react';
import './SiderStyle.less';
import classNames from 'classnames';
export default class SiderView extends Component<UIBaseProps, any> {
  render() {
    const { style, className, prefix = 'Sider', children } = this.props;
    const wrapCls = classNames(prefix, className, '');
    return <div className={wrapCls}>{children}</div>;
  }
}
