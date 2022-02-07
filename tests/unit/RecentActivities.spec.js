import { createLocalVue, mount } from '@vue/test-utils'
import RecentActivities from '@/components/RecentActivities.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('RecentActivities.vue', () => {
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
            fetchViewedRentalProperties: jest.fn(), 
            fetchViewedSaleProperties: jest.fn(), 
            postAUserLog: jest.fn()
        }
        getters = {
            allRecentViewedRentals: () => ({}), 
            allRecentViewedProperties: () => ({})     
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(RecentActivities, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const formatDate = jest.fn()
        const wrapper = mountFactory({
            methods: { formatDate }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})

