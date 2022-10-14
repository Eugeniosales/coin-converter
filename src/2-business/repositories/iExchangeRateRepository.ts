import { ExchangeRate } from '../../1-domain/entities/exchangeRate'

export interface IExchangeRateRepository {
  create (entity: ExchangeRate): Promise<void>
}
