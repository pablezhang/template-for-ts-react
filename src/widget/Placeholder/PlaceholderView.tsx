/** @format */

// /**
//  * @format
//  * @Description: 侧边栏
//  * @Autho: luckybo
//  * @Date:2019/9/19 10:15
//  */
// import { Menu, Icon } from 'antd';
// import './PlaceholderStyle.less';
// import React from 'react';
// import { withRouter } from 'react-router';
// import { get, isEmpty, map } from 'lodash';
// import { inject, observer } from 'mobx-react';
//
// const SubMenu = Menu.SubMenu;
// const MenuItem = Menu.Item;
//
// // 静态资源，写死icon
// const MpcIcon = {
//   domainMgr: 'iconnengliditu',
//   ResourceMgr: 'iconziyuanguanli',
//   ApplicationMgr: 'iconyingyongmobanguanli',
//   TenantMgr: 'iconzuhuguanli',
//   BusinessSpaceMgr: 'iconyewukongjian',
//   BusinessIdentityMgr: 'iconyewushenfen',
//   DocumentMgr: 'iconyewu',
//   AuthMgr: 'iconquanxianguanli'
// }

import { UIBaseProps } from '../../components/UIBaseComponents';
import React, { Component } from 'react';
import './PlaceholderStyle.less';
import classNames from 'classnames';
export default class PlaceholderView extends Component<UIBaseProps, any> {
  render() {
    const { style, className, prefix = 'Placeholder', children } = this.props;
    const wrapCls = classNames(prefix, className, 'f-row f-j-center f-ai-center f-full-height f-full-width');
    return <div className={wrapCls}>{children}</div>;
  }
}
