import { createLocalVue, mount } from '@vue/test-utils'
import UserProfile from '@/views/UserProfile.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('UserProfile.vue', () => {
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
            updateUser: jest.fn(),
            fetchAllUserRoles: jest.fn(),
            fetchLoggedUser: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            currentLoggedinUser: () => ({}),
            iAmASeller: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(UserProfile, {
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

