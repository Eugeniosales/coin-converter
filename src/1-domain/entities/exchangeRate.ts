export interface ExchangeRate {
  baseCurrency: string
  rates: {
    [currency: string]: number
  }
  createdAt?: Date
  updatedAt?: Date
}
