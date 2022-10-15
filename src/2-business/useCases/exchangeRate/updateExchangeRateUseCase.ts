import { IExchangeRateRepository } from '../../repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../services/iExchangeRateService'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../enums/currencyEnum'
import { ILatestRatesResponse } from '../../../1-domain/models/iExchangeRateResponse'

export class UpdateExchangeRateUseCase {

  constructor (
		private readonly exchangeRateRepository: IExchangeRateRepository,
		private readonly exchangeRateService: IExchangeRateService
	) {}

  private logPrefix: string = 'UpdateExchangeRateUseCase'

  async execute (): Promise<void> {
    console.log(`${this.logPrefix} :: start`)
    try {
      const exchangeRatesResponse: ILatestRatesResponse = await this.exchangeRateService.getLatestRates(CurrencyEnum.BRL)
      const exchangeRates: ExchangeRate = {
        baseCurrency: exchangeRatesResponse.base,
        rates: exchangeRatesResponse.rates
      }
      await this.exchangeRateRepository.upsert(exchangeRates)
      console.log(`${this.logPrefix} :: end`)
    } catch (error) {
      throw error
    }
  }
}

export default UpdateExchangeRateUseCase
