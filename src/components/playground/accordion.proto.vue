<template>
  <div :class="[namespace.kebab]">
    <slot></slot>
    <v-accordion-item
      v-for="(item, index) in computedItems"
      :key="index"
      toggleable
    >
      <template slot="title">
        <vnodes :vnodes="item.slots.title"></vnodes>
      </template>
      <template slot="content">
        <vnodes :vnodes="item.slots.content"></vnodes>
      </template>
    </v-accordion-item>
  </div>
</template>

<script>
import VAccordionItem from '@/components/Accordion.Item'

import kebabcase from 'lodash.kebabcase'

export default {
  name: 'VAccordion',
  components: {
    VAccordionItem,
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    persist: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      index: this.value,
      namespace: { kebab: 'v-accordion' }
    }
  },
  watch: {
    value(value) {
      this.index = value
    },
    index(value) {
      /**
       * @event input
       * @description (value)
       */
      if (this.persist) {
        window.localStorage.setItem(this.storageKey, value)
      }
      this.$emit('input', value)
    }
  },
  created() {
    this.items = this.getItems()

    if (this.persist) {
      this.index = window.localStorage.getItem(this.storageKey)
    }
  },
  destroyed() {
    window.localStorage.removeItem(this.storageKey)
  },
  updated() {
    // this.$forceUpdate()
  },
  computed: {
    computedTabs() {
      const { tabs } = this
      tabs.forEach((tab, index) => {
        if (index < this.index) {
          // Set previous tabs as `done` when moving down.
          tab.enabled = true
          tab.done = true
        } else {
          // Set previous tabs as `disabled/incomplete` when moving up.
          tab.done = false
          tab.enabled = false
        }
        // Close all tabs.
        tab.open = false
      })
      // Open new Tab.
      if (tabs[this.index]) {
        tabs[this.index].open = true
        tabs[this.index].enabled = true
      }
      return tabs
    },
    storageKey() {
      let key = `${this.$options.name}-${this._uid}`
      key = kebabcase(key)
      return key
    },
    computedItems() {
      console.log('computedItems')
      const { $slots } = this
      const slots = {}
      const slotsKeys = []
      for (const slot in $slots) {
        const value = $slots[slot]
        const regex1 = /\d+/
        const regex2 = /title/
        const regex3 = /content/
        const array1 = regex1.exec(slot)
        const array2 = regex2.exec(slot)
        const array3 = regex3.exec(slot)
        const [match1] = array1
        const basename = match1
        const subname = slot.replace(/item-\d+-/, '')
        if (slots[basename]) {
          // Skip (already pushed).
        } else {
          slotsKeys.push(basename)
        }
        slots[basename] = { ...slots[basename], [subname]: value }
      }
      const items = slotsKeys.sort().map(key => ({ slots: slots[key] }))
      return items
    }
  },
  methods: {
    next() {
      if (this.index < this.tabs.length) {
        this.index++
      }
    },
    previous() {
      if (this.index > 0) {
        this.index--
      }
    },
    jump(index) {
      this.index = index
    },
    getItems() {
      const { $slots } = this
      const slots = {}
      const slotsKeys = []
      for (const slot in $slots) {
        const value = $slots[slot]
        const regex1 = /\d+/
        const regex2 = /title/
        const regex3 = /content/
        const array1 = regex1.exec(slot)
        const array2 = regex2.exec(slot)
        const array3 = regex3.exec(slot)
        const [match1] = array1
        const basename = match1
        const subname = slot.replace(/item-\d+-/, '')
        if (slots[basename]) {
          // Skip (already pushed).
        } else {
          slotsKeys.push(basename)
        }
        slots[basename] = { ...slots[basename], [subname]: value }
      }
      const items = slotsKeys.sort().map(key => ({ slots: slots[key] }))
      return items
    }
  },
  inheritAttrs: false
}
</script>
