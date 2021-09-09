import axios from 'axios'
import URL from './urls'

const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
const username = user != '' ? user.username : '';
const apiHeaders = { 
    'Authorization': localStorage.getItem('token'),
    username,
    'Content-Type': 'application/json'
  }

const propertyApi = axios.create();
const userApi = axios.create();
const propertyRentalValueApi = axios.create();
const propertyRatingApi = axios.create();
const propertyAgentApi = axios.create();
const propertyFeatureApi = axios.create();
const landmarkTypeApi = axios.create();
const propertyLocationApi = axios.create();
const propertyMonthlyCostsApi = axios.create();
const propertyPriceHistoriesApi = axios.create();
const propertyValueApi = axios.create();
const propertyNearbyLandmarkApi = axios.create();
const propertyOwnerApi = axios.create();
const similarPropertiesApi = axios.create();
const propertyVisualsApi = axios.create();
const propertyTypesApi = axios.create();
const propertyNeighborhoodApi = axios.create();
const propertyLegalProtectionApi = axios.create();
const neighborhoodVisualsApi = axios.create();
const vendorsApi = axios.create();


userApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.userUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyApi.interceptors.request.use(
    async config => {
      config.baseURL = URL.propertyUrl,
      config.timeout= 10000,
      config.headers = apiHeaders
      return config;
    },
    error => {
      Promise.reject(error)
  });

propertyRentalValueApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyRentalValueUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyRatingApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyRatingUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyAgentApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyAgentUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyFeatureApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyFeatureUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
landmarkTypeApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.landmarkTypeUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyLocationApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyLocationUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyMonthlyCostsApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyMonthlyCostsUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyPriceHistoriesApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyPriceHistoriesUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyValueApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyValueUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});
propertyNearbyLandmarkApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyNearbyLandmarkUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyOwnerApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyOwnerUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

similarPropertiesApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.similarPropertiesUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyVisualsApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyVisualsUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyTypesApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyTypesUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyNeighborhoodApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyNeighborhoodUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

propertyLegalProtectionApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.propertyLegalProtectionUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

neighborhoodVisualsApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.neighborhoodVisualsUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});

vendorsApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.vendorsUrl,
    config.timeout= 10000,
    config.headers = apiHeaders
    return config;
  },
  error => {
    Promise.reject(error)
});