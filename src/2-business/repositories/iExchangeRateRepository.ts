import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../enums/currencyEnum'

export interface IExchangeRateRepository {
  upsert (entity: ExchangeRate): Promise<ExchangeRate>
  get (baseCurrency: CurrencyEnum): Promise<ExchangeRate>
}
