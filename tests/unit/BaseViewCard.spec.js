import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import BaseViewCard from '@/components/BaseViewedCard.vue'

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

  it('Should contains default props values', () => {
    const wrapper = mountFunction()

    expect(wrapper.find('[data-testid="date-element"]').text()).toBe('Viewed Thursday')
    expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('https://res.cloudinary.com/diued7ugb/image/upload/v1625732723/house1_svrut7.jpg')
    expect(wrapper.find('[data-testid="cost-element"]').text()).toBe('UGX: 0')
    expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: Category missing')
    expect(wrapper.find('[data-testid="location-element"]').text()).toBe('Located: No available location')
    expect(wrapper.find('[data-testid="posted-by-element"]').text()).toBe('Posted by: No name')
  })

  it('Should contains modified props values', () => {
    const wrapper = mountFunction({
      propsData: {
        postedBy: 'Developer',
        category: 'Rental',
        location: 'Munyonyo',
        src: 'file://test_image.png',
        date: "01/01/2022",
        cost: 10000
      }
    })

    expect(wrapper.find('[data-testid="date-element"]').text()).toBe('Viewed 01/01/2022')
    expect(wrapper.find('[data-testid="image-element"]').props().src).toBe('file://test_image.png')
    expect(wrapper.find('[data-testid="cost-element"]').text()).toBe('UGX: 10000')
    expect(wrapper.find('[data-testid="category-element"]').text()).toBe('Category: Rental')
    expect(wrapper.find('[data-testid="location-element"]').text()).toBe('Located: Munyonyo')
    expect(wrapper.find('[data-testid="posted-by-element"]').text()).toBe('Posted by: Developer')
  })
})
