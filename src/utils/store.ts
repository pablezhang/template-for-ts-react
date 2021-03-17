/** @format */

// Cookie对象
import Cookie from 'js-cookie';
// 站点配置
import config from 'config/config';

// 删除Cookie
const clearCookie = () => {
  if (!config.cookie) {
    return false;
  }
  Object.keys(config.cookie).map((key, idx) => {
    Cookie.remove(config.cookie[key]);
  });
  return true;
};

export { clearCookie };
