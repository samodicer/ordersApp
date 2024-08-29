import request from './api'

export const apiLoginUser = (data: { email: string; password: string }) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const apiLogoutUser = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export const apiGetUser = () => {
  return request({
    url: 'api/user',
    method: 'get'
  })
}

export const apiGetOrder = () => {
  return request({
    url: 'api/orders',
    method: 'get'
  })
}
