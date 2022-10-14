import { IExchangeRateResponse } from '../../1-domain/models/iExchangeRateResponse'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'

export interface IExchangeRateService {
  get (base: CurrencyEnum): Promise<IExchangeRateResponse>
}
