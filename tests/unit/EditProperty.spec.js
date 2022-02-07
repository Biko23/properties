import { createLocalVue, mount } from '@vue/test-utils'
import EditProperty from '@/views/EditProperty.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('EditProperty.vue', () => {
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
            getPropertyLegalProtection: jest.fn(), 
            postAPropertyLegalProtection: jest.fn(), 
            updateAPropertyLegalProtection: jest.fn(),
            clearPropertyLegalDetails: jest.fn(),
            fetchPropertyFeatures: jest.fn(),
            fetchCurrentPropertySelectedFeatures: jest.fn(),
            deleteAPropertyFeature: jest.fn(),
            addMoreFeaturesToAProperty: jest.fn(),
            fetchCurrentPropertyValue: jest.fn(),
            fetchPropertyRentalValue: jest.fn(),
            fetchCurrencies: jest.fn(),
            fetchPropertyLocationByPropertyId: jest.fn(),
            fetchAllDistricts: jest.fn(),
            fetchDivisionsByDistrictId: jest.fn(),
            fetchSuburbsByDistrictId: jest.fn(),
            updateCurrentPropertyLocation: jest.fn(),
            postAUserLog: jest.fn(),
            updateAPropertyValue: jest.fn(),
            updatePropertyRentalValue: jest.fn()
        }
        getters = {
            currentPropertyLegalProtection: () => ({}), 
            currentLoggedinUser: () => ({}), 
            allCurrentPropertyFeatures: () => ({}),
            currentPropertyValue: () => ({}),
            currentRentalValue: () => ({}),
            allPropertyFeatures: () => ({}),
            allCurrencies: () => ({}),
            currentPropertyLocation: () => ({}),
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
        return mount(EditProperty, {
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

