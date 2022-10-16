import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'

export interface IExchangeRateInternalService {
  get (base: CurrencyEnum): Promise<ExchangeRate>
}
