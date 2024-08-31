import request from './api'
import type { Category, CategoryRequestData } from '@/types/category'
import type { ResponseWrapper } from '@/types/api'

export const apiGetCategories = (): ResponseWrapper<Category[]> => {
  return request({
    url: 'api/order-categories',
    method: 'get'
  })
}

export const apiCreateCategory = (data: CategoryRequestData): ResponseWrapper<Category> => {
  return request({
    url: 'api/order-categories',
    method: 'post',
    data
  })
}

export const apiUpdateCategory = (
  id: number,
  data: CategoryRequestData
): ResponseWrapper<Category> => {
  return request({
    url: `api/order-categories/${id}`,
    method: 'put',
    data
  })
}

export const apiDeleteCategory = (id: number) => {
  return request({
    url: `api/order-categories/${id}`,
    method: 'delete'
  })
}
