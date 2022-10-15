import { Output } from '../2-business/dto/output'

export abstract class ControllerBase<I, O> {
  abstract run (input: I): Promise<Output<O>>
}
