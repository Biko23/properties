import { createLocalVue, mount } from '@vue/test-utils'
import EmailResetPassword from '@/views/passwordReset/EmailResetPassword.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'


describe('EmailResetPassword.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let actions
    let store
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        actions = {
            generatePasswordResetOTP: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFactory = options => {
        return mount(EmailResetPassword, {
            localVue,
            vuetify,
            store,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFactory({})
        expect(wrapper.html()).toMatchSnapshot()
    })
})

