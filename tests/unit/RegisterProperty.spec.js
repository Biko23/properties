import { createLocalVue, mount } from '@vue/test-utils'
import RegisterProperty from '@/views/RegisterProperty.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import UploadImages from "vue-upload-drop-images";


describe.skip('RegisterProperty.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    let actions
    let getters
    let store
    let vuetify
    let router

    // let MyElement = `${<RegisterProperty>
    //                     <UploadImages />
    //                 </RegisterProperty>}`

    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter()
        actions = {
            fetchPropertyTypes: jest.fn(),
            fetchPropertyFeatures: jest.fn(),
            addPropertyDataFromPageOne: jest.fn(),
            fetchPropertyCategories: jest.fn(),
            postAUserLog: jest.fn(),
            fetchAllDistricts: jest.fn(),
            fetchDivisionsByDistrictId: jest.fn(),
            fetchSuburbsByDistrictId: jest.fn()
        }
        getters = {
            allPropertyTypes: () => ({}),
            allPropertyFeatures: () => ({}),
            allDistricts: () => ({}),
            allDivisions: () => ({}),
            allSuburbs: () => ({})
        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(RegisterProperty, {
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

