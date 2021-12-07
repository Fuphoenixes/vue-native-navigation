## 路由导航组件
### 功能：
1. 改写`keep-alive`组件实现仿原生app的，路由前进加载后退缓存功能
2. 借助`transition`组件实现仿原生app的，路由前进后退过渡动画
### 原理：
开发者先根据实际场景为每个路由设置页面深度，然后组件会在路由跳转时根据对应的页面深度判断是否缓存页面，以及如何展示过渡动画。
### 使用：
引入组件
```javascript
// main.js
import vueNativeNavigation from 'vue-native-navigation'

Vue.use(vueNativeNavigation)

```
使用组件
```vue
<!--App.vue-->
<template>
  <div id="app">
    <vue-native-navigation>
      <router-view />
    </vue-native-navigation>
  </div>
</template>
```
为每个路由设置页面深度 `depth` <br/>
```javascript
// router.js
new Router({
  routes: [
    {
      path: '/list',
      meta: { depth: 1 },
      component: () => import('@/views/list')
    },
    {
      path: '/detail',
      meta: { depth: 2 },
      component: () => import('@/views/detail')
    },
  ]
})
// 上例配置后，
// 从list页进入detail页，会缓存list页重新加载detail页，页面从右往左滑入
// 从detail页返回list页，会显示缓存的list页，销毁detail页，页面从左往右滑出
```
### options
 - `sessionStoreKey` <br/>
   功能：存储在sessionStore里的key <br/>
   类型：`String` <br/>
   默认值: `__VUE_CACHED_VIEWS__`
   
 - `useRouteTransition` <br/>
   功能：是否使用路由过渡动画 <br/>
   类型：`Boolean` <br/>
   默认值: `true`
   
 - `routeTransitionLimit` <br/>
   功能：使用路由过渡动画时安卓机的最低版本限制 (ios不做限制) <br/>
   类型：`Number` <br/>
   默认值: `8`

### API
 - `getCachedPages` <br/>
   功能：获取被缓存的页面的实例数组, 数组中第一个元素为首页，最后一个元素为当前页面。类似小程序的wx.getCurrentPages() <br/>
   使用方法: `this.$navigation.getCachedPages()`
   
 - `getPreviousCachedPage` <br/>
   功能：获取缓存的前一个页面的实例。若不存在则返回undefined <br/>
   使用方法: `this.$navigation.getPreviousCachedPage()`
 
 - `clearCachedPages` <br/>
   功能：清除所有缓存的页面 <br/>
   使用方法: `this.$navigation.clearCachedPages()`
   
 - `clearCachedPagesByPath` <br/>
   功能：根据路由地址清除缓存的页面 <br/>
   使用方法: `this.$navigation.clearCachedPagesByPath(path: string | string[])`
   
 - `setRouteTransitionName` <br/>
   功能：设置下一次路由跳转动画方式 <br/>
   使用方法: `this.$navigation.setRouteTransitionName(transitionName: ''|'slide-left'|'slide-right')`
   
 - `forcePush` <br/>
   功能：强制前进 <br/>
   使用方法: `this.$navigation.forcePush(route: Route)` 

   
### Hook
 - `afterRouteEnter` <br/>
   功能：为所有组件添加了`afterRouteEnter`钩子，用于在进入路由动画完成时触发。
