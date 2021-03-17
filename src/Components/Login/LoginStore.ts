/**
 * @format
 * @Description: 登录
 * @Autho: luckybo
 * @Date:2019/10/28 15:00
 */

import { action, observable } from 'mobx';

class LoginStore {
  /** 接口返回的图片验证码经base64编码后的数据 */
  @observable
  validateImgUrl = '';

  /** 秘钥类的东西，传回给后台 */
  @observable
  uniqueId = '';

  /** 账号 */
  @observable
  userName = '';

  /** 密码 */
  @observable
  password = '';

  /** 用户输入的验证码 */
  @observable
  code = '';

  /** 请求验证码 */
  @action
  getValidateImg = async () => {};
}

export default LoginStore;
