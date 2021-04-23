/**
 * 设置下一次路由跳转动画方式
 * 取值  '' : 没有动画 ， 'slide-left': 从右滑向左 ， 'slide-right': 从左滑向右
 * @param transitionName
 * @param important 优先级
 */
const setRouteTransitionName = (transitionName, important) => {
  if (window.__ROUTER_TRANSITION_NAME__ && window.__ROUTER_TRANSITION_NAME__.important) return
  window.__ROUTER_TRANSITION_NAME__ = { transitionName, important }
}

export default setRouteTransitionName
