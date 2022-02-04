import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BaseSpinner from '@/components/BaseSpinner.vue'

describe('BaseSpinner.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(BaseSpinner, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should have a match snapshot', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

