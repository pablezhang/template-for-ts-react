/**
 * Created by luckybo on 2017/7/5.
 * 事件管理
 *
 * @format
 */

class EventMgr {
  constructor() {
    this.actions = {};
    this.loading = {};
  }
  loading: any;
  actions: any;

  /**
   * 登记事件
   * @param name
   * @param action
   */
  register(name, action, eventName?) {
    this.loading[name] = false;
    if (eventName) {
      if (this.actions[name]) {
        this.actions[name][eventName] = action;
      } else {
        this.actions[name] = {};
        this.actions[name][eventName] = action;
      }
    } else {
      this.actions[name] = action;
    }
  }

  unRegister(name, eventName?) {
    delete this.loading[name];
    if (eventName && this.actions[name]) {
      this.actions[name][eventName] = null;
    } else {
      this.actions[name] = null;
    }
  }

  /**
   * 执行事件
   * @param name 事件的唯一标志
   * @param args 参数, tool的JSON
   * @param callback 回调
   */
  fire(name, args?, callback?, lcontext?, errcallback?) {
    if (args === undefined || args === null) {
      args = {};
    }
    if (this.loading[name]) {
      return;
    }
    try {
      this.loading[name] = true;
      const action = this.actions[name];

      if (action) {
        if (typeof action === 'function') {
          var ret = action(args);
          callback && callback(ret);
        } else {
          for (const eventName in action) {
            for (const eventName in action) {
              if (action[eventName]) {
                action[eventName](args);
              }
            }
          }
        }
      } else {
        // YXC.Log.showError('没有找到:' + name);
      }
    } finally {
      this.loading[name] = false;
    }
  }

  /**
   * 执行crtl键命令
   * @param keyChar
   */
  fireCtrlKey(keyChar) {
    this.fire('hotkey.ctrlkey.' + keyChar, { keyChar: keyChar });
  }

  /**
   * 登记crtl键命令
   * 在componentDidMount() {
   *   DCI.EventMgr.registerCtrlKey("Z",
   *       function () {
   *
   *       });
   *  }
   * @param keyChar
   * @param action
   */
  registerCtrlKey(keyChar, action) {
    this.actions['hotkey.ctrlkey.' + keyChar] = action;
  }

  /**
   *  取消crtl键命令
   *  在componentWillUnmount() {
   *   DCI.EventMgr.unRegisterCtrlKey("Z");
   *}
   *
   * @param keyChar
   */
  unRegisterCtrlKey(keyChar) {
    this.actions['hotkey.ctrlkey.' + keyChar] = null;
  }

  /**
   * *****************************************************************************************************************************************************
   * 下面是一部分自带事件的键
   * _refresh_      固定的刷新方法
   * _delete_       固定的删除方法
   * _new_          固定的创建方法
   * *****************************************************************************************************************************************************
   */

  /**
   * 执行自带事件方法
   * @param sysFunName
   */
  fireSys(sysFunName) {
    if (this.loading[name]) {
      return;
    }
    this.loading[name] = true;
    const action = this.actions[sysFunName];
    action && action();
    this.loading[name] = false;
  }

  /**
   * @returns {string}
   */
  getSysRefresh() {
    return '_refresh_';
  }

  getSysDelete() {
    return '_delete_';
  }

  getSysNew() {
    return '_new_';
  }
}
export default new EventMgr();
