import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { IExchangeRateInternalService } from '../../2-business/services/iExchangeRateInternalService'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'
import axios, { AxiosResponse } from 'axios'

export class ExchangeRateInternalService implements IExchangeRateInternalService {
  private readonly baseUrl = process.env.EXCHANGE_RATE_INTERNAL_ALB_URL

  async get (base: CurrencyEnum): Promise<ExchangeRate> {
    const logPrefix = 'get'

    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/api/v1/exchangerate`, {
        params: {
          baseCurrency: base
        }
      })

      console.log(`${logPrefix} :: success ::`, { data: response.data.exchangeRate })
      return response.data.exchangeRate
    } catch (error) {
      console.error(`${logPrefix} :: error ::`, error)
      throw error
    }
  }
}
