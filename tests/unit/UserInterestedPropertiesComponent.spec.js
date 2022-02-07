import { createLocalVue, mount } from '@vue/test-utils'
import UserInterestedProperties from '@/components/UserInterestedPropertiesComponent.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'


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
            getCurrentUserPropertiesOfInterest: jest.fn(),
            getCurrentUserRentalsOfInterest: jest.fn(),
            postAUserLog: jest.fn()
        }
        getters = {
            allUserInterestedProperties: () => ([{
                'property_number': 'E45D5697',
                'listed_for': 'Sale',
                'category': 'Apartment',
                'cost': 15000,
                'location': 'Kyengera',
                'interest_status': 'toBeNotified',
                'listed_by': 'Isaac',
                'when_interested': '12/12/2021'
            }]),
            allUserInterestedRentals: () => ([{
                'property_number': 'D45CB697',
                'listed_for': 'Rent',
                'category': 'Offices',
                'cost': 18000,
                'location': 'Kampala',
                'interest_status': 'Bought',
                'listed_by': 'Alex',
                'when_interested': '05/07/2021'
            }])

        }
        store = new Vuex.Store({
            actions,
            getters
        })
    })

    const mountFactory = options => {
        return mount(UserInterestedProperties, {
            localVue,
            vuetify,
            store,
            ...options,
        })
    }

    it('should have a match snapshot', () => {
        const wrapper = mountFactory()
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('dispatches "fetchCurrentUserProperties" when the component is created', () => {
        const fetchCurrentUserProperties = jest.fn()
        mountFactory({
            methods: { fetchCurrentUserProperties }
        })
        expect(fetchCurrentUserProperties).toHaveBeenCalled()
    })
})

