import { createLocalVue, mount } from '@vue/test-utils'
import ViewRentalProperty from '@/components/ViewRentalProperty.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('ViewRentalProperty.vue', () => {
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
            fetchSinglePropertyVisuals: jest.fn(),
            fetchPropertyNearbyLandmarkVisuals: jest.fn(),
            fetchPropertyNeighborhoodVisuals: jest.fn(),
            fetchCurrentPropertyValue: jest.fn(),
            fetchPropertyPriceHistories: jest.fn(),
            fetchCurrentPropertySelectedFeatures: jest.fn(),
            addAViewedProperty: jest.fn(),
            removePropertyFromFavorites: jest.fn(),
            addPropertyToFavorites: jest.fn(),
            checkIfUserIsAlreadyInterestedInAProperty: jest.fn(),
            expressInterestInBuyingAProperty: jest.fn(),
            getSimilarProperties: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allSinglePropertyVisuals: () => ([{created_by: 'Isaac'}]),
            allSinglePropertyNearbyLandmarkVisuals: () => ({}),
            allSingleNeighborhoodVisuals: () => ({}),
            currentRentalValue: () => ({}),
            currentPropertyPriceHistory: () => ({}),
            allCurrentPropertyFeatures: () => ([{}]),
            loginState: () => ({}),
            currentLoggedinUser: () => ({}),
            allCurrentUserFavoriteProperties: () => ([{
                property_id: 1
            }]),
            checkUserInterestInProperty: () => ({}),
            allSimilarProperties: () => ({})           

        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(ViewRentalProperty, {
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

