
const PREFIX = 'api/v1'

export const defaultHeaders = {
    'content-type': 'application/json',
    Authorization: '',
    'Access-Control-Allow-Origin': '*'
}

export default {
    propertyRentalValueUrl: `http://localhost:8082/${PREFIX}`,
    propertyRatingUrl: `http://localhost:8083/${PREFIX}`,
    propertyAgentUrl: `http://localhost:8084/${PREFIX}`,
    propertyFeatureUrl: `http://localhost:8085/${PREFIX}`,
    landmarkTypeUrl: `http://localhost:8086/${PREFIX}`,
    propertyLocationUrl: `http://localhost:8087/${PREFIX}`,
    propertyMonthlyCostsUrl: `http://localhost:8088/${PREFIX}`,
    propertyPriceHistoriesUrl: `http://localhost:8089/${PREFIX}`,
    propertyValueUrl: `http://localhost:8090/${PREFIX}`,
    propertyNearbyLandmarkUrl: `http://localhost:8001/${PREFIX}`, //changed port
    propertyOwnerUrl: `http://localhost:8092/${PREFIX}`,
    similarPropertiesUrl: `http://localhost:8093/${PREFIX}`,
    propertyVisualsUrl: `http://localhost:8094/${PREFIX}`,
    propertyUrl: `http://localhost:8095/${PREFIX}`,
    userUrl: `http://localhost:8096/${PREFIX}`,
    propertyTypesUrl: `http://localhost:9000/${PREFIX}`,
    propertyNeighborhoodUrl: `http://localhost:9001/${PREFIX}`,
    propertyLegalProtectionUrl: `http://localhost:9002/${PREFIX}`,
    neighborhoodVisualsUrl: `http://localhost:9003/${PREFIX}`,


    //From Backoffice
    vendorUrl: `http://localhost:8091/${PREFIX}`,

    

}

