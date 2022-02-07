import { createLocalVue, mount } from '@vue/test-utils'
import EditPropertyVisuals from '@/views/EditPropertyVisuals.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('EditPropertyVisuals.vue', () => {
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
            postAUserLog: jest.fn(),
            updatedPropertyVisual: jest.fn(),
            createSinglePropertyVisual: jest.fn()            
        }
        getters = {
            allSinglePropertyVisuals: () => ({}),
            currentLoggedinUser: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(EditPropertyVisuals, {
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

