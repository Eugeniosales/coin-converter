import { IExchangeRateInternalService } from '../../services/iExchangeRateInternalService'
import { IProductRepository } from '../../repositories/iProductRepository'
import { GetProductsInputDto } from '../../dto/product/getProductstInputDto'
import { Product } from '../../../1-domain/entities/product'
import { CurrencyEnum } from '../../enums/currencyEnum'

export class GetProductsUseCase {

  constructor (
		private readonly productRepository: IProductRepository,
    private readonly exchangeRateInternalService: IExchangeRateInternalService
	) {}

  private logPrefix: string = 'GetExchangeRateUseCase'

  async execute (input: GetProductsInputDto): Promise<Product[]> {
    console.log(`${this.logPrefix} :: start`)
    try {
      const { category, baseCurrency, targetCurrency } = input
      let products: Product[] = await this.productRepository.getByCategoryAndCurrency(category, baseCurrency)

      console.log(`${this.logPrefix} ::`, { products })

      products = await this.calculatePriceByLatestCurrentExchangeRate(products, baseCurrency, targetCurrency)

      console.log(`${this.logPrefix} :: products with currency updated ::`, { products })
      console.log(`${this.logPrefix} :: end`)

      return products
    } catch (error) {
      throw error
    }
  }

  private async calculatePriceByLatestCurrentExchangeRate (products: Product[], originCurrency: CurrencyEnum, targetCurrency: CurrencyEnum | undefined): Promise<Product[]> {
    const exchangeRate = await this.exchangeRateInternalService.get(originCurrency)
    console.log('calculatePriceByLatestCurrentExchangeRate ::', exchangeRate)

    const targetCurrencyExchangeRate = exchangeRate.rates[targetCurrency || originCurrency]

    return products.map(product => {
      return {
        ...product,
        price: product.price * targetCurrencyExchangeRate,
        promotionalPrice: product.promotionalPrice * targetCurrencyExchangeRate
      }
    })
  }
}

export default GetProductsUseCase
