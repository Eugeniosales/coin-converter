'use strict'

import { ALBEvent } from 'aws-lambda'
import { GetExchangeRateController } from '../../../3-adapters/controller/exchangeRate/getExchangeRateController'
import { InputGetExchangeRate } from '../../../3-adapters/serializers/exchangeRate/getExchangeRate/input'
import { ExchangeRateRepository } from '../../repositories/exchangeRateRepository'
import { albHttpEventNormalizer } from '../../utility/eventAdapters'

function eventAdapter (event: ALBEvent): InputGetExchangeRate {
  const body = albHttpEventNormalizer(event)
  return new InputGetExchangeRate(body)

}

exports.handler = async (event: ALBEvent) => {
  const getExchangeRateController = new GetExchangeRateController(
		new ExchangeRateRepository()
	)

  const input = eventAdapter(event)

  const response = await getExchangeRateController.run(input)

  return response
}
