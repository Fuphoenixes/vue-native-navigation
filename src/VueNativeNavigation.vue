<script>
  import keepRouteAlive from './keep-route-alive'
  import { navigation } from './index'

  export default {
    name: 'vue-native-navigation',
    components: {
      keepRouteAlive
    },
    created() {
      navigation.setup(this)
    },
    methods: {
      afterEnter() {
        navigation.eventBus.$emit('after-route-enter')
      }
    },
    // eslint-disable-next-line no-unused-vars
    render(h) {
      const { afterEnter } = this
      const { cachedViews, transitionName } = navigation.state
      if (this.$slots.default) {
        const staticClass = this.$slots.default[0].data.staticClass
        this.$slots.default[0].data.staticClass = staticClass ? staticClass + ' router' : 'router'
      }
      const include = cachedViews.filter(item => item.isAlive).map(item => item.fullPath)
      return (
        <transition name={transitionName} onAfterEnter={afterEnter}>
          <keep-route-alive include={include}>
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
