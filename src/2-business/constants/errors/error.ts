import { ErrorData } from '../errorData'

export class ExchangeRateError extends Error {
  constructor (public readonly errorData: ErrorData) {
    super(errorData.message)
  }
}
