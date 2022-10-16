import { ExchangeRate } from '../../1-domain/entities/exchangeRate'
import { ExchangeRateModel } from '../models/dynamo/exchangeRate'
import { IExchangeRateRepository } from '../../2-business/repositories/iExchangeRateRepository'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'
import { IProductRepository } from '../../2-business/repositories/iProductRepository'
import { Product } from '../../1-domain/entities/product'
import { ProductCategoryEnum } from '../../2-business/enums/productCategory'
import { ProductModel } from '../models/dynamo/product'

export class ProductRepository implements IProductRepository {
  getByCategoryAndCurrency (category: ProductCategoryEnum, baseCurrency: CurrencyEnum): Promise<Product[]> {
    return ProductModel.query('category').eq(category).where('currency').eq(baseCurrency).exec()
  }
}
