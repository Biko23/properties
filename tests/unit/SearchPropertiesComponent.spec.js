import { createLocalVue, mount } from '@vue/test-utils'
import SearchPropertiesComponent from '@/components/SearchPropertiesComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('SearchPropertiesComponent.vue', () => {
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
            fetchPropertiesBySearchKeyword: jest.fn(),
            fetchAutoCompleteWords: jest.fn(),
            fetchFavoritePropertiesForComparision: jest.fn(),
            removePropertyFromFavorites: jest.fn(),
            addPropertyToFavorites: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {           
            allSearchedResults: () => ({}),
            allAutocompletedList: () => ({}),
            currentLoggedinUser: () => ({}),
            allCurrentUserFavoriteProperties: () => ({}),
            loginState: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(SearchPropertiesComponent, {
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

