/**
 * 获取被缓存的页面的实例数组, 数组中第一个元素为首页，最后一个元素为当前页面。
 * @returns vm[]
 */
export const getCachedPages = () => {
  const keepAliveInstance = window.__KEEP_ROUTE_ALIVE__
  const { cache, keys } = keepAliveInstance
  return keys.map(key => cache[key])
}

/**
 * 获取缓存的前一个页面的实例
 * @returns vm | undefined
 */
export const getPreviousCachedPage = () => {
  const keepAliveInstance = window.__KEEP_ROUTE_ALIVE__
  const { cache, keys } = keepAliveInstance
  const key = keys[keys.length - 2]
  return key && cache[key]
}

/**
 * 清除所有缓存的页面
 */
export const clearCachedPages = () => {
  const VueNavigationVm = window.__KEEP_ROUTE_ALIVE__.$parent.$parent
  VueNavigationVm.cachedViews = []
}

/**
 * 根据路由地址清除缓存的页面
 * @params path string | string[]
 * @params isFullPath boolean
 */
export const clearCachedPagesByPath = (path, isFullPath) => {
  if (!path) return
  const VueNavigationVm = window.__KEEP_ROUTE_ALIVE__.$parent.$parent
  const cachedViews = VueNavigationVm.cachedViews
  if (typeof path === 'string') {
    VueNavigationVm.cachedViews = cachedViews.filter(item => {
      if (isFullPath) {
        return item.fullPath !== path
      } else {
        return item.path !== path
      }
    })
  }
  if (Array.isArray(path)) {
    VueNavigationVm.cachedViews = cachedViews.filter(item => {
      if (isFullPath) {
        return path.every(it => item.fullPath !== it)
      } else {
        return path.every(it => item.path !== it)
      }
    })
  }
}

