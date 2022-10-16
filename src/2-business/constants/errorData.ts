export interface ErrorData {
  code: string,
  message: string,
  shortMessage: string
}

export class ExchangeRateError extends Error {
  constructor (public readonly errorData: ErrorData) {
    super(errorData.message)
  }
}
