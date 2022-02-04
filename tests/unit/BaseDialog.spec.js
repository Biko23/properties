import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BaseDialog from '@/components/BaseDialog.vue'

describe('BaseDialog.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(BaseDialog, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should have a match snapshot', () => {
    const wrapper = mountFunction()

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    // const title = wrapper.find('.v-card__title > span')
    // expect(title.text()).toBe('Foobar')
  })

  // it('should have default props details', () => {
  //       const wrapper = mountFunction()
  //       expect(wrapper.find('[data-testid="dialog-state-element"]').props().value).toBe(false)
  //       expect(wrapper.find('[data-testid="title-element"]').text()).toBe('No message')
  //       expect(wrapper.find('[data-testid="message-element"]').text()).toBe(null)
  //   })

  // it('should have modified props details', () => {
  //     const wrapper = mountFunction({
  //         propsData: { 
  //           dialogState: true,
  //           title: 'Success',
  //           message: 'Succeeded'
  //         }
  //       })

  //       expect(wrapper.find('[data-testid="dialog-state-element"]').props().value).toBe(true)
  //       expect(wrapper.find('[data-testid="title-element"]').text()).toBe('Success')
  //       expect(wrapper.find('[data-testid="message-element"]').text()).toEqual('Succeeded')
  // })
})

