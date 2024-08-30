import type { OrderStatus, StatusHistory } from '@/types/status'
import request from './api'
import type { ResponseWrapper } from '@/types/api'

export const apiGetOrderStatuses = (): ResponseWrapper<OrderStatus[]> => {
  return request({
    url: 'api/order-statuses',
    method: 'get'
  })
}

export const apiGetStatusHistory = (id: number): ResponseWrapper<StatusHistory[]> => {
  return request({
    url: `api/orders/${id}/status-history`,
    method: 'get'
  })
}
