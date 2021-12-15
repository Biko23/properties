import 'jsdom-global'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import FavoriteProperties from '../../components/FavoritePropertiesComponent.vue'

describe('FavoritePropertiesComponent.vue', () => {
  const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return mount(FavoriteProperties, {
          localVue,
          vuetify,
          ...options
        })
    }

  it('should have be an object and match snapshot', () => {
    const wrapper = mountFunction()
  
      expect(wrapper.methods).toBe('Object')
  })

  // it('should emit an event when the action v-btn is clicked', () => {
    //     const wrapper = mountFunction({
    //         propsData: { title: 'Success' }
    //       })
        
    //     const event = jest.fn()
    //     const button = wrapper.find('.v-btn')
    //     // Here we bind a listener to the wrapper
    //     // instance to catch our custom event
    //     wrapper.vm.$on('action-btn:clicked', event)

    //     expect(event).toHaveBeenCalledTimes(0)

    //     // Simulate a click on the button
    //     button.trigger('click')

    //     // Ensure that our mock event was called
    //     expect(event).toHaveBeenCalledTimes(1)
    // })

    // it('should have a custom whatsapp icon and match snapshot', () => {
  //       const wrapper = mountFunction({
  //         propsData: { network: 'email' }
  //       })
    
  //       expect(wrapper.html()).toMatchSnapshot()

  //       const sharenetwork = wrapper.find('div sharenetwork > network')
  //       expect(sharenetwork).toEqual('email')
  //   })


})

