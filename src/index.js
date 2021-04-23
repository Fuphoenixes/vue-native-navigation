import VueNativeNavigation from './VueNativeNavigation'
import afterRouteEnter from './afterRouteEnter'
import { getCachedPages, getPreviousCachedPage, clearCachedPages, clearCachedPagesByPath } from './cachedPages'
import setRouteTransitionName from './setRouteTransitionName'

const Navigation = {
  install(Vue) {
    Vue.prototype.$navigationBus = new Vue({})
    Vue.component('vue-native-navigation', VueNativeNavigation)
    Vue.mixin(afterRouteEnter)
    Vue.prototype.$getCachedPages = getCachedPages
    Vue.prototype.$getPreviousCachedPage = getPreviousCachedPage
    Vue.prototype.$clearCachedPages = clearCachedPages
    Vue.prototype.$clearCachedPagesByPath = clearCachedPagesByPath
    Vue.prototype.$setRouteTransitionName = setRouteTransitionName
  }
}

export default Navigation
