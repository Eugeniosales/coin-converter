import { validateSync } from 'class-validator'

export class InputClassValidator {
  errors () {
    const validationErrors = validateSync(this)
    return validationErrors.map((e) => ({
      property: e.property,
      constraints: e.constraints
    }))
  }
}
