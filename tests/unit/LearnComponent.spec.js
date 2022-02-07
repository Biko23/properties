import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import LearnComponent from '@/components/LearnComponent.vue'

describe('LearnComponent.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let vuetify
    let actions
    let store
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
        actions = {
            postAUserLog: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    })

    const mountFunction = options => {
        return mount(LearnComponent, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFunction()
        expect(wrapper.html()).toMatchSnapshot()
    })
})

