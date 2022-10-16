import { IExchangeRateRepository } from '../../repositories/iExchangeRateRepository'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'
import { GetExchangeRateInputDto } from '../../dto/exchangeRate/getExchangeRateInputDto'
import { ExchangeRateError } from '../../constants/errorData'
import { exchangeRateNotFoundError } from '../../constants/errors/exchangeRateList'

export class GetExchangeRateUseCase {

  constructor (
		private readonly exchangeRateRepository: IExchangeRateRepository
	) {}

  private logPrefix: string = 'GetExchangeRateUseCase'

  async execute (input: GetExchangeRateInputDto): Promise<ExchangeRate> {
    console.log(`${this.logPrefix} :: start`)
    try {
      const { baseCurrency } = input
      const exchangeRate: ExchangeRate = await this.exchangeRateRepository.get(baseCurrency)

      if (!exchangeRate) {
        throw new ExchangeRateError(exchangeRateNotFoundError)
      }

      console.log(`${this.logPrefix} :: end`)

      return exchangeRate
    } catch (error) {
      throw error
    }
  }
}

export default GetExchangeRateUseCase
