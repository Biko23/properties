import { createLocalVue, mount } from '@vue/test-utils'
import About from '@/views/About.vue'
import Vuetify from 'vuetify'


describe('ViewSimilarRental.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFactory = options => {
        return mount(About, {
            localVue,
            vuetify,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFactory({})
        expect(wrapper.html()).toMatchSnapshot()
    })
})

