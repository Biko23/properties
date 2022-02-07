import { createLocalVue, mount } from '@vue/test-utils'
import NewPasswordResetPassword from '@/views/passwordReset/NewPasswordResetPassword.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'


describe('NewPasswordResetPassword.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let actions
    let store
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        actions = {
            resetPassword: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFactory = options => {
        return mount(NewPasswordResetPassword, {
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

