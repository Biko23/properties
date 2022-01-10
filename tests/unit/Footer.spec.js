import 'jsdom-global'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = () => {
        return mount(Footer, {
          localVue,
          vuetify
        })
    }

  it('renders a v-container', () => {
      const wrapper = mountFunction()
      expect(wrapper.find('.v-container')).toMatchSnapshot()
  })
  
  it('renders a v-card-text', () => {
      const wrapper = mountFunction()
      expect(wrapper.find('.v-card__text')).toMatchSnapshot()
  })
})

