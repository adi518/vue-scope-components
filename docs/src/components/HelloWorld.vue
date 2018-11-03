<template>
  <layout>

    <!-- PAGE 1 -->
    <layout vh="100" flex clearfix background-image="linear-gradient(45deg, #333333 0%,#151515 75%,#333333 100%)">
      <layout width="85%" margin="auto">
        <h1 class="text-center">Vue-Accordion</h1>
        <div class="tagline text-center">Renderless component for composing Accordion</div>
        <layout mt="2rem">
          <accordion-item toggleable single>
            <template slot="heading"> {{ shortLoremIpsum() }} </template>
            <template slot="content">
              <layout margin="1rem">
                {{ loremIpsum() }}
              </layout>
            </template>
          </accordion-item>
        </layout>
      </layout>
    </layout>

    <!-- PAGE 2 -->
    <layout minvh="100" clearfix flex>
      <layout width="85%" margin="auto">
        <h2>Programmatic</h2>
        <accordion ref="accordion" persist>
          <layout mt="2rem">
            <accordion-item open>
              <template slot="heading"> {{ shortLoremIpsum() }} </template>
              <template slot="content">
                <layout margin="1rem">
                  {{ loremIpsum() }}
                </layout>
              </template>
            </accordion-item>
          </layout>
          <layout mt="1rem">
            <accordion-item>
              <template slot="heading"> {{ shortLoremIpsum() }} </template>
              <template slot="content">
                <layout margin="1rem">
                  {{ loremIpsum() }}
                </layout>
              </template>
            </accordion-item>
          </layout>
          <layout mt="1rem">
            <accordion-item>
              <template slot="heading"> {{ shortLoremIpsum() }} </template>
              <template slot="content">
                <layout margin="1rem">
                  {{ loremIpsum() }}
                </layout>
              </template>
            </accordion-item>
          </layout>
        </accordion>
        <layout margin="1rem 0" flex justify-content="space-between" noclearfix>
          <span style="font-size: 1.5rem" @click="$refs.accordion.previous()"> &larr; </span>
          <span style="font-size: 1.5rem" @click="$refs.accordion.next()"> &rarr; </span>
        </layout>
      </layout>
    </layout>

  </layout>
</template>

<script>
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
    index: undefined
  }),
  methods: {
    loremIpsum() {
      return loremIpsum({ units: 'sentences', count: 4 })
    },
    shortLoremIpsum() {
      return capitalize(loremIpsum({ units: 'words', count: 4 }))
    }
  }
}
</script>
