<template>
  <component :is="tag" :class="[$options.name, clearfix && 'clearfix']" :style="inlineStyle">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'layout',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    flex: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    justifyContent: {
      type: String
    },
    width: {
      type: String
    },
    margin: {
      type: String
    },
    mt: {
      type: String
    },
    mr: {
      type: String
    },
    mb: {
      type: String
    },
    ml: {
      type: String
    },
    hmargin: {
      type: String
    },
    vmargin: {
      type: String
    },
    vh: {
      type: String
    },
    minvh: {
      type: String
    },
    backgroundImage: {
      type: String
    },
    valign: {
      type: Boolean,
      default: false
    },
    noclearfix: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.vh) {
      this.setVh()

      window.addEventListener('resize', this.setVh)
    }
  },
  destroyed() {
    if (this.vh) {
      window.removeEventListener('resize', this.setVh)
    }
  },
  computed: {
    inlineStyle() {
      const rules = {}
      if (this.flex) {
        rules.display = 'flex'
      }
      if (this.inline) {
        rules.display = 'inline-block'
      }
      if (this.justifyContent) {
        rules.justifyContent = this.justifyContent
      }
      if (this.margin) {
        rules.margin = this.margin
      }
      if (this.mt) {
        rules.marginTop = this.mt
      }
      if (this.mr) {
        rules.marginRight = this.mr
      }
      if (this.mb) {
        rules.marginBottom = this.mb
      }
      if (this.ml) {
        rules.marginLeft = this.ml
      }
      if (this.hmargin) {
        rules.marginLeft = this.hmargin
        rules.marginRight = this.hmargin
      }
      if (this.vmargin) {
        rules.marginTop = this.vmargin
        rules.marginBottom = this.vmargin
      }
      if (this.width) {
        rules.width = this.width
      }
      if (this.backgroundImage) {
        rules.backgroundImage = this.backgroundImage
      }
      if (this.vh) {
        rules.height = `calc(var(--vh, 1vh) * ${this.vh})`
      }
      if (this.minvh) {
        rules.minHeight = `calc(var(--vh, 1vh) * ${this.minvh})`
      }
      if (this.valign) {
        rules.position = 'relative'
        rules.top = '50%'
        rules.transform = 'translateY(-50%)'
      }
      return rules
    },
    clearfix() {
      return !this.noclearfix
    }
  },
  methods: {
    setVh() {
      const vh = window.innerHeight * 0.01
      this.$el.style.setProperty('--vh', `${vh}px`)
    }
  },
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.layout {
  --vh: 1vh;
}

.clearfix {
  &::after,
  &::before {
    order: 1;
    flex-basis: 0;
    content: " ";
    /* 1 */
    display: table;
    /* 2 */
  }
  &::after {
    clear: both;
  }
}
</style>
