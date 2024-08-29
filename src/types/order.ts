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
  category: null
  current_status: {
    name: string
    value: string
    color: string
    slug: string
  }
}

export interface CreateOrder {
  due_date: string
  order_users: User[] | null
  customer_name: string
  customer_address: string
  category_id: string | null
}
