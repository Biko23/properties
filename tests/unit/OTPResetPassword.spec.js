import { createLocalVue, shallowMount } from '@vue/test-utils'
import OTPResetPassword from '@/views/passwordReset/OTPResetPassword.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueOtp2 from 'vue-otp-2'


describe('OTPResetPassword.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueOtp2)
    let actions
    let store
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        actions = {
            generatePasswordResetOTP: jest.fn(), 
            validateSubmittedOTP: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFactory = options => {
        return shallowMount(OTPResetPassword, {
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

