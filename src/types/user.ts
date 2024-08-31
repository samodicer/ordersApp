export interface User {
  id: number
  firstname: string
  lastname: string
  fullName: string
  email: string
  is_admin: boolean
  avatar: {
    image: string
    thumb: string | null
  }
}
