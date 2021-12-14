import 'jsdom-global'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Dialog from '../../components/BaseDialog.vue'

describe('BaseDialog.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(Dialog, {
          localVue,
          vuetify,
          ...options,
        })
    }

  it('should have a custom message and match snapshot', () => {
        const wrapper = mountFunction({
          propsData: { message: 'Test message' }
        })
    
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a custom title and match snapshot', () => {
        const wrapper = mountFunction({
            propsData: { title: 'Success' }
          })
        
        expect(wrapper.html()).toMatchSnapshot()
    })
})

