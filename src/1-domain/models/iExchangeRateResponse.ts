export interface IExchangeRateResponse {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: {
    [currency: string]: number
  }
}
