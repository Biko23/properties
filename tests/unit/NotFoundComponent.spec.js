import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

describe('NotFoundComponent.vue', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    let vuetify
    let router

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
    })

    const mountFunction = options => {
        return shallowMount(NotFoundComponent, {
            localVue,
            vuetify,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFunction()
        expect(wrapper.html()).toMatchSnapshot()
    })
})

