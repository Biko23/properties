import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import BaseLink from '@/components/Links.vue'

describe('BaseLink', () => {
    const localVue = createLocalVue()
    let vuetify, router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
    })

    const mountFactory = options => {
        return mount(BaseLink, {
          localVue,
          vuetify,
          router,
          ...options,
        })
    }

  it('should have default props link - / and title - All', () => {
        const wrapper = mountFactory()
        expect(wrapper.find('[data-testid="link-element"]').props().link).toBe('/')
        expect(wrapper.find('[data-testid="title-element"]').text()).toBe('All')
    })

    it('should have modified props link - /electrical and title - Electrical', () => {
        const wrapper = mountFactory({
            propsData: { 
                link: '/electrical',
                title: 'Electrical'
            }
          })
        
        expect(wrapper.find('[data-testid="link-element"]').props().link).toBe('/electrical')
        expect(wrapper.find('[data-testid="title-element"]').text()).toBe('Electrical')
    })
})
