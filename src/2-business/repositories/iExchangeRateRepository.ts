import { ExchangeRate } from '../../1-domain/entities/exchangeRate'

export interface IExchangeRateRepository {
  upsert (entity: ExchangeRate): Promise<ExchangeRate>
}
