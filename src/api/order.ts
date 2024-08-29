import request from './api'
import type { ResponseWrapper } from '@/types/api'
import type { CreateOrder, Order } from '@/types/order'

export const apiGetOrder = (): ResponseWrapper<Order[]> => {
  return request({
    url: 'api/orders',
    method: 'get'
  })
}

export const apiCreateOrder = (data: CreateOrder): ResponseWrapper<Order> => {
  return request({
    url: 'api/orders',
    method: 'post',
    data
  })
}
