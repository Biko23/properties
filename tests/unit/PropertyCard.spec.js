import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import PropertyCard from '@/components/PropertyCard.vue'

describe('PropertyCard.vue', () => {
    const localVue = createLocalVue()
    let vuetify, router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
    })

    const mountFunction = options => {
        return mount(PropertyCard, { localVue, vuetify, router, ...options })
    }

    it('Should contains default props values', () => {
        const wrapper = mountFunction()
        
        expect(wrapper.find('[data-testid="link-element"]').props().to).toBe('/view')
        expect(wrapper.find('[data-testid="date-element"]').text()).toBe('Saturday')
        expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg')
        expect(wrapper.find('[data-testid="cost-element"]').text()).toBe('UGX: 0')
        expect(wrapper.find('[data-testid="code-element"]').text()).toBe('Code: No code')
        expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: Category missing')
        expect(wrapper.find('[data-testid="location-element"]').text()).toBe('Located: No available location')
        expect(wrapper.find('[data-testid="posted-by-element"]').text()).toBe('Posted by: No name')
    })

      it('Should contains modified props values', () => {
        const wrapper = mountFunction({
            propsData: {
            postedBy: 'Developer',
            category: 'Rental',
            propertyCode: 'E23D45DE',
            location: 'Munyonyo',
            src: 'file://test_image.png',
            lazy: 'file://lazy_image.png',
            date: "01/01/2022",
            cost: 10000,
            to: '/home'
          }
        })
    
        expect(wrapper.find('[data-testid="link-element"]').props().to).toBe('/home')
        expect(wrapper.find('[data-testid="date-element"]').text()).toBe('01/01/2022')
        expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('file://test_image.png')
        expect(wrapper.find('[data-testid="cost-element"]').text()).toBe('UGX: 10000')
        expect(wrapper.find('[data-testid="code-element"]').text()).toBe('Code: E23D45DE')
        expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: Rental')
        expect(wrapper.find('[data-testid="location-element"]').text()).toBe('Located: Munyonyo')
        expect(wrapper.find('[data-testid="posted-by-element"]').text()).toBe('Posted by: Developer')
    
      })
})