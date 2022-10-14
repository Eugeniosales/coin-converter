import { IExchangeRateRepository } from '../../repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../services/iExchangeRateService'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../enums/currencyEnum'
import { IExchangeRateResponse } from '../../../1-domain/models/iExchangeRateResponse'

export class UpdateExchangeRateUseCase {

  constructor (
		private exchangeRateRepository: IExchangeRateRepository,
		private exchangeRateService: IExchangeRateService
	) {}

  private logPrefix: string = 'UpdateExchangeRateUseCase'

  async execute (): Promise<void> {
    console.log(`${this.logPrefix} :: start`)
    try {
      const exchangeRatesResponse: IExchangeRateResponse = await this.exchangeRateService.get(CurrencyEnum.BRL)
      const exchangeRates: ExchangeRate = {
        baseCurrency: exchangeRatesResponse.base,
        rates: exchangeRatesResponse.rates
      }
      await this.exchangeRateRepository.create(exchangeRates)
      console.log(`${this.logPrefix} :: end`)
    } catch (error) {
      throw error
    }
  }
}
