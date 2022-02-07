import { createLocalVue, mount } from '@vue/test-utils'
import PropertiesForRentComponent from '@/components/PropertyForRentComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('PropertiesForRentComponent.vue', () => {
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
            fetchPropertyForRent: jest.fn(),
            fetchPropertyCategories: jest.fn(),
            fetchFavoritePropertiesForComparision: jest.fn(),
            addPropertyToFavorites: jest.fn(),
            removePropertyFromFavorites: jest.fn(),
            postAUserLog: jest.fn(),
            fetchPropertyFeatures: jest.fn(),
            fetchPropertyTypes: jest.fn(),
            fetchPropertyLandmarkTypes: jest.fn(),
            fetchAllDistricts: jest.fn(),
            fetchDivisionsByDistrictId: jest.fn(),
            fetchSuburbsByDistrictId: jest.fn(),
            getAllDivisions: jest.fn(),
            getAllSuburbs: jest.fn(),
            getAdvancedSearchedRentals: jest.fn()
        }
        getters = {   
            allPropertyForRent: () => ({}),
            loginState: () => ({}),
            currentLoggedinUser: () => ({}),
            allCurrentUserFavoriteProperties: () => ({}),
            allPropertyFeatures: () => ({}),
            allPropertyTypes: () => ({}),
            allPropertyLandmarkTypes: () => ({}),
            allDistricts: () => ({}),
            allDivisions: () => ({}),
            allSuburbs: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(PropertiesForRentComponent, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const commaFormatted = jest.fn()
        const wrapper = mountFactory({
            methods: { commaFormatted }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})

