import { createLocalVue, mount } from '@vue/test-utils'
import EditNeighborhoodVisuals from '@/views/EditNeighborhoodVisuals.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('EditNeighborhoodVisuals.vue', () => {
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
            postAUserLog: jest.fn(),
            fetchPropertyNeighborhoodVisuals: jest.fn(),
            updatedNeighborhoodVisual: jest.fn(),
            createSingleNeighborhoodVisual: jest.fn()
        }
        getters = {
            currentLoggedinUser: () => ({}),
            allSingleNeighborhoodVisuals: () => ({})     
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(EditNeighborhoodVisuals, {
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

