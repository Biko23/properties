import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import TopNav from '@/components/TopNav.vue'

describe('TopNav.vue', () => {
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
            fetchVendorsCategories: jest.fn(),
            fetchTotalFavoriteCount: jest.fn(),
            postAUserLog: jest.fn()
        },
        getters = {
            loginState: jest.fn(), 
            currentLoggedinUser: jest.fn(), 
            currentUserFavoriteTotalCount: jest.fn()
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFunction = options => {
        return shallowMount(TopNav, {
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

