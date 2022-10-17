import { CircuitBreakerEnum } from '../enums/circuitBreaker'
import { CircuitBreakerState, CircuitBreakerData } from '../utils/circuitBreaker'

export interface ICircuitBreakerRepository {
  get (key: CircuitBreakerEnum): Promise<CircuitBreakerData>
  update (key: CircuitBreakerEnum, state: CircuitBreakerState, nextAvailabilityCheckTimestamp: number): Promise<CircuitBreakerData>
}
