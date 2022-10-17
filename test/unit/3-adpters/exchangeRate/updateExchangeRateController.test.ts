import { UpdateExchangeRateController } from '../../../../src/3-adapters/controller/exchangeRate/updateExchangeRateController'
import { IExchangeRateRepository } from '../../../../src/2-business/repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../../../src/2-business/services/iExchangeRateService'
import { ILatestRatesResponse } from '../../../../src/1-domain/models/iExchangeRateResponse'
import { ICircuitBreaker, CircuitBreakerState, CircuitBreakerData } from '../../../../src/2-business/utils/circuitBreaker'

jest.mock('../../../../src/2-business/useCases/exchangeRate/updateExchangeRateUseCase')

describe('UpdateExchangeRateController', () => {
  const exchangeRateResponseMock: ILatestRatesResponse = {
    success: true,
    timestamp: 1519296206,
    base: 'BRL',
    date: '2021-03-17',
    rates: {
      AUD: 1.566015,
      CAD: 1.560132,
      CHF: 1.154727,
      CNY: 7.827874,
      GBP: 0.882047,
      JPY: 132.360679,
      USD: 1.23396
    }
  }

  const circuitBreakerMock: CircuitBreakerData = {
    key: 'EXCHANGE_RATE_EXTERNAL_API',
    options: {
      closedBreakerTimeoutInMs: 300000,
      minFailedRequestThreshold: 1,
      openBreakerTimeoutInMs: 120000
    },
    nextAvailabilityCheckTimestamp: 1666024304,
    state: CircuitBreakerState.OPENED
  }

  let exchangeRateRepository: IExchangeRateRepository
  let exchangeRateService: IExchangeRateService
  let circuitBreaker: ICircuitBreaker
  let UpdateExchangeRateUseCase = jest.fn()

  const setMocks = () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null),
      get: jest.fn().mockResolvedValue(null)
    }
    exchangeRateService = {
      getLatestRates: jest.fn().mockResolvedValue(exchangeRateResponseMock)
    }
    circuitBreaker = {
      get: jest.fn(),
      fire: jest.fn(),
      sendFailObservabilityEvent: jest.fn(),
      sendSuccessObservabilityEvent: jest.fn(),
      checkState: jest.fn().mockResolvedValue(true)
    }
    UpdateExchangeRateUseCase.mockClear()
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should update the exchange rates successfully', async () => {
    UpdateExchangeRateUseCase.mockImplementation(() => {
      return {
        execute: jest.fn()
      }
    })
    const controller = new UpdateExchangeRateController(
      exchangeRateRepository,
      exchangeRateService,
      circuitBreaker
    )

    await expect(controller.run()).resolves.not.toThrow()
  })
})
