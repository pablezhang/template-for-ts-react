/** @format */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';
import config from 'config/config';
import './HeaderStyle.less';
import classNames from 'classnames';
import Placeholder from 'widget/Placeholder';
// @ts-ignore
@withRouter
// 导出组件
export default class HeaderView extends Component<any> {
  //todo

  // 渲染用户信息

  // 渲染内容
  render() {
    const { style, className, prefix = 'Header' } = this.props;
    const wrapCls = classNames(prefix, className, '');
    const logoCls = `${prefix}__logo`;
    return (
      <div className={`${wrapCls} f-row f-ai-center`} style={{ padding: '0 10px' }}>
        <Button size='small' type='primary'>
          <Icon type='menu-fold' />
        </Button>

        <div className={' f-1 '}>
          <div style={{ paddingLeft: '10px' }}>
            {/* 这里显示系统名称 */}
            <span>{config.appName || ''}</span>&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <div className={' f-none'} id='routerApp_headRight'>
          <Placeholder children='头像' />
        </div>
      </div>
    );
  }
}
