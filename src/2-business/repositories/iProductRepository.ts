import { Product } from '../../1-domain/entities/product'
import { CurrencyEnum } from '../enums/currencyEnum'
import { ProductCategoryEnum } from '../enums/productCategory'

export interface IProductRepository {
  getByCategoryAndCurrency (category: ProductCategoryEnum, baseCurrency: CurrencyEnum): Promise<Product[]>
}
