import { GetExchangeRateController } from '../../../../src/3-adapters/controller/exchangeRate/getExchangeRateController'
import { IExchangeRateRepository } from '../../../../src/2-business/repositories/iExchangeRateRepository'
import { ExchangeRate } from '../../../../src/1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../../../src/2-business/enums/currencyEnum'
import { InputGetExchangeRate } from '../../../../src/3-adapters/serializers/exchangeRate/getExchangeRate/input'

jest.mock('../../../../src/2-business/useCases/exchangeRate/updateExchangeRateUseCase')

describe('UpdateExchangeRateController', () => {
  const exchangeRateMock: ExchangeRate = {
    baseCurrency: CurrencyEnum.BRL,
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

  const inputMock = new InputGetExchangeRate({
    baseCurrency: CurrencyEnum.BRL
  })

  let exchangeRateRepository: IExchangeRateRepository
  let GetExchangeRateUseCase = jest.fn()

  const setMocks = () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null),
      get: jest.fn().mockResolvedValue(exchangeRateMock)
    }
    GetExchangeRateUseCase.mockClear()
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should get the exchange rates successfully', async () => {
    GetExchangeRateUseCase.mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue(exchangeRateMock)
      }
    })
    const controller = new GetExchangeRateController(
      exchangeRateRepository
    )

    const response = await controller.run(inputMock)

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({ exchangeRate: exchangeRateMock })
    })
  })
})
