import { IExchangeRateRepository } from '../../repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../services/iExchangeRateService'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../enums/currencyEnum'
import { ILatestRatesResponse } from '../../../1-domain/models/iExchangeRateResponse'
import { ICircuitBreaker } from '../../utils/circuitBreaker'
import { CircuitBreakerEnum } from '../../enums/circuitBreaker'

export class UpdateExchangeRateUseCase {

  constructor (
		private readonly exchangeRateRepository: IExchangeRateRepository,
		private readonly exchangeRateService: IExchangeRateService,
    private readonly circuitBreaker: ICircuitBreaker
	) {}

  private logPrefix: string = 'UpdateExchangeRateUseCase'

  async execute (): Promise<boolean> {
    console.log(`${this.logPrefix} :: start`)

    try {
      const state = await this.circuitBreaker.checkState(CircuitBreakerEnum.EXCHANGE_RATE_EXTERNAL_API)

      if (!state) { return false }

      const exchangeRatesResponse: ILatestRatesResponse = await this.exchangeRateService.getLatestRates(CurrencyEnum.BRL)
      const exchangeRates: ExchangeRate = {
        baseCurrency: exchangeRatesResponse.base,
        rates: exchangeRatesResponse.rates
      }
      await this.exchangeRateRepository.upsert(exchangeRates)
      console.log(`${this.logPrefix} :: end`)
      return true
    } catch (error) {
      await this.circuitBreaker.fire(CircuitBreakerEnum.EXCHANGE_RATE_EXTERNAL_API)
      throw error
    }
  }
}

export default UpdateExchangeRateUseCase
