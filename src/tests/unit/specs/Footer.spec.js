import Footer from '../../../components/Footer'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'

describe('Footer.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    
  it('renders a v-card-text', () => {
        const wrapper = mount(Footer, {
          localVue,
          vuetify
        })

        expect(wrapper.find('.v-card__text')).toBe(true)
  })
})

