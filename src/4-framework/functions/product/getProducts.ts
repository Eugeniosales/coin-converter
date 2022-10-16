'use strict'

import { APIGatewayEvent } from 'aws-lambda'
import { GetProductsController } from '../../../3-adapters/controller/product/getProductsController'
import { InputGetProducts } from '../../../3-adapters/serializers/product/getProducts/input'
import { ProductRepository } from '../../repositories/productRepository'
import { ExchangeRateInternalService } from '../../services/exchangeRateInternalService'
import { apiGatewayHttpEventNormalizer } from '../../utility/eventAdapters'

function eventAdapter (event: APIGatewayEvent): InputGetProducts {
  const body = apiGatewayHttpEventNormalizer(event)
  return new InputGetProducts(body)

}

exports.handler = async (event: APIGatewayEvent) => {
  const getProductsController = new GetProductsController(
		new ProductRepository(),
    new ExchangeRateInternalService()
	)

  const input = eventAdapter(event)

  const response = await getProductsController.run(input)

  return response
}
