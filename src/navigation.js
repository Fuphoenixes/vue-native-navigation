import userAgent from './userAgent'

class Navigation {

  vue = null
  rootVm = null
  state = null
  baseDepth = 0
  options = {
    sessionStoreKey: '__VUE_CACHED_VIEWS__',
    useRouteTransition: true,
    routeTransitionLimit: 8
  }
  eventBus = null
  keepAliveInstance = window.__KEEP_ROUTE_ALIVE__
  customTransitionName = undefined

  constructor(vue, options= {}) {
    this.vue = vue
    this.options = Object.assign(this.options, options)
    this._saveCachedViews()
    this.eventBus = new vue({})
  }

  _saveCachedViews() {
    window.addEventListener('beforeunload', () => {
      if (this.state) {
        sessionStorage.setItem(this.options.sessionStoreKey, JSON.stringify(this.state.cachedViews))
      }
    })
  }

  _getDefaultCachedViews() {
    const store = sessionStorage.getItem(this.options.sessionStoreKey)
    if (store) {
      try {
        const cachedViews = JSON.parse(store)
        return cachedViews.map(item => ({
          ...item,
          isAlive: false
        }))
      } catch (e) {
        return []
      }
    }
    return []
  }

  setup(vm) {
    this.rootVm = vm

    this.state = this.vue.observable({
      transitionName: '',
      cachedViews: this._getDefaultCachedViews()
    })

    this.baseDepth = 0

    vm.$watch('$route', this.onRouteChange.bind(this), { immediate: true })
  }

  onRouteChange(to, from) {
    if (!to || !from) return
    this._setBaseDepthByToRoute(to)

    const toView = this._getViewByRoute(to)
    const fromView = this._getViewByRoute(from)

    this._setRouterTransition(toView.depth, fromView.depth)
    this._changeCachedViews(toView)
  }

  _setRouterTransition(toDepth, fromDepth) {
    const { useRouteTransition, routeTransitionLimit } = this.options
    if (
      // 未开启路由过渡动画
      !useRouteTransition ||
      // 低版本安卓机不开启路由动画，避免卡顿
      (userAgent === 'Android' && userAgent.version < routeTransitionLimit)
    ) return

    // 自行设置下一次路由跳转方式
    if (this.customTransitionName !== undefined) {
      this.state.transitionName = this.customTransitionName
      this.customTransitionName = undefined
      return
    }

    if (!toDepth || !fromDepth) this.state.transitionName = ''
    else if (toDepth === fromDepth) this.state.transitionName = ''
    else if (toDepth > fromDepth) this.state.transitionName = 'slide-left'
    else if (toDepth < fromDepth) this.state.transitionName = 'slide-right'
  }

  _changeCachedViews(toView) {
    if (!toView.depth) return
    const { cachedViews } = this.state
    this.state.cachedViews = cachedViews.filter(route => {
      return route.depth < toView.depth
    })
    this.state.cachedViews.push(toView)
  }

  // 路由返回时设置baseDepth为返回路由记录的baseDepth
  _setBaseDepthByToRoute(route) {
    const { cachedViews } = this.state
    const viewItem = cachedViews.find(item => item.fullPath === route.fullPath)
    if (viewItem) {
      this.baseDepth = viewItem.baseDepth
    }
  }

  _getViewByRoute(route) {
    const { cachedViews } = this.state
    const viewItem = cachedViews.find(item => item.fullPath === route.fullPath)
    if (viewItem) return viewItem
    // 未设置 depth 的路由统一按0处理，即不缓存页面也不加载路由
    const depth = route.meta && route.meta.depth ? route.meta.depth + this.baseDepth : 0
    return {
      fullPath: route.fullPath,
      path: route.path,
      meta: route.meta,
      query: route.query,
      hash: route.hash,
      depth,
      baseDepth: this.baseDepth,
      isAlive: true
    }
  }

  // 强制前进, 不要强制进入已存在的页面
  forcePush(...args) {
    const { $router } = this.rootVm
    if (!$router) return
    const currentView = this._getViewByRoute($router.currentRoute)
    this.baseDepth = currentView.depth || currentView.baseDepth
    return $router.push(...args)
  }

  // 获取被缓存的页面的实例数组, 数组中第一个元素为首页，最后一个元素为当前页面。
  getCachedPages() {
    const { cache, keys } = this.keepAliveInstance
    return keys.map(key => cache[key])
  }

  // 获取缓存的前一个页面的实例
  getPreviousCachedPage() {
    const { cache, keys } = this.keepAliveInstance
    const key = keys[keys.length - 2]
    return key && cache[key]
  }

  // 清除所有缓存的页面
  clearCachedPages() {
    const { cachedViews } = this.state
    this.state.cachedViews = cachedViews.map(item => ({
      ...item,
      isAlive: false
    }))
  }

  // 根据路由地址清除缓存的页面
  clearCachedPagesByPath(path) {
    const { cachedViews } = this.state
    if (typeof path === 'string') {
      this.state.cachedViews = cachedViews.map(item => item.path === path ? {...item, isAlive: false} : item)
    }
    if (Array.isArray(path)) {
      this.state.cachedViews = cachedViews.map(item => path.some(it => it === item.path) ? {...item, isAlive: false} : item)
    }
  }

  // 根据完整的路由地址清除缓存的页面
  clearCachedPageByFullPath(fullPath) {
    const { cachedViews } = this.state
    if (typeof fullPath === 'string') {
      this.state.cachedViews = cachedViews.map(item => item.fullPath === fullPath ? {...item, isAlive: false} : item)
    }
    if (Array.isArray(fullPath)) {
      this.state.cachedViews = cachedViews.map(item => fullPath.some(it => it === item.fullPath) ? {...item, isAlive: false} : item)
    }
  }

  // 设置下一次路由跳转动画方式
  setRouteTransitionName(transitionName) {
    this.customTransitionName = transitionName
  }
}

export default Navigation
