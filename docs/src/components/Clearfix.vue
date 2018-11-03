<template>
  <component :is="tag" :class="[$options.name, $attrs.class]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'clearfix',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
// https://gist.github.com/adi518/7388910cc19247d39ede25e6fca29966

.clearfix {
  &::after,
  &::before {
    order: 1;
    flex-basis: 0;
    content: ' ';
    /* 1 */
    display: table;
    /* 2 */
  }
  &::after {
    clear: both;
  }
}
</style>
