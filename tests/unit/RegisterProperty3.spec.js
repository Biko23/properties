import { createLocalVue, mount } from '@vue/test-utils'
import RegisterProperty3 from '@/views/RegisterProperty3.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe.skip('RegisterProperty3.vue', () => {
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
            fetchPropertyLandmarkTypes: jest.fn(),
            addPropertyDataFromPageThird: jest.fn(),
            submitAllPropertyData: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allPropertyLandmarkTypes: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(RegisterProperty3, {
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

