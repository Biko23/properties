import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import RecentProperties from '@/components/RecentPropertiesComponent.vue'

describe('BaseLink', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFactory = options => {
        return mount(RecentProperties, {
          localVue,
          vuetify,
          ...options,
        })
    }

  it('should have default props description, created_by and src', () => {
        const wrapper = mountFactory()
        expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg')
        expect(wrapper.find('[data-testid="description-element"]').text()).toBe('No description')
        expect(wrapper.find('[data-testid="created-element"]').text()).toBe('Added By :Creator missing')
    })

    it('should have modified props description, created_by and src', () => {
        const wrapper = mountFactory({
            propsData: { 
                description: '3 bedroom',
                created_by: 'Isaac',
                src: 'file://test-image.png'
            }
          })
        
          expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('file://test-image.png')
          expect(wrapper.find('[data-testid="description-element"]').text()).toBe('3 bedroom')
          expect(wrapper.find('[data-testid="created-element"]').text()).toBe('Added By :Isaac')
    })
})
