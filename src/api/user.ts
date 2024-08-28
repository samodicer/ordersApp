import request from '../api'

export function apiLoginUser(data: { email: string; password: string }) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function apiLogoutUser() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function apiGetUser() {
  return request({
    url: 'api/user',
    method: 'get'
  })
}

export function apiGetOrder() {
  return request({
    url: 'api/orders',
    method: 'get'
  })
}
