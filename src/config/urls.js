const URL_PREFIX = 'api/v1'

export const defaultHeaders = {
  'content-type': 'application/json',
  Authorization: '',
  'Access-Control-Allow-Origin': '*'
}

export default {
    equipmentsURL: `http://localhost:8090/${URL_PREFIX}`,  
    vendorURL: `http://localhost:8091/${URL_PREFIX}`,
    serviceCallURL: `http://localhost:8092/${URL_PREFIX}`,
    leaseURL: `http://localhost:8093/${URL_PREFIX}`,
    projectUrl: `http://localhost:8094/${URL_PREFIX}`,
    acquisitionUrl: `http://localhost:8095/${URL_PREFIX}`,
    usersUrl: `http://localhost:8096/${URL_PREFIX}`
}