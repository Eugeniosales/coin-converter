export interface ILatestRatesResponse {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: {
    [currency: string]: number
  }
}
