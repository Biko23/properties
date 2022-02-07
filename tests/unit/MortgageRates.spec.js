import { createLocalVue, mount } from '@vue/test-utils'
import MortgageRates from '@/views/MortgageRates.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('MortgageRates.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let actions
    let getters
    let store
    let vuetify
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
        actions = {
            postAUserLog: jest.fn()           
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFactory = options => {
        return mount(MortgageRates, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFactory({})
        expect(wrapper.html()).toMatchSnapshot()
    })
})

