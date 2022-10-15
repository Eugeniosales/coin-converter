import { ILatestRatesResponse } from '../../1-domain/models/iExchangeRateResponse'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'

export interface IExchangeRateService {
  getLatestRates (base: CurrencyEnum): Promise<ILatestRatesResponse>
}
