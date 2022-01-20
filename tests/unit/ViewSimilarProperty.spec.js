import { createLocalVue, mount } from '@vue/test-utils'
import ViewSimlarProperty from '@/components/ViewSimilarProperty.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('UserLogs.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let actions
    let getters
    let store
    let vuetify
    let router

    // changed all query from html markup to computed, if fails revert
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
            postAUserLog: jest.fn()
        }
        getters = {
            allSinglePropertyVisuals:  () => ([{
                'property_number': 'E45D5697'
            }]),
            allSinglePropertyNearbyLandmarkVisuals: () => ({}),
            allSingleNeighborhoodVisuals: () => ({}),
            currentPropertyValue: () => ({}),
            currentPropertyPriceHistory: () => ({}),
            allCurrentPropertyFeatures: () => ([{name: '3 bedroom'}, { name: '1 garage' }]),
            loginState: () => ({}),
            currentLoggedinUser: () => ({}),
            allCurrentUserFavoriteProperties: () => ({}),
            checkUserInterestInProperty: () => ({})           

        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(ViewSimlarProperty, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have called "confirmIfPropertyIsAlreaydAddedToInterests" once when the component is created', () => {
        const commaFormatted = jest.fn()
        const confirmIfPropertyIsAlreaydAddedToInterests = jest.fn()

        const wrapper = mountFactory({
            methods: { commaFormatted, confirmIfPropertyIsAlreaydAddedToInterests }
        })

        expect(confirmIfPropertyIsAlreaydAddedToInterests).toHaveBeenCalledTimes(1)
    })

    it('should have called "expressInterestInProperty" once when the express-interest btn is clicked', async () => {
        const commaFormatted = jest.fn()
        const expressInterestInProperty = jest.fn()

        const wrapper = mountFactory({
            methods: { commaFormatted, expressInterestInProperty }
        })
        
        await wrapper.findComponent('.express-interest-btn').trigger('click')
        expect(expressInterestInProperty).toHaveBeenCalledTimes(1)
    })
    
})

