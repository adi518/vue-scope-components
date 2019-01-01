<template>
  <div :class="[name.kebab, classes]">
    <!-- Wrap `.header` to fix IE 10/11 flex/min-height bug -->
    <!-- @link https://stackoverflow.com/a/47180142/4106263 -->
    <div class="header-wrap" role="tab">
      <div
        :class="['header', { 'is-opened': flags.opened, 'is-enabled': flags.enabled }]"
        @click="handleClick(index)"
      >
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
    <template v-if="flags.opened">
      <div role="tabpanel">
        <slot name="content"></slot>
      </div>
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
    enabled: {
      type: Boolean,
      default: true
    },
    opened: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
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
        index: undefined,
        enabled: this.enabled,
        opened: this.opened,
        checked: this.checked
      }
    }
  },

  watch: {
    /**
     * Keeps props in sync with mutable data.
     */
    opened(value) {
      this.mutable.opened = value
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
     * Looks for `accordion` provider and
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
        opened: this.mutable.opened,
        closed: !this.mutable.opened,
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
        flags: { opened, closed, enabled, disabled, toggleable, checked, sealed }
      } = this
      return {
        'is-opened': opened,
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
      this.tabs.remove(this.index)
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
        this.set('opened', !this.flags.opened)
        this.$emit('update:opened', this.flags.opened)
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

  &.is-opened {
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

  &.is-opened {
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
      content: "✔\00a0";
    }
  }
}
</style>
