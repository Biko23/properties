import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import PopUpDialog from '@/components/PopUpDialog.vue'

describe('PopUpDialog.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const mountFunction = options => {
        return shallowMount(PopUpDialog, {
            localVue,
            vuetify,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFunction()
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should contains default props values', () => {
        const wrapper = mountFunction()

        expect(wrapper.find('[data-testid="title-element"]').text()).toBe('No Title')
        expect(wrapper.find('[data-testid="message-element"]').text()).toBe('No message available')
        expect(wrapper.find('[data-testid="title-element"]').props().color).toBe('primary')
    })

    it('Should contains modified props values', () => {
        const wrapper = mountFunction({
            propsData: {
                title: 'New Title',
                message: 'New Message',
                color: 'Green'
            }
        })

        expect(wrapper.find('[data-testid="title-element"]').text()).toBe('New Title')
        expect(wrapper.find('[data-testid="message-element"]').text()).toBe('New Message')
        expect(wrapper.find('[data-testid="title-element"]').props().color).toBe('Green')
    })
})

