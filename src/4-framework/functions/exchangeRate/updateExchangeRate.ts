'use strict'

import { UpdateExchangeRateController } from '../../../3-adapters/controller/exchangeRate/updateExchangeRateController'
import { ExchangeRateRepository } from '../../repositories/exchangeRateRepository'
import { ExchangeRateService } from '../../services/exchangeRateService'

exports.handler = async () => {
  const updateExchangeRateController = new UpdateExchangeRateController(
		new ExchangeRateRepository(),
		new ExchangeRateService()
	)

  const response = await updateExchangeRateController.run()

  return response
}
