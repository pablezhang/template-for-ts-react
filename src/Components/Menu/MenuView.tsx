/**
 * @format
 * @Description: 菜单栏UI文件
 * @Autho: luckybo
 * @Date:2019/9/19 10:15
 */

import { UIBaseProps } from 'Components/UIBaseComponents';
import React, { Component, ReactElement } from 'react';
import './MenuStyle.less';
import classNames from 'classnames';
import { filter, isEmpty, map } from 'lodash';
import { RouteDto, routeList } from '../../router';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

@(withRouter as any) // What is that? See this link: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17181
class MenuView extends Component<UIBaseProps & RouteComponentProps, any> {
  render() {
    const { style, className, prefix = 'Menu' } = this.props;
    const wrapCls = classNames(prefix, className);
    return (
      <Menu className={wrapCls} style={{ ...style }} mode='inline' theme='dark' onClick={this.handleClick()}>
        {renderMenuItems(filter(routeList, item => item.visible !== false))}
      </Menu>
    );
  }

  handleClick() {
    return ({ item, key, keyPath }) => this.props.history.push(key);
  }
}

export default MenuView;

export const renderMenuItems = (menuArray: RouteDto[]): ReactElement[] => {
  return map(menuArray, item => {
    if (isEmpty(item.children)) {
      return (
        <Menu.Item key={item.path}>
          <span>{item.name}</span>
        </Menu.Item>
      );
    }
    return (
      <Menu.SubMenu
        key={item.path}
        title={
          <span>
            <span>{item.name}</span>
          </span>
        }
      >
        {renderMenuItems(item.children)}
      </Menu.SubMenu>
    );
  });
};
