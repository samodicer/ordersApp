import type { Category, CreateCategory } from '@/types/category'
import request from './api'
import type { ResponseWrapper } from '@/types/api'

export const apiGetCategories = (): ResponseWrapper<Category[]> => {
  return request({
    url: 'api/order-categories',
    method: 'get'
  })
}

export const apiCreateCategory = (data: CreateCategory): ResponseWrapper<Category> => {
  return request({
    url: 'api/order-categories',
    method: 'post',
    data
  })
}
