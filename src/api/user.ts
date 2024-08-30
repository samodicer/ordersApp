import request from './api'
import type { ResponseWrapper } from '@/types/api'
import type { User } from '@/types/user'

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

export const apiGetUser = (): ResponseWrapper<User> => {
  return request({
    url: 'api/user',
    method: 'get'
  })
}

export const apiGetUsers = (): ResponseWrapper<User[]> => {
  return request({
    url: 'api/users',
    method: 'get'
  })
}
