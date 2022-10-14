import { ExchangeRate } from '../../../src/1-domain/entities/exchangeRate'
import { IExchangeRateResponse } from '../../../src/1-domain/models/iExchangeRateResponse'
import { UpdateExchangeRateUseCase } from '../../../src/2-business/useCases/exchangeRate/updateExchangeRateUseCase'
import { IExchangeRateRepository } from '../../../src/2-business/repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../../src/2-business/services/iExchangeRateService'
import { CurrencyEnum } from '../../../src/2-business/enums/currencyEnum'

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

  const exchangeRateResponseMock: IExchangeRateResponse = {
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

  let exchangeRateRepository: IExchangeRateRepository
  let exchangeRateService: IExchangeRateService

  const setMocks = () => {
    exchangeRateRepository = {
      create: jest.fn().mockResolvedValue(null)
    }
    exchangeRateService = {
      get: jest.fn().mockResolvedValue(exchangeRateResponseMock)
    }
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should update the exchange rates successfully', async () => {
    const useCase = new UpdateExchangeRateUseCase(
			exchangeRateRepository,
			exchangeRateService
		)

    await expect(useCase.execute()).resolves.not.toThrow()
    expect(exchangeRateService.get).toHaveBeenCalledWith(CurrencyEnum.BRL)
    expect(exchangeRateRepository.create).toHaveBeenCalledWith(exchangeRateMock)
  })

  test('Failure::should throw error when exchange rate service fails', async () => {
    exchangeRateService = {
      get: jest.fn().mockRejectedValue(new Error())
    }

    const useCase = new UpdateExchangeRateUseCase(
			exchangeRateRepository,
			exchangeRateService
		)

    await expect(useCase.execute()).rejects.toThrow()
  })
})
