import { IExchangeRateRepository } from '../../../2-business/repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../../2-business/services/iExchangeRateService'
import { UpdateExchangeRateUseCase } from '../../../2-business/useCases/exchangeRate/updateExchangeRateUseCase'
import { ControllerBase } from '../../controllerBase'
import { Output } from '../../../2-business/dto/output'
import { ICircuitBreaker } from '../../../2-business/utils/circuitBreaker'

export class UpdateExchangeRateController extends ControllerBase<void, void> {
  constructor (
      private readonly exchangeRateRepository: IExchangeRateRepository,
      private readonly exchangeRateService: IExchangeRateService,
      private readonly circuitBreaker: ICircuitBreaker
  ) { super() }

  async run (): Promise<Output<void>> {
    const logPrefix = 'UpdateExchangeRateController'
    console.log(`${logPrefix} :: start`)

    try {
      const updateExchangeRateUseCase = new UpdateExchangeRateUseCase(
        this.exchangeRateRepository,
        this.exchangeRateService,
        this.circuitBreaker
      )

      await updateExchangeRateUseCase.execute()

      console.log(`${logPrefix} :: end`)

      return { status: 'success' }
    } catch (error) {
      throw error
    }
  }
}
