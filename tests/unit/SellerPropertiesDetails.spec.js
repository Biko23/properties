import { createLocalVue, mount } from '@vue/test-utils'
import SellerPropertiesDetails from '@/views/SellerPropertiesDetails.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('SellerPropertiesDetails.vue', () => {
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
            getListedPropertiesByUsername: jest.fn(),
            getUnlistedPropertiesByUsername: jest.fn(),
            getUncertifiedPropertiesByUsername: jest.fn(),
            getListedRentalsByUsername: jest.fn(),
            getUnlistedRentalsByUsername: jest.fn(),
            getUncertifiedRentalsByUsername: jest.fn(),
            unlistPropertyFromMarketPlace: jest.fn(),
            requestToListPropertyBackOnMarketPlace: jest.fn(),
            unlistRentalFromMarketPlace: jest.fn(),
            requestToListRentalBackOnMarketPlace: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allCurrentUserListedProperties: () => ({}),
            allCurrentUserUnlistedProperties: () => ({}),
            allCurrentUserUncertifiedProperties: () => ({}),
            allCurrentUserListedRentals: () => ({}),
            allCurrentUserUnlistedRentals: () => ({}),
            allCurrentUserUncertifiedRentals: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(SellerPropertiesDetails, {
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

