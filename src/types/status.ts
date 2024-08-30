import type { Order } from './order'
import type { User } from './user'

export interface OrderStatus {
  name: string
  value: string
  color: string
  slug: string
}

export interface StatusHistory {
  id: number
  order: Order
  user: User
  status: OrderStatus
  created_at: string
}
