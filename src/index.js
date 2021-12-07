import VueNativeNavigation from './VueNativeNavigation'
import afterRouteEnter from './afterRouteEnter'
import Navigation from './navigation'

export let navigation

export default {
  install(Vue, options) {
    navigation = new Navigation(Vue, options)
    Vue.prototype.$navigation = navigation
    Vue.component('vue-native-navigation', VueNativeNavigation)
    Vue.mixin(afterRouteEnter)
  }
}
