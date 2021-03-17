/**
 * @Description: 用以处理常用事件操作
 * @author zhang.peibo
 * @date 2019/5/17
*/

/**
 * React中的阻止事件冒泡
 * @param e
 */
export function stopBubble(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation()
}