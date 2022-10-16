import { GetProductsController } from '../../../../src/3-adapters/controller/product/getProductsController'
import { Product } from '../../../../src/1-domain/entities/product'
import { ExchangeRate } from '../../../../src/1-domain/entities/exchangeRate'
import { CurrencyEnum } from '../../../../src/2-business/enums/currencyEnum'
import { ProductCategoryEnum } from '../../../../src/2-business/enums/productCategory'
import { IProductRepository } from '../../../../src/2-business/repositories/iProductRepository'
import { IExchangeRateInternalService } from '../../../../src/2-business/services/iExchangeRateInternalService'
import { InputGetProducts } from '../../../../src/3-adapters/serializers/product/getProducts/input'

jest.mock('../../../../src/2-business/useCases/product/getProductsUseCase')

describe('GetProductsController', () => {
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

  const productsMock: Product[] = [
    {
      category: ProductCategoryEnum.CASUAL_SHOES,
      id: 1,
      name: 'Tenis Nike Shox',
      price: 749.99,
      promotionalPrice: 529.99,
      rating: 540,
      colors: ['red', 'pink', 'gray'],
      imageUrl: 'https://url.com',
      currency: CurrencyEnum.BRL
    }
  ]

  const inputMock = new InputGetProducts({
    category: ProductCategoryEnum.CASUAL_SHOES,
    baseCurrency: CurrencyEnum.BRL,
    targetCurrency: CurrencyEnum.USD
  })

  let productRepository: IProductRepository
  let productService: IExchangeRateInternalService
  let GetProductsUseCase = jest.fn()

  const setMocks = () => {
    productRepository = {
      getByCategoryAndCurrency: jest.fn().mockResolvedValue(productsMock)
    }
    productService = {
      get: jest.fn().mockResolvedValue(exchangeRateMock)
    }
    GetProductsUseCase.mockClear()
  }

  beforeEach(() => {
    setMocks()
  })

  test('Success::should get products with currency updated successfully', async () => {
    GetProductsUseCase.mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue(productsMock)
      }
    })
    const controller = new GetProductsController(
      productRepository,
      productService
    )

    await expect(controller.run(inputMock)).resolves.not.toThrow()
  })
})
