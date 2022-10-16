import { ControllerBase } from '../../controllerBase'
import { Output } from '../../../2-business/dto/output'
import { InputGetProducts } from '../../serializers/product/getProducts/input'
import { OutputGetProducts } from '../../serializers/product/getProducts/output'
import { IProductRepository } from '../../../2-business/repositories/iProductRepository'
import { IExchangeRateInternalService } from '../../../2-business/services/iExchangeRateInternalService'
import { GetProductsUseCase } from '../../../2-business/useCases/product/getProductsUseCase'
import { Product } from '../../../1-domain/entities/product'

export class GetProductsController extends ControllerBase<InputGetProducts, OutputGetProducts> {
  constructor (
      private readonly productRepository: IProductRepository,
      private readonly exchangeRateInternalService: IExchangeRateInternalService
  ) { super() }

  async run (input: InputGetProducts): Promise<Output<OutputGetProducts>> {
    const logPrefix = 'GetProductsController'
    console.log(`${logPrefix} :: start`)
    console.log(`${logPrefix} ::`, input)

    try {
      const getProductsUseCase = new GetProductsUseCase(
        this.productRepository,
        this.exchangeRateInternalService
      )

      const products: Product[] = await getProductsUseCase.execute(input)

      console.log(`${logPrefix} :: end`)

      return {
        httpCode: 200,
        status: 'success',
        data: { products }
      }

    } catch (error) {
      console.error(error)

      return {
        httpCode: 400,
        status: 'error',
        message: 'general error'
      }
    }
  }
}
