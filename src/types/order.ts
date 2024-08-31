import type { Category } from './category'
import type { OrderStatus } from './status'
import type { User } from './user'

export interface Order {
  id: number
  order_number: number
  due_date: string
  payment_date: string | null
  created_at: string
  has_access: boolean
  customer_name: string
  customer_address: string
  order_users: User[]
  category: Category | null
  current_status: OrderStatus
}

export interface CreateOrderRequestData {
  due_date: string
  order_users: number[] | null
  customer_name: string
  customer_address: string
  category_id: number | null
}

export interface UpdateOrderRequestData extends CreateOrderRequestData {
  payment_date: string | null
  created_at: string
  status: string | null
}

export interface OrderItem {
  id: number
  name: string
  count: number
  cost: string
  cost_with_vat: string
  vat: string
  order_id: number
}

export type OrderItemRequestData = Omit<OrderItem, 'id' | 'cost_with_vat' | 'order_id'>
