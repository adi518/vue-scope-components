<template>
  <div :class="[name.kebab, classes]">
    <!-- Wrap `.header` to fix IE 10/11 flex/min-height bug -->
    <!-- @link https://stackoverflow.com/a/47180142/4106263 -->
    <div class="header-wrap">
      <div :class="['header', { 'is-open': flags.open, 'is-enabled': flags.enabled }]" @click="handleClick(index)">
        <template v-if="flags.checked && $slots.headingChecked">
          <span class="heading is-checked">
            <slot name="heading-checked"></slot>
          </span>
        </template>
        <template v-else>
          <span :class="['heading', { 'is-checked' : flags.checked }]">
            <slot name="heading"></slot>
          </span>
        </template>
      </div>
    </div>
    <template v-if="flags.open">
      <slot name="content"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'accordion-item',

  inject: {
    tabs: {
      from: 'tabs',
      default: undefined
    }
  },

  props: {
    index: {
      type: Number,
      default: 0
    },
    open: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    enabled: {
      type: Boolean,
      default: true
    },
    toggleable: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      name: { kebab: 'accordion-item' },
      mutable: {
        dirty: false,
        open: this.open,
        index: this.index,
        enabled: this.enabled,
        checked: this.checked
      }
    }
  },

  watch: {
    /**
     * Keeps props in sync with mutable data.
     */
    open(value) {
      this.mutable.open = value
    },
    enabled(value) {
      this.mutable.enabled = value
    },
    checked(value) {
      this.mutable.checked = value
    }
  },

  created() {
    /**
     * Looks for a `tabs` provider and
     * updates storage if persistable.
     */
    const several = this.flags.several
    if (several) {
      if (this.tabs) {
        const index = this.tabs.add(this)
        this.set('index', index)
      } else {
        console.error(
          `[Accordion-Item warn]:` +
            `Accordion provider not found. ` +
            `For using a single Tab, you must pass a truthy "single" prop.`
        )
      }
    }
  },

  computed: {
    /**
     * Flags getter. Useful for composing
     * CSS classes and other logic.
     * @returns {object}
     */
    flags() {
      return {
        single: this.single,
        several: !this.single,
        open: this.mutable.open,
        closed: !this.mutable.open,
        enabled: this.mutable.enabled,
        disabled: !this.enabled,
        toggleable: this.toggleable,
        checked: this.mutable.checked,
        sealed: this.closed && this.disabled
      }
    },

    /**
     * CSS classes getter.
     * @returns {object}
     */
    classes() {
      const {
        flags: { open, closed, enabled, disabled, toggleable, checked, sealed }
      } = this
      return {
        'is-open': open,
        'is-closed': closed,
        'is-enabled': enabled,
        'is-disabled': disabled,
        'is-toggleable': toggleable,
        'is-checked': checked,
        'is-sealed': sealed
      }
    }
  },

  methods: {
    /**
     * Flag query.
     * @param {string} key
     * @returns {boolean}
     */
    is(key) {
      return !!this.get(key)
    },

    /**
     * Flag getter.
     * @param {string} key
     * @returns {*}
     */
    get(key) {
      return this.mutable[key]
    },

    /**
     * Flag setter.
     * @param {string} key
     * @param {*} value
     * @returns {void}
     */
    set(key, value) {
      this.mutable[key] = value
    },

    /**
     * Removes itself from tabs instance.
     * @returns {void}
     */
    remove() {
      this.tabs.remove(this.mutable.index)
    },

    /**
     * Handles click on `header`.
     * @param {number} index
     * @returns {void}
     */
    handleClick(index) {
      if (this.flags.enabled) {
        this.$emit('click', index)
      }
      if (this.flags.enabled && this.flags.toggleable) {
        this.set('open', !this.flags.open)
        this.$emit('update:open', this.flags.open)
      }
    }
  },
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
$color-energy-yellow: #f5da55;

.accordion-item {
  border: 1px solid $color-energy-yellow;

  &.is-enabled {
    margin-bottom: -1px;
  }

  &.is-open {
    margin-bottom: 0;
  }

  &.is-sealed {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.header-wrap {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  min-height: 2rem;
  user-select: none;
  align-items: center;
  position: relative;
  padding-left: 1rem;

  &.is-enabled {
    cursor: pointer;
  }

  &.is-open {
    border-bottom: 1px solid $color-energy-yellow;
  }
}

.heading {
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;

  &.is-checked {
    margin-right: 1rem;
    font-weight: 400;

    &::before {
      content: '✔\00a0';
    }
  }
}
</style>
