export interface Category {
  id: number
  name: string
  slug: string
}

export type CategoryRequestData = Omit<Category, 'id' | 'slug'>
