import { ILatestRatesResponse } from '../../1-domain/models/iExchangeRateResponse'
import { IExchangeRateService } from '../../2-business/services/iExchangeRateService'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'
import axios, { AxiosResponse } from 'axios'

export class ExchangeRateService implements IExchangeRateService {
  private readonly baseUrl = 'https://api.apilayer.com/exchangerates_data'
  private readonly apiKey = process.env.EXCHANGE_RATE_API_KEY

  async getLatestRates (base: CurrencyEnum = CurrencyEnum.BRL): Promise<ILatestRatesResponse> {
    const logPrefix = 'getLatestRates'

    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/latest`, {
        params: {
          apikey: this.apiKey,
          base: base
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
