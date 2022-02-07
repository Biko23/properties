import { createLocalVue, mount } from '@vue/test-utils'
import EditLandmarkVisuals from '@/views/EditLandmarkVisuals.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


describe('EditLandmarkVisuals.vue', () => {
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
            postAUserLog: jest.fn(),
            updatedPropertyVisual: jest.fn(),
            createSingleLandmarkVisual: jest.fn(),
            fetchPropertyNearbyLandmarkVisuals: jest.fn(),
            fetchPropertyLandmarkTypes: jest.fn(),
            updatedLandmarkVisual: jest.fn()
        }
        getters = {
            // allSinglePropertyVisuals:  () => ([{
            //     'property_number': 'E45D5697'
            // }]),
            currentLoggedinUser: () => ({}),
            allSinglePropertyNearbyLandmarkVisuals: () => ({}),
            allPropertyLandmarkTypes: ()=> ({})
            // allSimilarProperties: () => ({})          

        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(EditLandmarkVisuals, {
            localVue,
            vuetify,
            store,
            router,
            ...options
        })
    }

    it('should have a match snapshot', () => {
        const commaFormatted = jest.fn()
        const confirmIfPropertyIsAlreaydAddedToInterests = jest.fn()
        const wrapper = mountFactory({
            methods: { commaFormatted, confirmIfPropertyIsAlreaydAddedToInterests }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
})

