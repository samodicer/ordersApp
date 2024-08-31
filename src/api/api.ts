import router from '@/router'
import axios from 'axios'
import Cookies from 'js-cookie'

export const API = 'http://localhost:81'

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

    // After post/put/delete request is send, we check if CSRF token is in Cookies
    if (
      (config.method == 'post' || config.method == 'put' || config.method == 'delete') &&
      !Cookies.get('XSRF-TOKEN')
    ) {
      // If there is no token we fetch one
      await setCSRFToken()
    }

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

const setCSRFToken = () => {
  return service.get('/sanctum/csrf-cookie')
}

// Response pre-processing
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // If user is unauthorized go to login
    if (error.response.status === 401) {
      router.push({ name: 'Login' })
    }
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
