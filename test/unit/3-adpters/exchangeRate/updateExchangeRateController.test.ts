import { UpdateExchangeRateController } from '../../../../src/3-adapters/controller/exchangeRate/updateExchangeRateController'
import { IExchangeRateRepository } from '../../../../src/2-business/repositories/iExchangeRateRepository'
import { IExchangeRateService } from '../../../../src/2-business/services/iExchangeRateService'
import { ILatestRatesResponse } from '../../../../src/1-domain/models/iExchangeRateResponse'

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

  let exchangeRateRepository: IExchangeRateRepository
  let exchangeRateService: IExchangeRateService
  let UpdateExchangeRateUseCase = jest.fn()

  const setMocks = () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null)
    }
    exchangeRateService = {
      getLatestRates: jest.fn().mockResolvedValue(exchangeRateResponseMock)
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
      exchangeRateService
    )

    await expect(controller.run()).resolves.not.toThrow()
  })
})
