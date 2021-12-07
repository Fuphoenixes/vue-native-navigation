import './vue'
import Vue from 'vue'
import { RawLocation, Route } from 'vue-router'
import { PluginObject } from 'vue/types/plugin'
import { ErrorHandler } from 'vue-router/types/router'

export interface NavigationOptions {
  sessionStoreKey: string,
  useRouteTransition: boolean,
  routeTransitionLimit: number
}


export class Navigation {
  constructor(vue: Vue, options?: NavigationOptions)

  /**
   * 强制前进
   * warning：不要强制进入 fullPath 已存在的页面
   */
  forcePush(RawLocation): Promise<Route>

  /**
   * 获取被缓存的页面的实例数组, 数组中第一个元素为首页，最后一个元素为当前页面。
   */
  getCachedPages(): Vue[]

  /**
   * 获取缓存的前一个页面的实例
   */
  getPreviousCachedPage(): Vue | undefined

  /**
   * 清除所有缓存的页面
   */
  clearCachedPages(): void

  /**
   * 根据路由地址清除缓存的页面
   */
  clearCachedPagesByPath(path: string | string[]): void

  /**
   * 根据完整的路由地址清除缓存的页面
   */
  clearCachedPageByFullPath(fullPath: string | string[]): void

  /**
   * 设置下一次路由跳转动画方式
   */
  setRouteTransitionName(transitionName: '' | 'slide-left' | 'slide-right'): void

}


type InstallObject = PluginObject<NavigationOptions>

export default InstallObject
