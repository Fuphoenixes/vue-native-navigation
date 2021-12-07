import { Navigation } from './index'
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $navigation: Navigation
  }
}

declare module 'vue/types/options' {
  // @ts-ignore
  interface ComponentOptions<v extends Vue> {
    afterRouteEnter?(): void
  }
}
