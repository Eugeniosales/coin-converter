import { CircuitBreakerState, CircuitBreakerData } from '../../2-business/utils/circuitBreaker'
import { CircuitBreakerModel } from '../models/dynamo/circuitBreaker'
import { ICircuitBreakerRepository } from '../../2-business/repositories/iCircuitBreakerRepository'
import { CurrencyEnum } from '../../2-business/enums/currencyEnum'
import { CircuitBreakerEnum } from '../../2-business/enums/circuitBreaker'

export class CircuitBreakerRepository implements ICircuitBreakerRepository {
  get (key: CircuitBreakerEnum): Promise<CircuitBreakerData> {
    return CircuitBreakerModel.get({ key })
  }

  update (key: CircuitBreakerEnum, state: CircuitBreakerState, nextAvailabilityCheckTimestamp: number): Promise<CircuitBreakerData> {
    return CircuitBreakerModel.update(key, {
      state,
      nextAvailabilityCheckTimestamp
    })
  }
}
