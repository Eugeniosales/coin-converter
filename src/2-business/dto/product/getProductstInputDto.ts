import { CurrencyEnum } from '../../enums/currencyEnum'
import { ProductCategoryEnum } from '../../enums/productCategory'

export interface GetProductsInputDto {
  category: ProductCategoryEnum
  baseCurrency: CurrencyEnum
  targetCurrency?: CurrencyEnum
}
