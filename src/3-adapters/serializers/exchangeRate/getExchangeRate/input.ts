import { InputClassValidator } from '../../../../4-framework/utility/classValidator'
import { IsNotEmpty, IsString } from 'class-validator'
import { CurrencyEnum } from '../../../../2-business/enums/currencyEnum'

export class InputGetExchangeRate extends InputClassValidator {
  @IsNotEmpty()
  @IsString()
  baseCurrency!: CurrencyEnum

  constructor (obj: Partial<InputGetExchangeRate>) {
    super()
    Object.assign(this, obj)
  }
}
