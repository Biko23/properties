import 'jsdom-global'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BaseViewCard from '../../components/BaseViewedCard.vue'

describe('BaseViewCard.vue', () => {
  const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(BaseViewCard, {
          localVue,
          vuetify,
          ...options
        })
    }

    it('should be a function', () => {
        const wrapper = mountFunction()
        expect(typeof wrapper.data).toBe('function')
    })

//   it('should have a custom date and match snapshot', () => {
//     const wrapper = mountFunction({
//         propsData: { date: '13th/12/2021', cost: '99738' }
//       })
  
//       expect(wrapper.html()).toMatchSnapshot()

//       const category = wrapper.find('.test-subtitle  small')
//       expect(category.text()).toEqual('UGX: 99738')
//   })
})

