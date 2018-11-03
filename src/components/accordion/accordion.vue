<template>
  <div :class="[name.kebab]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'accordion',
  props: {
    /**
     * Contains the current item index. Very similar to a `value`
     * attribute on an input. In most cases, you'll want to set
     * this as a two-way binding, using the `v-model` directive.
     * @type {(number|undefined|null)}
     */
    value: {
      type: Number,
      default: 0
    },

    /**
     * Whether to sync state with storage.
     * @type {boolean}
     */
    persist: {
      type: Boolean,
      default: false
    },

    /**
     * Which Storage API to use.
     * Should be used with `persist` prop.
     * @type {string}
     */
    storekeeper: {
      type: String,
      default: 'localStorage',
      validator(value) {
        return ['localStorage', 'sessionStorage'].includes(value)
      }
    }
  },
  data() {
    return {
      tabs: [],
      index: this.value,
      name: { kebab: this.$options.name }
    }
  },
  /**
   * Provide own instance to tab children,
   * regardless of hierarchy composition.
   */
  provide() {
    return { tabs: this }
  },
  watch: {
    value(value) {
      this.index = value
    }
  },
  mounted() {
    this.$nextTick(() => {
      let index = this.index
      if (this.persist) {
        const storage = this.getStorage()
        index = storage.index
      }
      this.offset(index)
    })
  },
  beforeDestroy() {
    if (!this.persist) {
      this.removeStorage()
    }
  },
  computed: {
    /**
     * Storage key.
     * @returns {string}
     */
    storageKey() {
      return this.name.kebab
    }
  },
  methods: {
    /**
     * Adds a tab instance.
     * @param {object} tab
     * @returns {number} index
     */
    add(tab) {
      const length = this.tabs.push(tab)
      const index = length - 1
      return index
    },

    /**
     * Removes a tab instance.
     * @param {index} number
     * @returns {void}
     */
    remove(index) {
      this.tabs.splice(index, 1)
    },

    /**
     * Goes to next item.
     * @returns {void}
     */
    next() {
      this.offset(1)
    },

    /**
     * Goes to previous item.
     * @returns {void}
     */
    previous() {
      this.offset(-1)
    },

    /**
     * Offsets accordion {n} steps.
     * @param {number} offset
     * @returns {void}
     */
    offset(offset) {
      const index = this.index + offset
      this.set(index)
    },

    /**
     * Sets accordion with index and updates v-model.
     * @param {number} index
     * @returns {void}
     */
    set(index) {
      if (index === this.tabs.length) {
        const tab = this.tabs[index - 1]
        if (tab.is('dirty')) {
          tab.set('open', false)
          tab.set('checked', true)
        }
        return void 0
      }

      if (!this.tabs[index]) {
        return void 0
      }

      this.tabs.forEach((tab, loopIndex) => {
        const below = loopIndex < index
        if (below) {
          tab.set('enabled', true)
          tab.set('checked', true)
        } else {
          tab.set('dirty', true)
          tab.set('enabled', false)
          tab.set('checked', false)
        }
        tab.set('open', false)
      })

      const tab = this.getTab(index)
      tab.set('open', true)
      tab.set('enabled', true)

      this.index = index

      if (this.persist) {
        this.setStorage({ index })
      }

      this.$emit('input', index)
    },

    /**
     * Tab instance getter.
     * @param {number} index
     * @returns {object}
     */
    getTab(index) {
      return this.tabs[index]
    },

    /**
     * Storage setter.
     * @returns {void}
     */
    setStorage(value) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(value))
    },

    /**
     * Storage getter.
     * @returns {object}
     */
    getStorage() {
      let storage = window[this.storekeeper].getItem(this.storageKey)
      storage = JSON.parse(storage) || {}
      return storage
    },

    /**
     * Storage Remover.
     * @returns {void}
     */
    removeStorage() {
      window[this.storekeeper].removeItem(this.storageKey)
    }
  },
  inheritAttrs: false
}
</script>
