/** @format */

import axios from 'axios';
import Cookie from 'js-cookie';
import { cloneDeep, isEmpty, get } from 'lodash';

import siteConfig from 'config/config';
import { notification } from 'antd';

axios.defaults.timeout = 180000;
axios.defaults.withCredentials = false;

/**
 * token过期或者未登录
 * */
const redirectToLogin = () => {
  window.localStorage.clear();
  window.location.href = '/login';
};

/**
 * 如果登录了，就把token写入header
 * */
// 请求拦截
axios.interceptors.request.use(
  (config: {
    responseType: string;
    query: string;
    headers: any; //todo
    params: any; //todo
    data: any; //todo
    url: string;
    app: string;
    version: string;
  }) => {
    // url配置
    config.url = siteConfig.apiAppName(config.url, config.app, config.version);
    // 设置响应类型为json
    config.responseType = 'json';
    // 取出headers
    let headers = cloneDeep(config.headers);

    let auth = Cookie.get(siteConfig.cookie.auth_name) || window.localStorage.getItem('token');
    config.params = config.query;
    config.data = config.data;

    // 不传入，则默认为空对象
    headers = headers ? headers : {};
    // 解决ie不重新请求问题
    headers = {
      ...headers,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: -1
    };

    headers['Access-Token'] = auth;

    // 请求headers中增加Application-Key
    if (!headers['Application-Key']) {
      headers['Application-Key'] = siteConfig.instanceId;
    }

    config.headers = headers;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  /** 200代表通信成功 */
  response => {
    // 非路由初始化，才立即隐藏loading
    if (!response.config.headers.router_init) {
    }

    /** 与后台约定resultCode不为"0" 均表示请求出现异常 */
    const { resultCode, resultMsg, ...restData } = get(response, 'data', {});

    // 新增及修改对象应用时采用\上下架API
    if (['2001', '2002', '2003', '50003', '50004', '50005'].includes(resultCode)) {
      return response.data;
    }

    if (resultCode !== '0') {
      notification.error({ message: resultMsg });
      console.error(resultMsg, ...restData);
    }

    return response.data;
  },
  error => {
    const errRes = error.response && error.response.data ? error.response.data : error;
    const msg = get(error, 'response.data.resultMsg');
    notification.error({ message: msg });
    return {};
  }
);

export default axios;
