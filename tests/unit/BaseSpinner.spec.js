import 'jsdom-global'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BaseSpinner from '@/components/BaseSpinner.vue'

describe('BaseSpinner.vue', () => {
  const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = () => {
        return mount(BaseSpinner, {
          localVue,
          vuetify
        })
    }

  it('renders a spinner div', () => {
      const wrapper = mountFunction()
      expect(wrapper.find('div')).toMatchSnapshot()
  })
})

