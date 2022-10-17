'use strict'

import { UpdateExchangeRateController } from '../../../3-adapters/controller/exchangeRate/updateExchangeRateController'
import { ExchangeRateRepository } from '../../repositories/exchangeRateRepository'
import { ExchangeRateService } from '../../services/exchangeRateService'
import { CircuitBreakerRepository } from '../../repositories/circuitBreakerRepository'
import { CircuitBreaker } from '.././../../2-business/utils/circuitBreaker'

exports.handler = async () => {
  const updateExchangeRateController = new UpdateExchangeRateController(
		new ExchangeRateRepository(),
		new ExchangeRateService(),
    new CircuitBreaker(new CircuitBreakerRepository())
	)

  const response = await updateExchangeRateController.run()

  return response
}
