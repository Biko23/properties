import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BottonNav from '@/components/BottonNav.vue'

describe('BottonNav.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(BottonNav, {
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

