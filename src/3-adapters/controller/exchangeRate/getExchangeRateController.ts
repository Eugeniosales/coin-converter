import { IExchangeRateRepository } from '../../../2-business/repositories/iExchangeRateRepository'
import { GetExchangeRateUseCase } from '../../../2-business/useCases/exchangeRate/getExchangeRateUseCase'
import { ControllerBase } from '../../controllerBase'
import { Output } from '../../../2-business/dto/output'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'
import { InputGetExchangeRate } from '../../serializers/exchangeRate/getExchangeRate/input'
import { OutputGetExchangeRate } from '../../serializers/exchangeRate/getExchangeRate/output'
import { ExchangeRateError } from '../../../2-business/constants/errorData'

export class GetExchangeRateController extends ControllerBase<InputGetExchangeRate, OutputGetExchangeRate> {
  constructor (
      private readonly exchangeRateRepository: IExchangeRateRepository
  ) { super() }

  async run (input: InputGetExchangeRate): Promise<Output<OutputGetExchangeRate>> {
    const logPrefix = 'GetExchangeRateController'
    console.log(`${logPrefix} :: start`)
    console.log(`${logPrefix} ::`, input)

    try {
      const updateExchangeRateUseCase = new GetExchangeRateUseCase(
        this.exchangeRateRepository
      )

      const exchangeRate: ExchangeRate = await updateExchangeRateUseCase.execute(input)

      console.log(`${logPrefix} :: end`)

      return {
        statusCode: 200,
        body: JSON.stringify({ exchangeRate })
      }

    } catch (error) {
      console.error(error)

      if (error instanceof ExchangeRateError) {
        return {
          httpCode: 404,
          status: 'fail',
          message: error.message
        }
      }

      return {
        httpCode: 400,
        status: 'error',
        message: 'general error'
      }
    }
  }
}
