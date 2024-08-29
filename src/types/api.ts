import type {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders
} from 'axios'

export type ResponseWrapper<T = any> = Promise<Response<T>>

export interface Response<T = any, D = any> {
  data: {
    data: T
    message: string | null
    success: boolean
  }
  status: number
  statusText: string
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  config: InternalAxiosRequestConfig<D>
  request?: any
}
