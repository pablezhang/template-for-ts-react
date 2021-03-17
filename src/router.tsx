/** @format */

import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout';

import { map } from 'lodash';
import loadable from '@loadable/component';

export interface RouteDto {
  key: number;
  path: string;
  name: string;
  exact?: boolean;
  visible?: boolean;
  pagePath: string;
  children?: RouteDto[];
}
export const routeList: RouteDto[] = [
  {
    key: 1,
    path: '/',
    exact: true,
    visible: false,
    name: '首页',
    pagePath: './page/Home/index'
  },
  {
    key: 2,
    path: '/home',
    name: '首页',
    pagePath: './page/Home/index'
  },
  {
    key: 3,
    path: '/about',
    name: '关于',
    pagePath: './page/About/index'
  }
];
export const routes = map(routeList, route => {
  const asyncPage = loadable(() => import(`${route.pagePath}`));
  return {
    path: route.path,
    exact: route.exact,
    component: asyncPage
  };
});
