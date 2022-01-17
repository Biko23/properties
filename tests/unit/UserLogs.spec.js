import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import UserLogs from '@/components/UserLogs.vue'


describe('UserLogs.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let actions
    let getters
    let store
    let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
        getAUserLog: jest.fn()
    }
    getters = {
        getCurrentUserAuditLogs: () => ([{
            activity: 'Click view btn', when_created: '12/12/2021'
        }])

    }
    store = new Vuex.Store({
        actions,
        getters
    })
  })

  const mountFactory = options => {
    return mount(UserLogs, {
      localVue,
      vuetify,
      store,
      ...options,
    })
}

  it('dispatches "fetchUserLogs" when the component is created', () => {
      const fetchUserLogs = jest.fn()
    const wrapper = mountFactory({
      methods: { fetchUserLogs }
    })
    expect(fetchUserLogs).toHaveBeenCalled()
    expect(wrapper.find('[data-testid="log-activity"]').text()).toBe('Click view btn')
    expect(wrapper.find('[data-testid="log-creation-date"]').text()).toBe('12/12/2021')
  })

  it('should contain data from  "getCurrentUserAuditLogs" getters when component is created', () => {
    const fetchUserLogs = jest.fn()
  const wrapper = mountFactory({
      methods: { fetchUserLogs }
  })
  expect(wrapper.find('[data-testid="log-activity"]').text()).toBe('Click view btn')
  expect(wrapper.find('[data-testid="log-creation-date"]').text()).toBe('12/12/2021')
})
})

