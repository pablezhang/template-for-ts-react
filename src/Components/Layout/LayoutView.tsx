/** @format */

import React, { Component } from 'react';
// 路由对象
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';
// 代码热更新插件
import { hot } from 'react-hot-loader';

import SiderView from 'widget/Sider/SiderView';
import FooterBar from 'widget/Footer/FooterView';
import HeaderBar from 'widget/Header/HeaderView';
import { UIBaseProps } from 'Components/UIBaseComponents';
import Menu from 'Components/Menu';

const { Header, Footer, Content } = Layout;

// @ts-ignore
@withRouter
class LayoutView extends Component<UIBaseProps> {
  // componentWillMount() {
  //   if (isEmpty(Cookie.get(config.cookie.auth_name))) {
  //     this.props.history.push('/login');
  //     return;
  //   }
  // }

  render() {
    return (
      <div className='f-column f-full-width' style={{ height: '100vh', overflow: 'hidden' }}>
        <HeaderBar className='f-none' />
        <div className=' f-row f-1'>
          <div className='f-none f-full-height '>
            <SiderView className='f-full-height'>
              <Menu />
            </SiderView>
          </div>
          <div style={{ overflow: 'hidden' }}>{this.props.children}</div>
        </div>
        <FooterBar className='f-none' />
      </div>
    );
  }
}

// 使用热更新插件，代码改动时更新视图
export default hot(module)(LayoutView);
