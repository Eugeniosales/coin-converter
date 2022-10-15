export interface Output<T> {
  status?: 'success' | 'fail' | 'error' | string
  message?: string
  code?: string
  httpCode?: number
  data?: T
  headers?: any
}
