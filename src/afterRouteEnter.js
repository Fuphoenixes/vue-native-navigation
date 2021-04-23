/**
 * 添加路由过渡动画完成钩子 afterRouteEnter
 **/
export default {
  created() {
    if (!this.$vnode) return
    const afterRouteEnter = this.$vnode.componentOptions.Ctor.extendOptions.afterRouteEnter
    this.$navigationBus && this.$navigationBus.$once('after-route-enter', () => {
      if (afterRouteEnter)afterRouteEnter.apply(this)
    })
  }
}

