import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import HomeComponent from '@/components/HomeComponent.vue'

describe.skip('HomeComponent.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let vuetify
    let getters
    let actions
    let store
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
        actions = {
            fetchLatestListedProperties: jest.fn(),
            fetchLatestListedRentals: jest.fn(),
            fetchPropertiesBySearchKeyword: jest.fn(),
            loadSearchKeywordIntoGlobalState: jest.fn(),
            fetchAutoCompleteWords: jest.fn(),
            fetchPropertyCategories: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allLatestProperties: () => ({}),
            allLatestRentals: () => ({}),
            iAmACertifiedSeller: () => ({}),
            allVendorsCategories: () => ({}),
            allAutocompletedList: () => ({})
        }
        store = new Vuex.Store({
            getters,
            actions
        })
    })

    const mountFunction = options => {
        return mount(HomeComponent, {
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

