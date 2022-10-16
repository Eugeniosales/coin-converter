import { InputClassValidator } from '../../../../4-framework/utility/classValidator'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CurrencyEnum } from '../../../../2-business/enums/currencyEnum'
import { ProductCategoryEnum } from '../../../../2-business/enums/productCategory'

export class InputGetProducts extends InputClassValidator {
  @IsNotEmpty()
  @IsString()
  category!: ProductCategoryEnum

  @IsNotEmpty()
  @IsString()
  baseCurrency!: CurrencyEnum

  @IsOptional()
  @IsString()
  targetCurrency?: CurrencyEnum

  constructor (obj: Partial<InputGetProducts>) {
    super()
    Object.assign(this, obj)
  }
}
