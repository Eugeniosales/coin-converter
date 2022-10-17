export interface Output<T> {
  status?: 'success' | 'fail' | 'error' | string
  message?: string
  code?: string
  httpCode?: number
  statusCode?: number
  data?: T
  body?: string
  headers?: any
}
