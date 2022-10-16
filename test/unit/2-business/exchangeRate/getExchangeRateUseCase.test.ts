import { ExchangeRate } from '../../../../src/1-domain/entities/exchangeRate'
import { GetExchangeRateUseCase } from '../../../../src/2-business/useCases/exchangeRate/getExchangeRateUseCase'
import { IExchangeRateRepository } from '../../../../src/2-business/repositories/iExchangeRateRepository'
import { CurrencyEnum } from '../../../../src/2-business/enums/currencyEnum'
import { GetExchangeRateInputDto } from '../../../../src/2-business/dto/exchangeRate/getExchangeRateInputDto'

describe('GetExchangeRateUseCase', () => {
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

  const mockInput: GetExchangeRateInputDto = {
    baseCurrency: CurrencyEnum.BRL
  }

  let exchangeRateRepository: IExchangeRateRepository

  const setMocks = () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null),
      get: jest.fn().mockResolvedValue(exchangeRateMock)
    }
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should get the exchange rates successfully', async () => {
    const useCase = new GetExchangeRateUseCase(
			exchangeRateRepository
		)

    const output = await useCase.execute(mockInput)

    expect(exchangeRateRepository.get).toHaveBeenCalledWith(CurrencyEnum.BRL)
    expect(output).toEqual(exchangeRateMock)
  })

  test('Failure::should throw error when getting exchange fails or not exists', async () => {
    exchangeRateRepository = {
      upsert: jest.fn().mockResolvedValue(null),
      get: jest.fn().mockResolvedValue(null)
    }

    const useCase = new GetExchangeRateUseCase(
			exchangeRateRepository
		)

    await expect(useCase.execute({ baseCurrency: CurrencyEnum.USD })).rejects.toThrow()
  })
})
