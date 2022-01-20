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

  it('Should output the current year', () => {
      let currentYear = new Date().getFullYear();
      const wrapper = mountFunction()

      expect(wrapper.find('[data-testid="current-year"]').text()).toBe(currentYear.toString())
  })
})

