
function pruneCache(keepAliveInstance, match) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      if (!match(key)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key]
  if (
    cached &&
    (!current || key !== current.key) // 防止注销了当前页面
  ) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

export default {
  name: 'keep-route-alive',
  abstract: true,
  props: {
    include: [Array]
  },
  created() {
    this.cache = Object.create(null)
    this.keys = []
  },

  mounted() {
    this.$watch('include', val => {
      if (!val) return
      pruneCache(this, uid => val.some(item => item === uid))
    })

    window.__KEEP_ROUTE_ALIVE__ = this
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      const { cache, keys } = this
      const key = this.$route.fullPath
      vnode.key = key
      if (this.include && !this.include.some(item => item === key)) {
        return vnode
      }
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}

function isDef(v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
