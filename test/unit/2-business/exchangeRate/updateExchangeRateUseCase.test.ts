import { ExchangeRate } from '../../../../src/1-domain/entities/exchangeRate'
import { ILatestRatesResponse } from '../../../../src/1-domain/models/iExchangeRateResponse'
import { UpdateExchangeRateUseCase } from '../../../../src/2-business/useCases/exchangeRate/updateExchangeRateUseCase'
import { IExchangeRateRepository } from '../../../../src/2-business/repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../../../src/2-business/services/iExchangeRateService'
import { CurrencyEnum } from '../../../../src/2-business/enums/currencyEnum'
import { CircuitBreakerData, ICircuitBreaker } from '../../../../src/2-business/utils/circuitBreaker'

describe('UpdateExchangeRateUseCase', () => {
  const exchangeRateMock: ExchangeRate = {
    baseCurrency: 'BRL',
    rates: {
      'AUD': 1.566015,
      'CAD': 1.560132,
      'CHF': 1.154727,
      'CNY': 7.827874,
      'GBP': 0.882047,
      'JPY': 132.360679,
      'USD': 1.23396
    }
  }

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
    state: 'OPENED'
  } as CircuitBreakerData

  let exchangeRateRepository: IExchangeRateRepository
  let exchangeRateService: IExchangeRateService
  let circuitBreaker: ICircuitBreaker

  const setMocks = () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null),
      get: jest.fn()
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
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should update the exchange rates successfully', async () => {
    const useCase = new UpdateExchangeRateUseCase(
			exchangeRateRepository,
			exchangeRateService,
      circuitBreaker
		)

    await expect(useCase.execute()).resolves.not.toThrow()
    expect(exchangeRateService.getLatestRates).toHaveBeenCalledWith(CurrencyEnum.BRL)
    expect(exchangeRateRepository.upsert).toHaveBeenCalledWith(exchangeRateMock)
  })

  test('Failure::should throw error when exchange rate service fails', async () => {
    exchangeRateService = {
      getLatestRates: jest.fn().mockRejectedValue(new Error())
    }

    const useCase = new UpdateExchangeRateUseCase(
			exchangeRateRepository,
			exchangeRateService,
      circuitBreaker
		)

    await expect(useCase.execute()).rejects.toThrow()
  })
})
