<template>
  <layout>
    <!-- PAGE 1 -->
    <layout
      vh="100"
      flex
      clearfix
      background-image="linear-gradient(45deg, #333333 0%, #151515 75%, #333333 100%)"
    >
      <layout width="85%" margin="auto">
        <h1 class="text-center">Vue-Accordion</h1>
        <div class="tagline text-center">Renderless component for composing Accordion</div>
        <layout mt="2rem">
          <accordion-item v-bind="examples.single">
            <template slot="heading">{{ shortLoremIpsum }}</template>
            <template slot="content">
              <layout margin="1rem">{{ loremIpsum }}</layout>
            </template>
          </accordion-item>
        </layout>
        <layout mt="2rem">
          <b-btn
            @click="toggle('examples.single', 'opened')"
            :variant="examples.single.opened && 'primary' || 'danger'"
          >Toggle : {{ examples.single.opened && 'OPENED' || 'CLOSED' }}</b-btn>
          <b-btn
            class="ml-10"
            @click="toggle('examples.single', 'toggleable')"
            :variant="examples.single.toggleable && 'primary' || 'danger'"
          >Toggle : {{ examples.single.toggleable && 'TOGGLABLE' || 'STATIC' }}</b-btn>
        </layout>
      </layout>
    </layout>

    <!-- PAGE 2 -->
    <layout minvh="100" clearfix flex>
      <layout width="85%" margin="auto">
        <h2>Programmatic</h2>
        <accordion v-model="examples.several.value" ref="accordion" persist>
          <layout mt="2rem">
            <accordion-item>
              <template slot="heading">{{ shortLoremIpsum }}</template>
              <template slot="content">
                <layout margin="1rem">{{ loremIpsum }}</layout>
              </template>
            </accordion-item>
          </layout>
          <layout mt="1rem">
            <accordion-item>
              <template slot="heading">{{ shortLoremIpsum }}</template>
              <template slot="content">
                <layout margin="1rem">{{ loremIpsum }}</layout>
              </template>
            </accordion-item>
          </layout>
          <layout mt="1rem">
            <accordion-item opened>
              <template slot="heading">{{ shortLoremIpsum }}</template>
              <template slot="content">
                <layout margin="1rem">{{ loremIpsum }}</layout>
              </template>
            </accordion-item>
          </layout>
        </accordion>
        <layout mt="2rem">
          <b-btn variant="primary" @click="$refs.accordion.previous()">Previous</b-btn>
          <b-btn variant="primary" class="ml-10" @click="$refs.accordion.next()">Next</b-btn>
          <b-btn variant="danger" class="ml-10" @click="$refs.accordion.reset()">Reset</b-btn>
        </layout>
      </layout>
    </layout>

    <!-- PAGE 3 -->
    <layout minvh="100" clearfix flex>
      <layout width="85%" margin="auto">
        <h2>Independent Tabs</h2>
        <layout mt="2rem">
          <accordion-item single toggleable opened>
            <template slot="heading">{{ shortLoremIpsum }}</template>
            <template slot="content">
              <layout margin="1rem">{{ loremIpsum }}</layout>
            </template>
          </accordion-item>
        </layout>
        <layout mt="1rem">
          <accordion-item single toggleable>
            <template slot="heading">{{ shortLoremIpsum }}</template>
            <template slot="content">
              <layout margin="1rem">{{ loremIpsum }}</layout>
            </template>
          </accordion-item>
        </layout>
        <layout mt="1rem">
          <accordion-item single toggleable>
            <template slot="heading">{{ shortLoremIpsum }}</template>
            <template slot="content">
              <layout margin="1rem">{{ loremIpsum }}</layout>
            </template>
          </accordion-item>
        </layout>
      </layout>
    </layout>
  </layout>
</template>

<script>
import set from 'lodash.set'
import get from 'lodash.get'
import Layout from './Layout'
import loremIpsum from 'lorem-ipsum'
import capitalize from 'lodash.capitalize'
import Accordion, { AccordionItem } from 'vue-scope-components'


export default {
  name: 'Docs',
  components: {
    Layout,
    Accordion,
    AccordionItem
  },
  data: () => ({
    examples: {
      single: {
        single: true,
        opened: true,
        toggleable: true
      },
      several: {
        value: undefined
      }
    }
  }),
  computed: {
    loremIpsum() {
      return loremIpsum({ units: 'sentences', count: 4 })
    },
    shortLoremIpsum() {
      return capitalize(loremIpsum({ units: 'words', count: 4 }))
    }
  },
  methods: {
    toggle(path, prop) {
      const obj = get(this, path)
      const value = !obj[prop]
      set(obj, prop, value)
    }
  }
}
</script>

<style lang="scss">
.docs-c-pointer {
  cursor: pointer;
}
</style>
