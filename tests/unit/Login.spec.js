import { createLocalVue, mount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('Login.vue', () => {
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
            fetchLoggedUser: jest.fn(), 
            login: jest.fn(), 
            fetchTotalFavoriteCount: jest.fn(), 
            postAUserLog: jest.fn()        
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFactory = options => {
        return mount(Login, {
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

