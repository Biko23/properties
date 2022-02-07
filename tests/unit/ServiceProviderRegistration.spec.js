import { createLocalVue, mount } from '@vue/test-utils'
import ServiceProviderRegistration from '@/views/ServiceProviderRegistration.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('ServiceProviderRegistration.vue', () => {
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
            fetchVendorsCategories: jest.fn(), 
            postVendor: jest.fn(), 
            postAUserLog: jest.fn()
        }
        getters = {
            allVendorsCategories: () => ({}), 
            currentLoggedinUser: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(ServiceProviderRegistration, {
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

