import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MobileMainNav from '@/components/MobileMainNav.vue'

describe('MobileMainNav.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let vuetify
    let actions
    let getters
    let store
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
        actions = {
            logout: jest.fn(),
            fetchVendorsCategories: jest.fn()
        },
        getters = {
            loginState: jest.fn(),
            allVendorsCategories: jest.fn(),
            iAmACertifiedSeller: jest.fn()
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFunction = options => {
        return shallowMount(MobileMainNav, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFunction()
        expect(wrapper.html()).toMatchSnapshot()
    })
})

