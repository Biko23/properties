import { createLocalVue, mount } from '@vue/test-utils'
import SingleProperty from '@/views/SingleProperty.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('SingleProperty.vue', () => {
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
            fetchCurrentPropertySelectedFeatures: jest.fn(),
            fetchSinglePropertyVisuals: jest.fn(),
            fetchPropertyNeighborhoodVisuals: jest.fn(),
            fetchPropertyNearbyLandmarkVisuals: jest.fn(),
            fetchCurrentPropertyDetails: jest.fn(),
            getPropertyLegalProtection: jest.fn(),
            clearPropertyLegalDetails: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allCurrentPropertyFeatures: () => ({}),
            allSinglePropertyVisuals: () => ({}),
            allSingleNeighborhoodVisuals: () => ({}),
            allSinglePropertyNearbyLandmarkVisuals: () => ({}),
            currentPropertyDetails: () => ({}),
            currentPropertyLegalProtection: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(SingleProperty, {
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

