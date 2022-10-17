import { CircuitBreakerEnum } from '../enums/circuitBreaker'
import { ICircuitBreakerRepository } from '../repositories/iCircuitBreakerRepository'

export interface CircuitBreakerData {
  key: string
  state: CircuitBreakerState
  options: CircuitBreakerOptions
  nextAvailabilityCheckTimestamp: number
}

export type CircuitBreakerOptions = {
  openBreakerTimeoutInMs: number
  closedBreakerTimeoutInMs: number
  minFailedRequestThreshold: number
}

export enum CircuitBreakerState {
	OPENED = 'OPENED',
	CLOSED = 'CLOSED',
	HALF = 'HALF'
}

export interface ICircuitBreaker {
  get (key: CircuitBreakerEnum): Promise<CircuitBreakerData>
  fire (key: CircuitBreakerEnum): Promise<void>
  checkState (key: CircuitBreakerEnum): Promise<boolean>
  sendFailObservabilityEvent (key: CircuitBreakerEnum, circuitBreaker: CircuitBreakerData): void
  sendSuccessObservabilityEvent (key: CircuitBreakerEnum, circuitBreaker: CircuitBreakerData): void
}

export class CircuitBreaker implements ICircuitBreaker {
  private readonly logPrefix = 'CircuitBreaker'

  constructor (
		private readonly circuitBreakerRepository: ICircuitBreakerRepository
	) {}

  async get (key: CircuitBreakerEnum): Promise<CircuitBreakerData> {
    console.log(`${this.logPrefix} :: get state`)
  	return this.circuitBreakerRepository.get(key)
  }

  async fire (key: CircuitBreakerEnum) {
    console.log(`${this.logPrefix} :: close cicuit for key :: ${key}`)

    const circuitBreakerOptions = await this.get(key)

    const currentDate = +new Date()
    const nextAvailabilityCheckTimestamp = currentDate + circuitBreakerOptions.options.closedBreakerTimeoutInMs
    await this.circuitBreakerRepository.update(key, CircuitBreakerState.CLOSED, nextAvailabilityCheckTimestamp)
    this.sendFailObservabilityEvent(key, circuitBreakerOptions)
  }

  async checkState (key: CircuitBreakerEnum): Promise<boolean> {
    const circuitBreakerOptions = await this.get(CircuitBreakerEnum.EXCHANGE_RATE_EXTERNAL_API)

    if (circuitBreakerOptions.state === CircuitBreakerState.OPENED) {
      this.sendSuccessObservabilityEvent(key, circuitBreakerOptions)
      return true
    }

    const currentDate = +new Date()
    if (circuitBreakerOptions.state === CircuitBreakerState.CLOSED && circuitBreakerOptions.nextAvailabilityCheckTimestamp < currentDate) {
      await this.circuitBreakerRepository.update(key, CircuitBreakerState.OPENED, 0)
      return true
    }

    this.sendFailObservabilityEvent(key, circuitBreakerOptions)
    return false
  }

  sendFailObservabilityEvent (key: CircuitBreakerEnum, circuitBreaker: CircuitBreakerData): void {
    console.log(`${this.logPrefix} :: CLOSED event sent to New Relic :: ${JSON.stringify(circuitBreaker)}`)
  }

  sendSuccessObservabilityEvent (key: CircuitBreakerEnum, circuitBreaker: CircuitBreakerData): void {
    console.log(`${this.logPrefix} :: OPENED event sent to New Relic :: ${JSON.stringify(circuitBreaker)}`)
  }
}

export default CircuitBreaker
