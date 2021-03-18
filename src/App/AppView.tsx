/**
 * @format
 * @Description: 系统入口文件
 * @Autho: luckybo
 * @Date:2019/11/27 14:04
 *
 */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

// 主页面布局
import Layout from '../components/Layout';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
// import { hot } from 'react-hot-loader';
import { routes } from '../router';
import './AppStyle.less';
import { observer } from 'mobx-react';

@observer
class AppView extends Component<any, any> {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Layout>
            <Switch>
              {routes.map(route => (
                <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
              ))}
            </Switch>
          </Layout>
        </Router>
      </LocaleProvider>
    );
  }
}

export default AppView;
