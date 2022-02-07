import { createLocalVue, mount } from '@vue/test-utils'
import GetStarted from '@/views/GetStarted.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('GetStarted.vue', () => {
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
            assignUpdatingUserRole: jest.fn(), 
            fetchAllUserRoles: jest.fn(),
            postAUserLog: jest.fn()          
        }
        getters = {
            loginState: () => ({}),
            iAmASeller: () => ({}), 
            iAmACertifiedSeller: () => ({}), 
            allRoles: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(GetStarted, {
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

