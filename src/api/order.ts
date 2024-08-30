import request from './api'
import type { ResponseWrapper } from '@/types/api'
import type {
  CreateOrderRequestData,
  OrderItemRequestData,
  Order,
  OrderItem,
  OrderStatus,
  UpdateOrderRequestData
} from '@/types/order'

export const apiGetOrder = (): ResponseWrapper<Order[]> => {
  return request({
    url: 'api/orders',
    method: 'get'
  })
}

export const apiCreateOrder = (data: CreateOrderRequestData): ResponseWrapper<Order> => {
  return request({
    url: 'api/orders',
    method: 'post',
    data
  })
}

export const apiUpdateOrder = (
  id: number,
  data: UpdateOrderRequestData
): ResponseWrapper<Order> => {
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

/* ORDER ITEMS */

export const apiGetOrderItems = (id: number): ResponseWrapper<OrderItem[]> => {
  return request({
    url: `api/orders/${id}/order-items`,
    method: 'get'
  })
}

export const apiCreateOrderItem = (
  id: number,
  data: OrderItemRequestData
): ResponseWrapper<OrderItem> => {
  return request({
    url: `api/orders/${id}/order-items`,
    method: 'post',
    data
  })
}

export const apiUpdateOrderItem = (
  id: number,
  itemId: number,
  data: OrderItemRequestData
): ResponseWrapper<OrderItem> => {
  return request({
    url: `api/orders/${id}/order-items/${itemId}`,
    method: 'put',
    data
  })
}

export const apiDeleteOrderItem = (id: number, itemId: number) => {
  return request({
    url: `api/orders/${id}/order-items/${itemId}`,
    method: 'delete'
  })
}

export const apiGetVatRates = (): ResponseWrapper<number[]> => {
  return request({
    url: `api/vat-rates`,
    method: 'get'
  })
}

/* ORDER STATUSES */
export const apiGetOrderStatuses = (): ResponseWrapper<OrderStatus[]> => {
  return request({
    url: 'api/order-statuses',
    method: 'get'
  })
}

export const apiGetStatusHistory = (id: number): ResponseWrapper<OrderStatus[]> => {
  return request({
    url: `api/orders/${id}/status-history`,
    method: 'get'
  })
}
