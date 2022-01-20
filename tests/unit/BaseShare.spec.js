import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueSocialSharing from 'vue-social-sharing'
import BaseShare from '@/components/BaseShareComponent.vue'

describe('BaseDialog.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(BaseShare, {
      localVue,
      vuetify,
      VueSocialSharing,
      ...options
    })
  }

  it('First element should contain the default props', () => {
    const wrapper = mountFunction()

    expect(wrapper.find('[data-testid="share-network-element"]').props().url).toBe('http://localhost:8080')
    expect(wrapper.find('[data-testid="icon-element"]').props().color).toBe('#333333')
  })

  it('First element should contain modified props', () => {
    const wrapper = mountFunction({
      propsData: {
        url: 'http://example.com'
      },
      data(){
        return {
          networks: [
            {
              network: "whatsapp",
              name: "Whatsapp",
              icon: "mdi-whatsapp",
              color: "#AAD456",
              type: "popup",
            }
          ]
        }
      }
    })

    expect(wrapper.find('[data-testid="share-network-element"]').props().url).toBe('http://example.com')
    expect(wrapper.find('[data-testid="icon-element"]').props().color).toBe('#AAD456')
  })
})

