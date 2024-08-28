import axios from 'axios'
import Cookies from 'js-cookie'

const API = 'http://localhost:81'

// Create axios instance
const service = axios.create({
  timeout: 20000, // Request timeout
  withCredentials: true,
  withXSRFToken: true
})

// Request intercepter
service.interceptors.request.use(
  async (config) => {
    config.timeout = 120_000
    config.baseURL = API

    if (
      (config.method == 'post' || config.method == 'put' || config.method == 'delete') &&
      !Cookies.get('XSRF-TOKEN')
    ) {
      await setCSRFToken()
    }

    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

const setCSRFToken = () => {
  console.log('setting token')
  return service.get('/sanctum/csrf-cookie') // resolves to '/api/csrf-cookie'.
}

// Response pre-processing
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
