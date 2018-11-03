import _Accordion, { AccordionItem as _AccordionItem } from '@/components/accordion'

export const Accordion = _Accordion
export const AccordionItem = _AccordionItem

export const Install = {
  Install(Vue) {
    Vue.component(_Accordion.name, _Accordion)
    Vue.component(_AccordionItem.name, _AccordionItem)
  }
}

export default _Accordion
