import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { IExchangeRateInternalService } from '../../2-business/services/iExchangeRateInternalService'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'
import axios, { AxiosResponse } from 'axios'

export class ExchangeRateInternalService implements IExchangeRateInternalService {
  private readonly baseUrl = 'https://internal-sbf-exchangerate-dev-lb-431495913.us-east-1.elb.amazonaws.com'

  async get (base: CurrencyEnum): Promise<ExchangeRate> {
    const logPrefix = 'get'

    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/api/v1/exchangerate`, {
        params: {
          baseCurrency: base
        }
      })

      console.log(`${logPrefix} :: success ::`, { data: response.data })
      return response.data
    } catch (error) {
      console.error(`${logPrefix} :: error ::`, error)
      throw error
    }
  }
}
