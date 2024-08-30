import request from './api'
import type { ResponseWrapper } from '@/types/api'
import type { CreateOrder, Order, OrderStatus, UpdateOrder } from '@/types/order'

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

export const apiUpdateOrder = (id: number, data: UpdateOrder): ResponseWrapper<Order> => {
  return request({
    url: `api/orders/${id}`,
    method: 'put',
    data
  })
}

export const apiDeleteOrder = (id: number) => {
  return request({
    url: `api/orders/${id}`,
    method: 'delete'
  })
}

export const apiGetOrderStatuses = (): ResponseWrapper<OrderStatus[]> => {
  return request({
    url: 'api/order-statuses',
    method: 'get'
  })
}
