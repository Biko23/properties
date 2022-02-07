import { createLocalVue, mount } from '@vue/test-utils'
import RegisterProperty2 from '@/views/RegisterProperty2.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe.skip('RegisterProperty2.vue', () => {
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
            addPropertyDataFromPageTwo: jest.fn(),
            fetchCurrencies: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allCurrencies: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(RegisterProperty2, {
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

