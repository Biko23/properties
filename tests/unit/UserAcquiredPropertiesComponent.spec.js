import { createLocalVue, mount } from '@vue/test-utils'
import UserAcquiredPropertiesComponent from '@/components/UserAcquiredPropertiesComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('UserAcquiredPropertiesComponent.vue', () => {
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
            getCurrentUserAcquiredProperties: jest.fn(),
            getCurrentUserAcquiredRentals: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allUserAcquiredProperties: () => ({}),
            allUserAcquiredRentals: () => ({})          

        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(UserAcquiredPropertiesComponent, {
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

