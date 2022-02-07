import { createLocalVue, mount } from '@vue/test-utils'
import ViewUserProfile from '@/views/ViewUserProfile.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('ViewUserProfile.vue', () => {
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
        getters = {
            currentLoggedinUser: () => ({})
        }
        store = new Vuex.Store({
            getters
        })
    })

    const mountFactory = options => {
        return mount(ViewUserProfile, {
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

