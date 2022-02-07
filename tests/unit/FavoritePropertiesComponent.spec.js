import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import FavoriteProperties from '@/components/FavoritePropertiesComponent.vue'

describe('FavoritePropertiesComponent.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueRouter)
  let vuetify
  let getters
  let actions
  let store
  let router

  beforeEach(() => {
    vuetify = new Vuetify()
    router = new VueRouter()
    actions = {
      fetchAllDetailedCurrentUserProperties: jest.fn(),
      removePropertyFromFavoriteSection: jest.fn(),
      postAUserLog: jest.fn()
    }
    getters = {
      allDetailedCurrentFavoriteList: () => ({}),
    }
    store = new Vuex.Store({
      getters,
      actions
    })
  })


  const mountFactory = options => {
    return mount(FavoriteProperties, {
      localVue,
      vuetify,
      store,
      ...options
    })
  }

  it('should match snapshot', () => {
    const wrapper = mountFactory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
