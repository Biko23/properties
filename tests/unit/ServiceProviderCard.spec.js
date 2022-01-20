import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import ServiceProvider from '@/components/ServiceProviderCard.vue'

describe('ServiceProvider', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFactory = options => {
        return mount(ServiceProvider, {
          localVue,
          vuetify,
          ...options,
        })
    }

  it('should have default props vencor, phone, category, points and src', () => {
        const wrapper = mountFactory({
            propsData: {
                src: "../assets/provider.jpg"
            }
        })
        expect(wrapper.find('[data-testid="vendor-element"]').text()).toBe('No name')
        expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('../assets/provider.jpg')
        expect(wrapper.find('[data-testid="number-element"]').text()).toBe('No available number')
        expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: No Category')
        expect(wrapper.find('[data-testid="like-element"]').text()).toBe('Likes: 0')
    })

    it('should have modified props vencor, phone, category, points and src', () => {
        const wrapper = mountFactory({
            propsData: { 
                vendor_name: 'Godwin',
                vendor_primary_phone_number: '0780112233',
                vendorCategory: 'Electrical',
                points: 8,
                src: 'file://test-image.png'
            }
          })
        
        expect(wrapper.find('[data-testid="vendor-element"]').text()).toBe('Godwin')
        expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('file://test-image.png')
        expect(wrapper.find('[data-testid="number-element"]').text()).toBe('0780112233')
        expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: Electrical')
        expect(wrapper.find('[data-testid="like-element"]').text()).toBe('Likes: 8')
    })
})
