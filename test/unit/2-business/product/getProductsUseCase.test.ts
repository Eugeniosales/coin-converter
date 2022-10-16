import { GetProductsUseCase } from '../../../../src/2-business/useCases/product/getProductsUseCase'
import { CurrencyEnum } from '../../../../src/2-business/enums/currencyEnum'
import { Product } from '../../../../src/1-domain/entities/product'
import { ProductCategoryEnum } from '../../../../src/2-business/enums/productCategory'
import { IProductRepository } from '../../../../src/2-business/repositories/iProductRepository'
import { IExchangeRateInternalService } from '../../../../src/2-business/services/iExchangeRateInternalService'
import { GetProductsInputDto } from '../../../../src/2-business/dto/product/getProductstInputDto'
import { ExchangeRate } from '../../../../src/1-domain/entities/exchangeRate'

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
      'USD': 0.187786,
      'BRL': 1
    }
  }

  const productsMock: Product[] = [
    {
      category: ProductCategoryEnum.CASUAL_SHOES,
      id: 1,
      name: 'Tenis Nike Shox',
      price: 749.99,
      promotionalPrice: 529.99,
      rating: 540,
      colors: ['red', 'pink', 'gray'],
      imageUrl: 'http://url.com',
      currency: CurrencyEnum.BRL
    }
  ]

  const productsUpdatedMock: Product[] = [
    {
      category: ProductCategoryEnum.CASUAL_SHOES,
      id: 1,
      name: 'Tenis Nike Shox',
      price: 749.99 * 0.187786,
      promotionalPrice: 529.99 * 0.187786,
      rating: 540,
      colors: ['red', 'pink', 'gray'],
      imageUrl: 'http://url.com',
      currency: CurrencyEnum.BRL
    }
  ]

  const mockInput: GetProductsInputDto = {
    category: ProductCategoryEnum.CASUAL_SHOES,
    baseCurrency: CurrencyEnum.BRL,
    targetCurrency: CurrencyEnum.USD
  }

  let productRepository: IProductRepository
  let exchangeRateInternalService: IExchangeRateInternalService

  const setMocks = () => {
    productRepository = {
      getByCategoryAndCurrency: jest.fn().mockResolvedValue(productsMock)
    }
    exchangeRateInternalService = {
      get: jest.fn().mockResolvedValue(exchangeRateMock)
    }
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should get products with the currency updated successfully', async () => {
    const useCase = new GetProductsUseCase(
			productRepository,
			exchangeRateInternalService
		)

    const products = await useCase.execute(mockInput)

    expect(products).toEqual(productsUpdatedMock)
  })

  test('Success::should get products with the original currency successfully', async () => {
    const useCase = new GetProductsUseCase(
        productRepository,
        exchangeRateInternalService
      )

    const products = await useCase.execute({ category: ProductCategoryEnum.CASUAL_SHOES, baseCurrency: CurrencyEnum.BRL })

    expect(products).toEqual(productsMock)
  })

  test('Failure::should throw error when exchange rate service fails', async () => {
    exchangeRateInternalService = {
      get: jest.fn().mockRejectedValue(new Error())
    }

    const useCase = new GetProductsUseCase(
			productRepository,
			exchangeRateInternalService
		)

    await expect(useCase.execute(mockInput)).rejects.toThrow()
  })
})
