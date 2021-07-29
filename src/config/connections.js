import axios from 'axios';
import URL, { defaultHeaders } from './urls';

export default {
    // user route
    userApi: axios.create({
        baseURL: URL.userUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // property route
    propertyApi: axios.create({
        baseURL: URL.propertyUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // propertyRentalValue route
    propertyRentalValueApi: axios.create({
        baseURL: URL.propertyRentalValueUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    //  propertyRating route
    propertyRatingApi: axios.create({
        baseURL: URL.propertyRatingUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Agent Route
    propertyAgentApi: axios.create({
        baseURL: URL.propertyAgentUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Feature Route
    propertyFeatureApi: axios.create({
        baseURL: URL.propertyFeatureUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Landmark Type Route
    landmarkTypeApi: axios.create({
        baseURL: URL.landmarkTypeUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    //  Property Location route
    propertyLocationApi: axios.create({
        baseURL: URL.propertyLocationUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    //   Property Monthly Costs route
    propertyMonthlyCostsApi: axios.create({
        baseURL: URL.propertyMonthlyCostsUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Price Histories route
    propertyPriceHistoriesApi: axios.create({
        baseURL: URL.propertyPriceHistoriesUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Value route
    propertyValueApi: axios.create({
        baseURL: URL.propertyValueUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Nearby Landmark route
    propertyNearbyLandmarkApi: axios.create({
        baseURL: URL.propertyNearbyLandmarkUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Owner route
    propertyOwnerApi: axios.create({
        baseURL: URL.propertyOwnerUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Similar Property route
    similarPropertiesApi: axios.create({
        baseURL: URL.similarPropertiesUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Visuals route
    propertyVisualsApi: axios.create({
        baseURL: URL.propertyVisualsUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Types route
    propertyTypesApi: axios.create({
        baseURL: URL.propertyTypesUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Neighborhood route
    propertyNeighborhoodApi: axios.create({
        baseURL: URL.propertyNeighborhoodUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Property Legal Protection route
    propertyLegalProtectionApi: axios.create({
        baseURL: URL.propertyLegalProtectionUrl,
        timeout: 10000,
        headers: defaultHeaders
    }),
    // Neighborhood Visuals route
    neighborhoodVisualsApi: axios.create({
        baseURL: URL.neighborhoodVisualsUrl,
        timeout: 10000,
        headers: defaultHeaders
    })
}