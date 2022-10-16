import { CurrencyEnum } from '../../2-business/enums/currencyEnum'

export interface Product {
  category: string
  id: number
  name: string
  price: number
  promotionalPrice: number
  rating: number
  colors: string[]
  imageUrl: string
  currency: CurrencyEnum
}
