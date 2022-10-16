import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { ExchangeRateModel } from '../models/dynamo/exchangeRate'
import { IExchangeRateRepository } from '../../2-business/repositories/iExchangeRateRepository'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'

export class ExchangeRateRepository implements IExchangeRateRepository {
  upsert (entity: ExchangeRate): Promise<ExchangeRate> {
    return ExchangeRateModel.create(entity, {
      overwrite: true
    })
  }

  get (baseCurrency: CurrencyEnum): Promise<ExchangeRate> {
    return ExchangeRateModel.get({ baseCurrency })
  }
}
