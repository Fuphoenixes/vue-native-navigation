<script>
  import userAgent from './userAgent'
  import keepRouteAlive from './keep-route-alive'

  export default {
    name: 'vue-native-navigation',
    components: {
      keepRouteAlive
    },
    props: {
      // 是否使用路由过渡动画
      useRouteTransition: {
        type: Boolean,
        default: true
      },
      // 使用路由过渡动画时安卓机的最低版本限制 (ios不做限制)
      routeTransitionLimit: {
        type: Number,
        default: 8
      }
    },
    data() {
      return {
        transitionName: '',
        cachedViews: []
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          this._setRouterTransition(to, from)
          this._changeCachedViews(to)
        },
        immediate: true
      }
    },
    methods: {
      // 设置路由动画
      _setRouterTransition(to, from) {
        if (
          // 未开启路由过渡动画
          !this.useRouteTransition ||
          // 低版本安卓机不开启路由动画，避免卡顿
          (userAgent === 'Android' && userAgent.version < this.routeTransitionLimit)
        ) return
        // 手动设置路由方向
        if (window.__ROUTER_TRANSITION_NAME__) {
          this.transitionName = window.__ROUTER_TRANSITION_NAME__.transitionName
          window.__ROUTER_TRANSITION_NAME__ = undefined
          return
        }
        if (
          // 首次进入app
          !from ||
          // 未设置路由深度
          !to.meta || !from.meta || typeof to.meta.depth === 'undefined' || typeof from.meta.depth === 'undefined' ||
          // 路由深度相同
          to.meta.depth === from.meta.depth
        ) {
          this.transitionName = ''
        } else if (to.meta.depth > from.meta.depth) {
          this.transitionName = 'slide-left'
        } else if (to.meta.depth < from.meta.depth) {
          this.transitionName = 'slide-right'
        }
      },
      // 设置缓存页面， 前进加载后退缓存
      _changeCachedViews(to) {
        if (!to.meta || !to.meta.depth) return
        this.cachedViews = this.cachedViews.filter(route => {
          return route.meta && route.meta.depth < to.meta.depth
        })
        this.cachedViews.push(to)
      },
      afterEnter() {
        this.$navigationBus.$emit('after-route-enter')
      }
    },
    render(h) {
      const { cachedViews, transitionName, afterEnter } = this
      if (this.$slots.default) {
        const staticClass = this.$slots.default[0].data.staticClass
        this.$slots.default[0].data.staticClass = staticClass ? staticClass + ' router' : 'router'
      }
      return (
        <transition name={transitionName} onAfterEnter={afterEnter}>
          <keep-route-alive include={cachedViews.map(item => item.fullPath)}>
            {this.$slots.default}
          </keep-route-alive>
        </transition>
      )
    }
  }
</script>

<style>
  .router {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: #f8f8f8;

    /* -webkit-backface-visibility: hidden; */
    backface-visibility: hidden;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active {
    transition: transform 0.3s;
    will-change: transform;
  }

  .slide-left-leave-active {
    transition: transform 0.3s 0.1s;
    will-change: transform;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    z-index: 1000000;
  }

  .slide-left-enter-to,
  .slide-left-leave-to {
    z-index: inherit;
  }

  .slide-right-enter {
    transform: translate(-50%, 0);
  }

  .slide-right-enter-to {
    transform: translate(0, 0);
  }

  .slide-right-leave {
    transform: translate(0, 0);
  }

  .slide-right-leave-to {
    transform: translate(100%, 0);
  }

  .slide-left-enter {
    transform: translate(100%, 0);
  }

  .slide-left-enter-to {
    transform: translate(0, 0);
  }

  .slide-left-leave {
    transform: translate(0, 0);
  }

  .slide-left-leave-to {
    transform: translate(-50%, 0);
  }
</style>
